from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.contrib.auth.views import LoginView, LogoutView
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("api/", include('api.urls')), 
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]