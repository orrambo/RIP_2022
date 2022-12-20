# Generated by Django 4.1.3 on 2022-11-29 18:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Manga',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Название')),
                ('description', models.TextField(max_length=8000, verbose_name='Описание')),
                ('price', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Цена манги')),
                ('author', models.CharField(max_length=255, verbose_name='Автор')),
                ('date_modified', models.DateTimeField(auto_now=True, verbose_name='Когда последний раз обновлялось значение манги?')),
                ('image', models.ImageField(upload_to='images')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login', models.CharField(max_length=255, verbose_name='Логин')),
                ('password', models.CharField(max_length=255, verbose_name='Пароль')),
                ('date_modified', models.DateTimeField(auto_now=True, verbose_name='Когда последний раз обновлялось значение пользователя?')),
            ],
        ),
        migrations.CreateModel(
            name='Sell',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.CharField(max_length=255, verbose_name='Количество')),
                ('sell_date', models.DateTimeField(auto_now=True, verbose_name='Дата продажи')),
                ('manga', models.ForeignKey(db_column='manga', on_delete=django.db.models.deletion.DO_NOTHING, to='manga.manga', verbose_name='Манга')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.DO_NOTHING, to='manga.user', verbose_name='Пользователь')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=8000, verbose_name='Текст')),
                ('date_modified', models.DateTimeField(auto_now=True, verbose_name='Когда последний раз обновлялся комментарий')),
                ('manga', models.ForeignKey(db_column='manga', on_delete=django.db.models.deletion.DO_NOTHING, to='manga.manga', verbose_name='Манга')),
                ('parent', models.ForeignKey(blank=True, db_column='parent', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='manga.comment', verbose_name='Родитель')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.DO_NOTHING, to='manga.user', verbose_name='Пользователь')),
            ],
        ),
    ]