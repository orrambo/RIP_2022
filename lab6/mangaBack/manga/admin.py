from django.contrib import admin
from . import models
# from .models import Image

@admin.register(models.Manga)
class MangaAdmin(admin.ModelAdmin):
    list_display = ["title", "price", "date_modified"]


@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["login"]


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["text", "date_modified"]
# admin.site.register(Manga)
# admin.site.register(User)