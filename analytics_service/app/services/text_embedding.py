import json
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Tuple

import boto3
import numpy as np
from botocore.client import BaseClient
from botocore.config import Config
from botocore.exceptions import BotoCoreError, ClientError

from app.schemas.note_schemas import Note

_AWS_REGION = "us-east-1"
_EMBEDDING_TEXT_MODEL = "amazon.titan-embed-text-v1"


class TextEmbeddingGenerationError(Exception):
    """Exception raised for errors during the text embedding generation process."""

    def __init__(self, note_id: str, original_exception: Exception):
        super().__init__(
            f"Failed to generate embedding for note {note_id}: {original_exception}"
        )
        self.note_id = note_id
        self.original_exception = original_exception


def create_bedrock_client() -> BaseClient:
     """Create and return a Bedrock client."""
    config = Config(
        region_name=_AWS_REGION,
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


def get_text_embedding(
    client: BaseClient, input_text: str, model_id: str
) -> np.ndarray:
    """Generate an embedding for the input text using the specified client and LLM model."""
    body = json.dumps({"inputText": input_text})
    try:
        response = client.invoke_model(
            body=body, modelId=model_id, accept="*/*", contentType="application/json"
        )
        response_body = json.loads(response.get("body").read())
        return np.array(response_body["embedding"])
    except ClientError as e:
        logging.error(f"Error invoking Bedrock model: {e}")
        raise 
    except Exception as e:
        logging.error(f"Unknown error while invoking Bedrock model: {e}")
        raise 


def generate_batch_note_embeddings(
    notes: List[Note],
    model_id: str = _EMBEDDING_TEXT_MODEL,
) -> List[Tuple[str, np.ndarray]]:
     """Process embeddings for a list of notes using a specified LLM model in batches."""
    client = create_bedrock_client()
    note_embeddings_list = []

    with ThreadPoolExecutor() as executor:
        note_embedding_futures = {
            executor.submit(get_text_embedding, client, note.textbody, model_id): note
            for note in notes
        }

        for future in as_completed(note_embedding_futures):
            note = note_embedding_futures[future]
            try:
                embedding = future.result()
                note_embeddings_list.append((note.id, embedding))
            except Exception as exc:
                raise TextEmbeddingGenerationError(note.id, exc)

    return note_embeddings_list
