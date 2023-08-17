from django.urls import path
from .views import test_payment, create_subscription


urlpatterns = [
    path('test-payment/', test_payment),
    path('create_subscription/', create_subscription),
]