# Generated by Django 4.2.3 on 2023-07-31 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Films', '0004_remove_film_country_film_country'),
    ]

    operations = [
        migrations.AlterField(
            model_name='film',
            name='photo',
            field=models.ImageField(height_field='400', upload_to='media/film/', width_field='400'),
        ),
    ]
