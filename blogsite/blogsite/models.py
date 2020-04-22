from django.db import models
from django.utils import timezone
import re

TITLE_SLICE_LENGTH = 10

# needs to be cleaned up after being removed

class Tag(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    tag_name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.tag_name

class Post(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    title = models.CharField(max_length=60, unique=True)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    is_public = models.BooleanField(default=True)
    absolute_url = models.CharField(max_length=60, blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True, null=True)

    def __str__(self):
        return f'{self.title}: {str(self.date)}'

    def get_absolute_url(self):
        title_slice_length = min(len(self.title), TITLE_SLICE_LENGTH)
        absolute_url = re.sub('[^(a-zA-Z|_)]', '', self.title.replace(' ', '_'))[0:title_slice_length] + '_' + str(self.date.date())
        return absolute_url

    def save(self, *args, **kwargs):

        self.absolute_url = self.get_absolute_url()

        super().save(*args, **kwargs)