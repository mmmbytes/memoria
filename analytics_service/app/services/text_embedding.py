import boto3
import json
from botocore.config import Config
from botocore.exceptions import BotoCoreError, ClientError

def create_bedrock_client():
    config = Config(
        region_name = 'us-east-1',
        signature_version = 'v4',
        retries = {
            'max_attempts': 10,
            'mode': 'standard'
        }
    )
    bedrock_client = boto3.client(service_name='bedrock-runtime', config=config)
    return bedrock_client

def get_text_embedding(inputText, modelId):
    client = create_bedrock_client()
    body = json.dumps({
        "inputText": inputText
    })
    try:
        response = client.invoke_model(body=body, modelId=modelId, accept='**/**', contentType='application/json')
        if response['ResponseMetadata']['HTTPStatusCode'] != 200:
            print(f"Error: Received non-200 response status code: {response['ResponseMetadata']['HTTPStatusCode']}")
            return None
        try:
            response_body = json.loads(response.get('body').read())
            print(response_body)
            return response_body
        except json.JSONDecodeError as e:
            print(f"Error parsing response JSON: {e}")
            return None
    except (BotoCoreError, ClientError) as e:
        print(f"Error calling AWS Bedrock service: {e}")
        return None
