from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from . import views
from . import models

router = routers.DefaultRouter()
router.register(r'posts', views.PostsView)

urlpatterns = [
    path('', include(router.urls)),
    path('tags/', views.tags),
    path('popular_tags/', views.popular_tags),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
