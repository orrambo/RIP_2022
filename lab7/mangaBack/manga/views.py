from rest_framework import viewsets
from manga.serializers import *
from manga.models import *
from django_filters.rest_framework import DjangoFilterBackend
from .service import MangaFilter, CartFilter, PurchasesFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly



class MangaViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Manga.objects.all().order_by('id')
    serializer_class = MangaSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = MangaFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer  # Сериализатор для модели
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Comment.objects.all().order_by('id')
    serializer_class = CommentSerializer  # Сериализатор для модели
    permission_classes = (IsAuthenticatedOrReadOnly,)


class SellViewSet(viewsets.ModelViewSet):
    queryset = Sell.objects.all().order_by('id')
    serializer_class = SellSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = PurchasesFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class SellPViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all().order_by('id')
    serializer_class = SellsPSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all().order_by('id')
    serializer_class = CartSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CartFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class MinMaxViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.all()
    serializer_class = MinMaxSerializer