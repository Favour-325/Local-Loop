import os
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class Council(models.Model):
    name = models.CharField(max_length=100, unique=True)
    location = models.CharField(max_length=100)
    phone = models.CharField(max_length=17)
    email = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=25, unique=True, blank=True, null=True)
    username = None
    email = models.EmailField(unique=True)
    address = models.TextField(max_length=100, blank=True, null=True)
    council = models.ForeignKey(Council, related_name="userCouncil", on_delete=models.CASCADE, to_field='name', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
class Services(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=100)
    icon = models.CharField(max_length=100)
    council = models.ForeignKey(Council, related_name="servicesCouncil", on_delete=models.CASCADE, to_field='name', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class ProjectImages(models.Model):
    media = models.ImageField(upload_to="project_images/", unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        if self.media:
            if os.path.isfile(self.media.path):
                os.remove(self.media.path)
        super().delete(*args, **kwargs)

class Projects(models.Model):
    title = models.CharField(max_length=100, unique=True)
    image = models.ForeignKey(ProjectImages, related_name="projectImages", on_delete=models.CASCADE, to_field='media')
    text = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    duration = models.IntegerField(editable=False, blank=True, null=True)
    STATUS = [
        ('Completed', 'Completed'),
        ('Ongoing', 'Ongoing'),
        ('Future', 'Future')
    ]
    status = models.CharField(max_length=20, choices=STATUS)
    council = models.ForeignKey(Council, related_name="councilProjects", on_delete=models.CASCADE, to_field='name')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if self.start_date and self.end_date:
            self.duration = (self.end_date - self.start_date).days
            
        today = now().date()
        
        if today < self.start_date:
            self.status = "Future"
        elif self.start_date <= today <= self.end_date:
            self.status = "Ongoing"
        else:
            self.status = "Completed"
            
        super().save(*args, **kwargs)


class Requests(models.Model):
    author = models.ForeignKey(CustomUser, related_name="requestAuthor", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=150)
    ref_image = models.ImageField()
    location = models.CharField(max_length=350)
    STATUS = [
        ('Pending', 'Pending'),
        ('Reviewed', 'Reviewed')
    ]
    status = models.CharField(max_length=20, choices=STATUS, default=STATUS[0][0])
    council = models.ForeignKey(Council, related_name="councilRequests", on_delete=models.CASCADE, to_field='name')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Contributions(models.Model):
    author = models.ForeignKey(CustomUser, related_name="contributionAuthor", on_delete=models.CASCADE)
    project = models.ForeignKey(Projects, related_name="projectContributions", on_delete=models.CASCADE, to_field='title')
    TYPE = [
        ("Financial", "Financial"),
        ("Volunteering", "Volunteering"),
        ("Resources", "Resources"),
        ("Skills", "Skills"),
        ("Other", "Other")
    ]
    contrib_type = models.CharField(max_length=20, choices=TYPE)
    amount = models.IntegerField()
    time_commit = models.CharField(max_length=10)
    description = models.CharField(max_length=150)
    METHODS = [
        ("Phone", "Phone"),
        ("Email", "Email"),
        ("WhatsApp", "WhatsApp")
    ]
    contact_method = models.CharField(max_length=20, choices=METHODS)
    add_comments = models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Feedbacks(models.Model):
    author = models.ForeignKey(CustomUser, related_name="feedbackAuthor", on_delete=models.CASCADE)
    content = models.CharField(max_length=150)
    council = models.ForeignKey(Council, related_name="councilFeedbacks", on_delete=models.CASCADE, to_field='name')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    