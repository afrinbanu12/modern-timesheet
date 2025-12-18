# myapp/urls.py
from django.urls import path
from .views import product_list, product_create, product_update, product_delete

urlpatterns = [
    path('', product_list, name='product_list'),               # List all products
    path('create/', product_create, name='product_create'),    # Add a new product
    path('update/<int:id>/', product_update, name='product_update'),  # Update a product
    path('delete/<int:id>/', product_delete, name='product_delete'),  # Delete a product
]
