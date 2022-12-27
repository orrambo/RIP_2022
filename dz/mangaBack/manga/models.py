from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager



class Manga(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название")
    description = models.TextField(max_length=8000, verbose_name="Описание")
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Цена манги")
    author = models.CharField(max_length=255, verbose_name="Автор")
    image = models.ImageField(upload_to='images')


class User(models.Model):
    login = models.CharField(max_length=255, verbose_name="Логин")
    password = models.CharField(max_length=255, verbose_name="Пароль")
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    email = models.CharField(max_length=20, verbose_name="Почта", default="")
    objects = UserManager()


class Comment(models.Model):
    user = models.IntegerField( verbose_name="Пользователь")
    manga = models.ForeignKey(Manga, models.DO_NOTHING, db_column='manga', verbose_name="Манга")
    parent = models.ForeignKey("self", models.DO_NOTHING, db_column='parent', blank=True, null=True, verbose_name="Родитель")
    text = models.TextField(max_length=8000, verbose_name="Текст")


class Sell(models.Model):
    user = models.IntegerField( verbose_name="Пользователь")
    sell_date = models.DateTimeField(auto_now=True, verbose_name="Дата продажи")
    status = models.IntegerField(verbose_name="Статус")


class Purchase(models.Model):
    sell = models.ForeignKey(Sell, models.DO_NOTHING, db_column='sell', verbose_name="Продажа")
    manga = models.ForeignKey(Manga, models.DO_NOTHING, db_column='manga', verbose_name="Манга")
    quantity = models.IntegerField(verbose_name="Количество")


class Cart(models.Model):
    user = models.IntegerField( verbose_name="Пользователь")
    manga = models.ForeignKey(Manga, models.DO_NOTHING, db_column='manga', verbose_name="Манга")
    quantity = models.IntegerField(verbose_name="Количество")

