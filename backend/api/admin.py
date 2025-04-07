from django.contrib import admin
from .models import *

models = [CustomUser, Council, Requests, Services, Projects, ProjectImages, Contributions, Feedbacks]

for model in models:
    admin.site.register(model)