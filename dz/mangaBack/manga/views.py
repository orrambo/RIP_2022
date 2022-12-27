from rest_framework import viewsets, status
from manga.serializers import *
from manga.models import *
from django_filters.rest_framework import DjangoFilterBackend
from .service import MangaFilter, CartFilter, PurchasesFilter, SellProductFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate
from django.http import HttpResponse
import redis
import uuid
from django.contrib.auth.models import User
from django.utils import timezone
import datetime


class MangaViewSet(viewsets.ModelViewSet):
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Manga.objects.all().order_by('id')
    serializer_class = MangaSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = MangaFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class UserViewSet(viewsets.ModelViewSet):
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer  # Сериализатор для модели
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CommentViewSet(viewsets.ModelViewSet):
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Comment.objects.all().order_by('id')
    serializer_class = CommentSerializer  # Сериализатор для модели
    permission_classes = (IsAuthenticatedOrReadOnly,)


class SellViewSet(viewsets.ModelViewSet):
    queryset = Sell.objects.all().order_by('-sell_date')
    serializer_class = SellSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = PurchasesFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class SellPViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all().order_by('id')
    serializer_class = SellsPSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = SellProductFilter
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

class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.aggregate(Max('price'))
    serializer_class = PurchaseSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)

@api_view(["POST"])
def create_user(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    u = User.objects.create_user(username=username, password=password)
    if u is not None:
        return HttpResponse("{\"status\": \"ok\"}", content_type='json')
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"user creation failed\"}", content_type='json')

@api_view(["POST"])
def add_to_cart(request):
    data = json.loads(request.body)
    quantity = data["quantity"]
    manga = data["manga"]
    ssid = request.COOKIES.get("session_cookie")
    print(ssid)
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        Cart.objects.create(user=user.id, quantity=quantity, manga_id=manga)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"haven't been added to cart\"}")

@api_view(["DELETE"])
def delete_from_cart(request):
    data = json.loads(request.body)
    cart = data["id"]
    ssid = request.COOKIES.get("session_cookie")
    print(ssid)
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        Cart.objects.filter(id=cart).delete()
        response = Response("{\"status\": \"ok\"}", content_type="json")
    else:
        response = Response("{\"status\": \"You have to logIn\"}", content_type="json")
    return response

@api_view(["POST"])
def add_to_sell(request):
    data = json.loads(request.body)
    status = data["status"]
    ssid = request.COOKIES.get("session_cookie")
    print(ssid)
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        u = Sell.objects.create(user=user.id, status = status)
        response = Response(content_type='json', data={u.id})
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"haven't been added to cart\"}")

@api_view(["POST"])
def add_to_purchase(request):
    data = json.loads(request.body)
    sell = data["sell"]
    quantity = data["quantity"]
    manga = data["manga"]
    ssid = request.COOKIES.get("session_cookie")
    print(ssid)
    if ssid is not None:
        Purchase.objects.create(sell_id = sell, quantity = quantity, manga_id = manga)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"haven't been\"}")

@api_view(["PUT"])
def change_status(request):
    data = json.loads(request.body)
    ssid = request.COOKIES.get("session_cookie")
    sell = data["id"]
    status = data["status"]
    current_date = timezone.now()
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        if user.is_staff:
            Sell.objects.filter(id = sell).update(status=status, sell_date = current_date)
            response = Response("{\"status\": \"ok\"}", content_type="json")
        else:
            Sell.objects.filter(id = sell).update(status=4, sell_date = current_date)
            response = Response("{\"status\": \"ok\"}", content_type="json")
    else:
        response = Response("{\"status\": \"You have to logIn\"}", content_type="json")
    return response


@api_view(["PUT"])
def change_price(request):
    data = json.loads(request.body)
    ssid = request.COOKIES.get("session_cookie")
    manga = data["id"]
    price = data["price"]
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        if user.is_staff:
            Manga.objects.filter(id=manga).update(price=price)
            response = Response("{\"status\": \"ok\"}", content_type="json")
        else:
            response = Response("{\"status\": \"access denied\"}", content_type="json")
    else:
        response = Response("{\"status\": \"you have to logIn as manager\"}", content_type="json")
    return response

@api_view(["GET"])
def logout(request):
    ssid = request.COOKIES.get("session_cookie")
    print(request.COOKIES.get("session_cookie"))
    if ssid is not None:
        session_storage.delete(ssid)
        response = Response(status=status.HTTP_200_OK, data="{\"status\": \"successfully logged out\"}")
        response.delete_cookie("session_cookie")
        response.delete_cookie("csrftoken")
        return response
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)


class AuthView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            key = str(uuid.uuid4())
            session_storage.set(key, username)
            u = User.objects.get(username=username)
            u.last_login = timezone.now()
            u.save()
            response = Response(content_type='json', data={u.id, u.is_staff})
            response.set_cookie("session_cookie", key)
            return response
        else:
            return Response("{\"status\": \"error\", \"error\": \"login failed\"}")