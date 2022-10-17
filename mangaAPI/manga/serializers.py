from manga.models import Manga, User, Comment
from rest_framework import serializers


class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Manga
        # Поля, которые мы сериализуем
        fields = ["pk", "title", "description", "price", "author", "date_modified"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = User
        # Поля, которые мы сериализуем
        fields = ["pk", "login", "password", "date_modified"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Comment
        # Поля, которые мы сериализуем
        fields = ["pk", "user", "manga", "parent", "text", "date_modified"]
