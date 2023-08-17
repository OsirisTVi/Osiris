from django.urls import path
from .views import RegistrationApiView,LogoutView,UserProfileView
from rest_framework_simplejwt.views import (
    TokenBlacklistView
)
from .views import MyTokenObtainPairView,CustomTokenRefreshView
from rest_framework_simplejwt.views import TokenVerifyView




urlpatterns = [

    path('register/',RegistrationApiView.as_view(),name='register'),
    path('logout/',LogoutView.as_view(),name='logout'),

    path('profile/', UserProfileView.as_view(), name='profile'),
    path('profile/change/', UserProfileView.as_view(), name='profile_change'),



    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),



]