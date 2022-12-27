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
router.register(r'purchase', manga_views.SellPViewSet)
router.register(r'cart', manga_views.CartViewSet)
router.register(r'minmax', manga_views.MinMaxViewSet)
router.register(r'sell_info', manga_views.PurchaseViewSet, basename='sell_info')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),

    path('api/cart/add', manga_views.add_to_cart, name='add-to-cart'),
    path('api/manga/delete/', manga_views.delete_from_cart, name="delete-from-cart"),
    path('api/sell/add', manga_views.add_to_sell, name='add-to-sell'),
    path('api/purchase/add', manga_views.add_to_purchase, name='add-to-purchase'),
    path('api/status/change', manga_views.change_status, name='change-status'),
    path('api/price/change', manga_views.change_price, name='change-price'),
    path('api/authorize/', manga_views.AuthView.as_view(), name="auth"),
    path('api/user/create', manga_views.create_user, name="create-user"),
    path('api/logout/', manga_views.logout, name="logout"),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)