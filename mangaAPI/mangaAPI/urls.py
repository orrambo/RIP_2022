from django.contrib import admin
from manga import views as manga_views
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'manga', manga_views.MangaViewSet)
router.register(r'user', manga_views.UserViewSet)
router.register(r'comment', manga_views.CommentViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('admin/', admin.site.urls),
]