from django.contrib import admin
from manga import views as manga_views
from django.urls import include, path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'manga', manga_views.MangaViewSet)
router.register(r'user', manga_views.UserViewSet)
router.register(r'comment', manga_views.CommentViewSet)
router.register(r'sell', manga_views.SellViewSet)
router.register(r'cart', manga_views.CartViewSet)
router.register(r'minmax', manga_views.MinMaxViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('admin/', admin.site.urls),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)