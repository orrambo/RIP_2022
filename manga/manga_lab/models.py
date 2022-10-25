from django.db import models


class Manga(models.Model):
    name = models.CharField('Название', max_length=255)
    description = models.TextField('Описание', max_length=8000)
    image = models.ImageField(upload_to='images')

    class Meta:
        managed = False
        db_table = 'mangas'
        verbose_name = 'Мангу'
        verbose_name_plural = 'Манга'

    def __str__(self):
        return self.name