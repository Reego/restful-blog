from django.contrib.auth.models import User, AnonymousUser
from django.db.models import Count
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, permissions, views
from .serializers import PostSerializer

from .models import Post, Tag

class PostsView(viewsets.ModelViewSet):
	serializer_class = PostSerializer
	permission_classes = [IsAuthenticatedOrReadOnly]
	queryset = Post.objects.all()

	def get_queryset(self):
		posts = Post.objects

		# filters out all non-public
		if isinstance(self.request.user, AnonymousUser):
			posts = posts.filter(is_public=True)

		identifier = self.request.query_params.get('identifier', None)
		if identifier is not None:
			post = posts.get(absolute_url=identifier)
			return [post]

		include_tag = self.request.query_params.get('tag', 'None')
		if include_tag != 'None':
			try:
				tag = Tag.objects.get(tag_name=include_tag)
				posts = posts.filter(tags__in=[tag])
			except Tag.DoesNotExist:
				return Posts.objects.none()

		order = self.request.query_params.get('order', 'date')

		order_enforcer = '-' if self.request.query_params.get('descending', 'true') == 'true' else ''

		if order == 'date':
			posts = posts.order_by(order_enforcer + 'date')
		elif order == 'title':
			posts = posts.order_by(order_enforcer + 'title')
		
		return posts.all()

@api_view(['GET'])
def tags(request):
    return Response({
    	'tags': '_'.join(str(tag) for tag in Tag.objects.all())
    })

@api_view(['GET'])
def popular_tags(request):
	tags = Tag.objects.annotate(post_count=Count('post')).order_by('-post_count')[:5]
	return Response({
		'tags': '_'.join(str(tag) for tag in tags)
	})