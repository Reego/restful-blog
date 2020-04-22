from rest_framework import serializers
from .models import Post, Tag

class TagSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Tag
		fields = ['tag_name']

class PostSerializer(serializers.HyperlinkedModelSerializer):
	tags = TagSerializer(read_only=True, many=True)
	absolute_url = serializers.CharField(read_only=True)
	date = serializers.DateTimeField(read_only=True)

	class Meta:
		model = Post
		fields = ['title', 'content', 'is_public', 'tags', 'date', 'absolute_url']