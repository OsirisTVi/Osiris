from django.urls import path, include


urlpatterns = [
    path('v1/users/', include('api.Users.urls')),
    path('v1/films/', include('api.Films.urls')),
    path('v1/payments/', include('api.Payments.urls')),
]