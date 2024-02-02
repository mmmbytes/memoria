import boto3
import json
from botocore.config import Config

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
    response = client.invoke_model(body=body, modelId=modelId, accept='**/**', contentType='application/json')
    response_body = json.loads(response.get('body').read())
    print(response_body)
    return response_body
