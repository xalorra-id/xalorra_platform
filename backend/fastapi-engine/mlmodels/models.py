from django.db import models

class MLModel(models.Model):
    name = models.CharField(max_length=255)
    accuracy = models.FloatField()
    trained_at = models.DateTimeField(auto_now_add=True)
    input_features = models.JSONField()
    model_path = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.accuracy:.2%})"
