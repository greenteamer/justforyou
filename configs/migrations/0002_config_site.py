# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sites', '0001_initial'),
        ('configs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='site',
            field=models.OneToOneField(default=1, to='sites.Site'),
            preserve_default=False,
        ),
    ]
