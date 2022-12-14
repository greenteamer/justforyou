# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-20 10:30
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('configs', '0009_config_site_main_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='site_short_description',
            field=models.CharField(default='', max_length=200, verbose_name='\u041a\u0440\u0430\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='config',
            name='site',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='site', to='sites.Site'),
        ),
        migrations.AlterField(
            model_name='sitephone',
            name='config',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phones', to='configs.Config'),
        ),
    ]
