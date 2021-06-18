from django.contrib import admin
from django.urls import path
from .views import GetQuestionStack

urlpatterns = [
    path('', GetQuestionStack.as_view()),
]