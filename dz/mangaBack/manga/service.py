from django_filters import rest_framework as filters
from manga.models import Manga, Cart, Sell, Purchase
import django_filters


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass
class MangaFilter(filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')
    price = filters.RangeFilter()

    class Meta:
        model = Manga
        fields = ['price', 'title']


class CartFilter(filters.FilterSet):
    user = CharFilterInFilter(field_name='user', lookup_expr='in')

    class Meta:
        model = Cart
        fields = ['user']


class PurchasesFilter(filters.FilterSet):
    user = CharFilterInFilter(field_name='user', lookup_expr='in')

    class Meta:
        model = Sell
        fields = ['user']

class SellProductFilter(filters.FilterSet):
    user = CharFilterInFilter(field_name='sell', lookup_expr='in')

    class Meta:
        model = Purchase
        fields = ['sell']