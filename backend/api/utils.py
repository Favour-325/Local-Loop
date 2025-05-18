from django.core.mail import send_mail

def send_user_email(subject, message, recipient_email):
    send_mail(subject, message, 'localloop.cmr.notify@gmail.com', [recipient_email], fail_silently=False)