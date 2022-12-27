import pymysql
from manga.models import *
from rest_framework import serializers
from django.db.models import Max, Min


class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Manga
        # Поля, которые мы сериализуем
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = User
        # Поля, которые мы сериализуем
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Comment
        # Поля, которые мы сериализуем
        fields = "__all__"


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
        representation = Manga.objects.aggregate(Max('price'))
        representation.update(Manga.objects.aggregate(Min('price')))
        return representation


class PurchaseSerializer(serializers.ModelSerializer):
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
        sql = """
            SELECT manga_purchase.id, title, price, image, quantity, manga, sell, sell_date, user, status
            FROM manga_manga
            INNER JOIN manga_purchase 
            ON manga_manga.id = manga_purchase.manga
            INNER JOIN manga_sell
            ON manga_sell.id = manga_purchase.sell
            ORDER BY status;
        """
        cur.execute(sql)
        rows = cur.fetchall()
        connection.close()
        representation = rows

        return representation