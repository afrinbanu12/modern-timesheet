from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime, time, timedelta

User = get_user_model()

APPROVAL_CHOICES = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
]

class Timesheet(models.Model):
    """
    One Timesheet is a date for an employee; it can contain multiple items (time blocks).
    This design allows "one date" to be shown as a card which expands into items.
    """
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='timesheets')
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('employee', 'date')
        ordering = ['-date']
    
    def total_hours(self):
        return sum(item.total_hours for item in self.items.all())

    def __str__(self):
        return f"{self.employee} - {self.date}"

class TimesheetItem(models.Model):
    timesheet = models.ForeignKey(Timesheet, on_delete=models.CASCADE, related_name='items')
    project_name = models.CharField(max_length=200)
    start_time = models.TimeField()
    end_time = models.TimeField()
    total_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    timestamp = models.DateTimeField(default=timezone.now)  # when entry was last recorded
    comments = models.TextField(blank=True)
    lead_approval = models.CharField(max_length=10, choices=APPROVAL_CHOICES, default='pending')
    manager_approval = models.CharField(max_length=10, choices=APPROVAL_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def recalc_total_hours(self):
        # calculate hours as decimal hours (e.g., 7.25)
        # assumes end_time >= start_time within same day
        start = datetime.combine(self.timesheet.date, self.start_time)
        end = datetime.combine(self.timesheet.date, self.end_time)
        if end < start:
            # if end is next day, add 1 day (optional behaviour)
            end += timedelta(days=1)
        delta = end - start
        hours = delta.total_seconds() / 3600.0
        # round to 2 decimals
        return round(hours + 1e-9, 2)

    def save(self, *args, **kwargs):
        # automatically recalc total_hours and update timestamp
        self.total_hours = self.recalc_total_hours()
        self.timestamp = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.timesheet.employee} {self.timesheet.date} {self.project_name}"

