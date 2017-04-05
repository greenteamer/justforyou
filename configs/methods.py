# -*- coding: utf-8 -*-
from configs.models import Config

def get_site_config(request):
	try:
		return Config.objects.get(site__domain=request.get_host())
	except Exception:
		return Config.objects.get(id=1)
