from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CouncilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Council
        fields = "__all__"

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    council = CouncilSerializer(read_only=True)
    council_id = serializers.PrimaryKeyRelatedField(queryset=Council.objects.all(), write_only=True, source='council', allow_null=True, required=False)
    
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'council', 'council_id' 'first_name', 'last_name', 'phone', 'address']
        extra_kwargs = {
            'council': {'read_only': True},
        }
        
    def create(self, validated_data):
        council_data = validated_data.pop('council', None)
        council_id = validated_data.pop('council_id', None)
        
        instance = self.Meta.model(**validated_data)
        
        if council_id:
            try:
                council = Council.objects.get(id=council_id.pk)
                instance.council = council
            except Council.DoesNotExist:
                raise serializers.ValidationError({"council_id": ["Invalid council ID."]})
        
        password = validated_data.pop('password', None)
        
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
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
        fields = "__all__"
        extra_kwargs = {"project": {"write_only": True}}
        
class ProjectSerializer(serializers.ModelSerializer):
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
    author = CustomUserSerializer(read_only=True)
    council = CouncilSerializer(read_only=True)
    council_id = serializers.PrimaryKeyRelatedField(queryset=Council.objects.all(), write_only=True, source='council')
    
    class Meta:
        model = Requests
        fields = "__all__"
        read_only_fields = ['author', 'council', 'status', 'created_at']
        
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['author'] = user
        return super().create(validated_data)
        
class ContributionSerializers(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True, source='author')
    project = ProjectSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all(), write_only=True, source='project')
    class Meta:
        model = Contributions
        fields = "__all__"
        
class FeedbacksSerializers(serializers.ModelSerializer):
    class Meta:
        model = Feedbacks
        fields = "__all__"
        extra_kwargs = {"author": {"read_only": True}}