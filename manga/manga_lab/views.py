from django.shortcuts import render
from datetime import date
from manga_lab.models import Manga


def mangasList(request):
    return render(request, 'mangas.html', {'data' : {
        'current_date': date.today(),
        'mangas': Manga.objects.all()
    }})


def GetManga(request, id):
    return render(request, 'manga.html', {'data' : {
        'current_date': date.today(),
        'manga': Manga.objects.filter(id=id)[0],
    }})


