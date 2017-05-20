# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-19 15:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_productimage_maincropper'),
        ('configs', '0008_config_site_logo2'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='site_main_category',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.Category'),
        ),
    ]