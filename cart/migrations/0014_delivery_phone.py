# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-28 15:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0013_auto_20170326_2143'),
    ]

    operations = [
        migrations.AddField(
            model_name='delivery',
            name='phone',
            field=models.CharField(blank=True, max_length=16, null=True),
        ),
    ]