from django.urls import path
from .views import (FilmsRetrieveApiView,
                    )


urlpatterns = [

    path('films/',FilmsRetrieveApiView.as_view(),name='films')


]