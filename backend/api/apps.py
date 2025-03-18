from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    verbose_name = 'LocalLoop'
    
    # The ready() is called when Django starts, making it an ideal place to set up application-level configuration like signal registration
    def ready(self):
        import api.signals