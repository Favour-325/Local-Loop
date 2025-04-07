from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CouncilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Council
        fields = "__all__"
        
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'phone', 'address', 'user_council']
        extra_kwargs = {
            'id': {'read_only': True},
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        if password:
            instance.set_password(password)
        instance.save()
        return super().update(instance, validated_data)
    
class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = "__all__"
        
class ProjectImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = ProjectImages
        fields = ["id", "media"]
        extra_kwargs = {"project": {"write_only": True}}
        
class ProjectSerializer(serializers.ModelSerializer):
    image = ProjectImageSerializers()
    class Meta:
        model = Projects
        fields = "__all__"
        extra_kwargs = {
            'duration': {'read_only': True},
            'status': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
             
class RequestSerializers(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", read_only=True)
    class Meta:
        model = Requests
        fields = "__all__"
        
class ContributionSerializers(serializers.ModelSerializer):
    title = serializers.CharField(source='project.title', read_only=True)
    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", read_only=True)
    class Meta:
        model = Contributions
        fields = "__all__"
        extra_kwargs = {
            "amount": {"required": False, 'allow_null': True},
            "time_commit": {"required": False, 'allow_null': True},
            "description": {"required": False, 'allow_null': True},
            "add_comments": {"required": False, 'allow_null': True}
        }
        
class FeedbacksSerializers(serializers.ModelSerializer):
    class Meta:
        model = Feedbacks
        fields = "__all__"
        extra_kwargs = {"author": {"read_only": True}}
        