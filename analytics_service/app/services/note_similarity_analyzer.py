from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List
import numpy as np
from itertools import combinations

from .text_embedding import get_text_embedding
from app.schemas.note_schemas import Note

_EMBEDDING_TEXT_MODEL = "amazon.titan-embed-text-v1"


def cosine_similarity(vecA, vecB):
    dot_product = np.dot(vecA, vecB)
    magnitude = np.linalg.norm(vecA) * np.linalg.norm(vecB)
    return dot_product / magnitude


def generate_batch_note_embeddings(notes: List[Note]):
    with ThreadPoolExecutor() as executor:
        note_embedding_futures = {
            executor.submit(
                get_text_embedding, note.textbody, _EMBEDDING_TEXT_MODEL
            ): note
            for note in notes
        }
        note_embeddings_list = []
        for future in as_completed(note_embedding_futures):
            note = note_embedding_futures[future]
            try:
                embedding = future.result()
                note_embeddings_list.append((note.id, embedding))
            except Exception as exc:
                raise Exception(
                    f"Note {note.id} raised an exception while attempting to generate text embedding: {exc}"
                )
    return note_embeddings_list


def find_note_similarities(notes: List[Note]):
    note_embeddings_list = generate_batch_note_embeddings(notes)
    note_similarities = [
        {
            "source": source_note_id,
            "target": target_note_id,
            "value": cosine_similarity(source_embedding, target_embedding),
        }
        for (i, (source_note_id, source_embedding)), (
            j,
            (target_note_id, target_embedding),
        ) in combinations(enumerate(note_embeddings_list), 2)
    ]

    return note_similarities
