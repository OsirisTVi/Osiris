# Generated by Django 4.2.3 on 2023-08-01 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0002_user_delete_customuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='refresh_token',
            field=models.CharField(default=None, max_length=100),
        ),
    ]