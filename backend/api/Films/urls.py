from django.urls import path
from .views import (FilmsRetrieveApiView,
                    )


urlpatterns = [

    path('allFilms/',FilmsRetrieveApiView.as_view(),name='films')]