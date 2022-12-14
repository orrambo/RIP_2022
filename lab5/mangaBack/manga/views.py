from rest_framework import viewsets
from manga.serializers import MangaSerializer, UserSerializer, CommentSerializer, SellSerializer
from manga.models import Manga, User, Comment, Sell


class MangaViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Manga.objects.all().order_by('id')
    serializer_class = MangaSerializer  # Сериализатор для модели


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer  # Сериализатор для модели


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Comment.objects.all().order_by('id')
    serializer_class = CommentSerializer  # Сериализатор для модели


class SellViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Sell.objects.all().order_by('sell_date')
    serializer_class = SellSerializer  # Сериализатор для модели