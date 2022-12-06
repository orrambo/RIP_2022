from django_filters import rest_framework as filters
from manga.models import Manga
import django_filters


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass
class MangaFilter(filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')
    price = filters.RangeFilter()

    class Meta:
        model = Manga
        fields = ['price', 'title']