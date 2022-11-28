from django.db import models


class Manga(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название")
    description = models.TextField(max_length=8000, verbose_name="Описание")
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Цена манги")
    author = models.CharField(max_length=255, verbose_name="Автор")
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Когда последний раз обновлялось значение манги?")
    image = models.ImageField(upload_to='images')


class User(models.Model):
    login = models.CharField(max_length=255, verbose_name="Логин")
    password = models.CharField(max_length=255, verbose_name="Пароль")
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Когда последний раз обновлялось значение пользователя?")


class Comment(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='user', verbose_name="Пользователь")
    manga = models.ForeignKey(Manga, models.DO_NOTHING, db_column='manga', verbose_name="Манга")
    parent = models.ForeignKey("self", models.DO_NOTHING, db_column='parent', blank=True, null=True, verbose_name="Родитель")
    text = models.TextField(max_length=8000, verbose_name="Текст")
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Когда последний раз обновлялся комментарий")


class Sell(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='user', verbose_name="Пользователь")
    manga = models.ForeignKey(Manga, models.DO_NOTHING, db_column='manga', verbose_name="Манга")
    quantity = models.CharField(max_length=255, verbose_name="Количество")
    sell_date = models.DateTimeField(auto_now=True, verbose_name="Дата продажи")

