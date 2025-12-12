from rest_framework import serializers
from .models import TimesheetItem

class TimesheetItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimesheetItem
        fields = '__all__'
