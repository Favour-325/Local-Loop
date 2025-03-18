from django.contrib import admin
from .models import *

models = [CustomUser, Council, Services, Projects, ProjectImages, Requests, Contributions, Feedbacks]

for model in models:
    admin.site.register(model)