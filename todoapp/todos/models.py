from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User  

# Classname should be singular
class Todo(models.Model):
    task = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, related_name="todos", on_delete=models.CASCADE, null=True
    )
    description = models.TextField(null=True, blank=True)
    created = models.DateField(editable=False)
    
    def __str__(self):
        return self.task
    
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        return super(Todo, self).save(*args, **kwargs)