from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("timesheet/", views.timesheet_view, name="timesheet_view"),
    path("export/", views.export_csv, name="export_csv"),
]
