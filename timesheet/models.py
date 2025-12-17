from django.db import models

class TimesheetEntry(models.Model):
    date = models.DateField()
    hours = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    task = models.CharField(max_length=255, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('Work', 'Work'),
            ('Leave', 'Leave'),
            ('Holiday', 'Holiday'),
        ],
        default='Work'
    )

    def __str__(self):
        return f"{self.date} - {self.hours}h"
