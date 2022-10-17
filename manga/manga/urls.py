from django.contrib import admin
from django.urls import include, path
from manga_lab import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.mangasList),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('manga/<int:id>/', views.GetManga, name='manga_url')
]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT)
