from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Timesheet, TimesheetItem
from .serializers import TimesheetSerializer, TimesheetItemSerializer
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db import IntegrityError, transaction

class TimesheetViewSet(viewsets.ModelViewSet):
    queryset = Timesheet.objects.all().select_related('employee').prefetch_related('items')
    serializer_class = TimesheetSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        employee_id = self.request.query_params.get('employee')
        if employee_id:
            qs = qs.filter(employee__id=employee_id)
        return qs

    @action(detail=False, methods=['get'])
    def by_employee(self, request):
        """
        alternative endpoint: /api/timesheets/by_employee/?employee=1
        """
        employee_id = request.query_params.get('employee')
        if not employee_id:
            return Response({"detail":"pass ?employee=<id>"}, status=status.HTTP_400_BAD_REQUEST)
        qs = self.get_queryset().filter(employee__id=employee_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

class TimesheetItemViewSet(viewsets.ModelViewSet):
    queryset = TimesheetItem.objects.all().select_related('timesheet')
    serializer_class = TimesheetItemSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # If client posts timesheet as date+employee, we create-or-get a Timesheet
        timesheet_id = data.get('timesheet')
        if not timesheet_id:
            # expect employee and date
            employee_id = data.get('employee') or request.data.get('employee')
            date_str = data.get('date') or request.data.get('date')
            if not (employee_id and date_str):
                return Response({"detail":"Provide timesheet id OR employee and date"}, status=400)
            from .models import Timesheet
            from django.contrib.auth import get_user_model
            User = get_user_model()
            user = get_object_or_404(User, pk=employee_id)
            try:
                with transaction.atomic():
                    timesheet, created = Timesheet.objects.get_or_create(employee=user, date=date_str)
            except IntegrityError:
                return Response({"detail":"Could not create timesheet"}, status=500)
            data['timesheet'] = timesheet.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def recalc_all(self, request):
        """
        POST /api/items/recalc_all/  -> recalculates total_hours/timestamps for all items.
        Useful if you need a one-off recalculation (not background).
        """
        items = self.get_queryset()
        for item in items:
            item.save()  # save triggers recalc
        return Response({"detail":"recalculated"}, status=200)
