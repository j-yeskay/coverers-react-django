from pipes import Template
from django.urls import path
from django.views.generic import TemplateView


urlpatterns = [
    path('', TemplateView.as_view(template_name = "coverers/index.html"))
]
