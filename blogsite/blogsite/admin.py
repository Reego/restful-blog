from django.contrib import admin
from . import models

class PostAdmin(admin.ModelAdmin):
	model = models.Post
	filter_horizontal = ('tags',)

admin.site.register(models.Tag)
admin.site.register(models.Post, PostAdmin)