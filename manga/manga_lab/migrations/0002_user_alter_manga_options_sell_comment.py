# Generated by Django 4.1.2 on 2022-10-25 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manga_lab', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login', models.CharField(max_length=255, verbose_name='Логин')),
                ('password', models.CharField(max_length=255, verbose_name='Пароль')),
                ('date_modified', models.DateTimeField(auto_now=True, verbose_name='Когда последний раз обновлялось значение пользователя?')),
            ],
        ),
        migrations.AlterModelOptions(
            name='manga',
            options={},
        ),
        migrations.CreateModel(
            name='Sell',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.CharField(max_length=255, verbose_name='Количество')),
                ('sell_date', models.DateTimeField(auto_now=True, verbose_name='Дата продажи')),
                ('manga', models.ForeignKey(db_column='manga', on_delete=django.db.models.deletion.DO_NOTHING, to='manga_lab.manga', verbose_name='Манга')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.DO_NOTHING, to='manga_lab.user', verbose_name='Пользователь')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=8000, verbose_name='Текст')),
                ('date_modified', models.DateTimeField(auto_now=True, verbose_name='Когда последний раз обновлялся комментарий')),
                ('manga', models.ForeignKey(db_column='manga', on_delete=django.db.models.deletion.DO_NOTHING, to='manga_lab.manga', verbose_name='Манга')),
                ('parent', models.ForeignKey(blank=True, db_column='parent', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='manga_lab.comment', verbose_name='Родитель')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.DO_NOTHING, to='manga_lab.user', verbose_name='Пользователь')),
            ],
        ),
    ]
