# Generated by Django 3.1.5 on 2021-01-28 14:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0004_todo_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='completed',
        ),
    ]