# Generated by Django 3.1.2 on 2020-10-05 15:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0008_addmoneytransactiondetails'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='addmoneytransactiondetails',
            name='transaction_end_time',
        ),
    ]
