from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Requests, Feedbacks

@receiver(pre_save, sender=Requests)
@receiver(pre_save, sender=Feedbacks)
def ensure_council_consistency(sender, instance, **kwargs):
    if instance.user.council != instance.council:
        instance.counil = instance.user.council