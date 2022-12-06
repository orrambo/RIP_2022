from rest_framework import viewsets
from manga.serializers import *
from manga.models import *
from django_filters.rest_framework import DjangoFilterBackend
from .service import MangaFilter


class MangaViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Manga.objects.all().order_by('id')
    serializer_class = MangaSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = MangaFilter


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


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all().order_by('id')
    serializer_class = CartSerializer


class MinMaxViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.all()
    serializer_class = MinMaxSerializer