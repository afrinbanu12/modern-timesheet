from rest_framework import generics
from .models import TimesheetItem
from .serializers import TimesheetItemSerializer

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = TimesheetItem.objects.all()
    serializer_class = TimesheetItemSerializer
