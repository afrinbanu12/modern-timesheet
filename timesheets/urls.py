from rest_framework import routers
from .views import TimesheetViewSet, TimesheetItemViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'timesheets', TimesheetViewSet, basename='timesheet')
router.register(r'items', TimesheetItemViewSet, basename='item')

urlpatterns = [
    path('api/', include(router.urls)),
]
