from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # optional default admin
    path('', include('myapp.urls')),  # include our app urls
]
