from django.db import models
from datetime import datetime


class AllCountry(models.Model):
    name = models.CharField(max_length=50, unique=True)


    def __str__(self) -> str:
        return f'{ self.name }'


class AllGenres(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name



class Film (models.Model):

    name = models.CharField(max_length=100,unique=True,blank=False,db_index=True,)
    country = models.ManyToManyField(AllCountry,blank=False)
    year = models.IntegerField(choices=[(year, str(year)) for year in range(datetime.now().year + 1, 1900,-1)],null=True)
    photo = models.ImageField(upload_to='film/',width_field='width',height_field='height',null=
                              True)
    genres = models.ManyToManyField(AllGenres,blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    width = models.PositiveIntegerField(editable=False,null=True)
    height = models.PositiveIntegerField(editable=False,null=True)




    def __str__(self) -> str:
        return f'{self.name}'