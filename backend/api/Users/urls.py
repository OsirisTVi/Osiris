from django.urls import path
from .views import RegistrationApiView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView
)
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenVerifyView




urlpatterns = [

    path('users/register/',RegistrationApiView.as_view(),name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),



]