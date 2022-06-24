# Generated by Django 4.0.5 on 2022-06-22 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coverers', '0002_like'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='like',
            constraint=models.UniqueConstraint(fields=('cover', 'user'), name='unique_likes'),
        ),
    ]
