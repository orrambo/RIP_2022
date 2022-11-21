from manga.models import Manga, User, Comment, Sell
from rest_framework import serializers


class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Manga
        # Поля, которые мы сериализуем
        fields = ["id", "title", "description", "price", "author", "date_modified", "image"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = User
        # Поля, которые мы сериализуем
        fields = ["id", "login", "password", "date_modified"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Comment
        # Поля, которые мы сериализуем
        fields = ["id", "user", "manga", "parent", "text", "date_modified"]


class SellSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Sell
        # Поля, которые мы сериализуем
        fields = "__all__"
