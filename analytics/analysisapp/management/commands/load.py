# analysisapp/management/commands/load_json_data.py
import json
from datetime import datetime
from django.utils import timezone
from django.core.management.base import BaseCommand
from analysisapp.models import DashboardData  # Replace YourModel with your actual model name

class Command(BaseCommand):
    help = 'Load data from jsondata.json into the specified model'

    def handle(self, *args, **options):
        with open('jsondata.json', encoding='utf-8') as json_file:
            data = json.load(json_file)

            for item in data:
                required_fields = [
                    'intensity', 'sector', 'topic', 'insight', 'url', 'region',
                    'added', 'published', 'country', 'relevance', 'pestle', 'source', 'title', 'likelihood'
                ]
                if all(field in item for field in required_fields + ['start_year']):
                    # Truncate 'region' if it exceeds 200 characters
                    item['region'] = item['region'][:200]

                    item['added'] = timezone.make_aware(datetime.strptime(item['added'], "%B, %d %Y %H:%M:%S"))
                    item['published'] = (
                        timezone.make_aware(datetime.strptime(item['published'], "%B, %d %Y %H:%M:%S"))
                        if 'published' in item and item['published']
                        else None
                    )
                    item['start_year'] = item.get('start_year', '')
                    item['end_year'] = item.get('end_year', '')
                    item['impact'] = item.get('impact', '')

                    try:
                        DashboardData.objects.create(**item)
                    except Exception as e:
                        self.stdout.write(self.style.WARNING(f'Skipped item: {item}. Error: {str(e)}'))
                else:
                    # Print a warning or log the missing fields
                    self.stdout.write(self.style.WARNING(f'Skipped item: {item}. Missing required fields.'))

        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))
