# Generated by Django 3.1.5 on 2021-01-28 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_auto_20210127_2048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='created',
            field=models.DateField(editable=False),
        ),
    ]
