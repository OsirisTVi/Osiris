# Generated by Django 4.2.3 on 2023-08-14 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0014_remove_userprofile_username_alter_user_user_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='username',
            field=models.CharField(max_length=30, null=True, unique=True),
        ),
    ]
