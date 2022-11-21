from django.contrib import admin
from . import models
# from .models import Image

@admin.register(models.Manga)
class MangaAdmin(admin.ModelAdmin):
    list_display = ["title", "price"]
# admin.site.register(Manga)