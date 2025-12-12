from django.contrib import admin
from .models import Timesheet, TimesheetItem

class TimesheetItemInline(admin.TabularInline):
    model = TimesheetItem
    extra = 0
    readonly_fields = ('total_hours','timestamp','created_at','updated_at')

@admin.register(Timesheet)
class TimesheetAdmin(admin.ModelAdmin):
    list_display = ('employee','date','created_at')
    inlines = [TimesheetItemInline]

@admin.register(TimesheetItem)
class TimesheetItemAdmin(admin.ModelAdmin):
    list_display = ('timesheet', 'project_name', 'start_time', 'end_time', 'total_hours', 'lead_approval','manager_approval')
    readonly_fields = ('total_hours','timestamp','created_at','updated_at')
