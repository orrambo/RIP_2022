import pymysql
from manga.models import *
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


class SellsPSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Purchase
        # Поля, которые мы сериализуем
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Cart
        # Поля, которые мы сериализуем
        fields = '__all__'



class MinMaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manga
        fields = ''
    def to_representation(self, instance):

        connection = pymysql.connect(
            host="localhost",
            user="dbuser",
            password="123",
            database="second_db",
            cursorclass=pymysql.cursors.DictCursor
        )

        cur = connection.cursor()
        sql = "SELECT max(price) FROM second_db.manga_manga;"
        cur.execute(sql)
        rows = cur.fetchall()
        for row in rows:
            max_price = row["max(price)"]

        sql = "SELECT min(price) FROM second_db.manga_manga;"
        cur.execute(sql)
        rows = cur.fetchall()
        for row in rows:
            min_price = row["min(price)"]

        connection.close()

        representation = {
            'max': max_price,
            'min': min_price,
        }

        return representation