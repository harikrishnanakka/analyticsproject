# Generated by Django 5.0.1 on 2024-02-02 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analysisapp', '0003_alter_dashboarddata_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboarddata',
            name='region',
            field=models.CharField(max_length=200),
        ),
    ]
