import json
import logging

import boto3
from botocore.config import Config
from botocore.exceptions import BotoCoreError, ClientError
import numpy as np

AWS_REGION = "us-east-1"


def create_bedrock_client():
    config = Config(
        region_name=AWS_REGION,
        signature_version="v4",
        retries={"max_attempts": 10, "mode": "standard"},
    )
    try:
        bedrock_client = boto3.client(service_name="bedrock-runtime", config=config)
        return bedrock_client
    except (BotoCoreError, ClientError) as e:
        logging.error(f"Error creating Bedrock client: {e}")
        raise
    except Exception as e:
        logging.error(f"Unkown error while creating Bedrock client: {e}")
        raise


def get_text_embedding(input_text, model_id):
    client = create_bedrock_client()
    body = json.dumps({"inputText": input_text})
    try:
        response = client.invoke_model(
            body=body, modelId=model_id, accept="*/*", contentType="application/json"
        )
        response_body = json.loads(response.get("body").read())
        embedding = response_body["embedding"]
        return np.array(embedding)
    except ClientError as e:
        logging.error(f"Error invoking Bedrock model: {e}")
        raise
    except Exception as e:
        logging.error(f"Unknown error while invoking Bedrock model: {e}")
        raise
