from django.db import models

class TimesheetItem(models.Model):
    employee = models.IntegerField()
    date = models.DateField()
    project_name = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    comments = models.TextField(blank=True)

    def __str__(self):
        return f"{self.employee} - {self.project_name}"
