from django.contrib import admin

from .models import (Film,
                     AllGenres,
                     AllCountry)



@admin.register(Film,AllGenres,AllCountry)
class FilmRegister(admin.ModelAdmin):
    pass