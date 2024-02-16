# Generated by Django 5.0.1 on 2024-02-02 04:25

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analysisapp', '0004_alter_dashboarddata_region'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboarddata',
            name='added',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='country',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='pestle',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='sector',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='source',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='dashboarddata',
            name='topic',
            field=models.CharField(max_length=100),
        ),
    ]