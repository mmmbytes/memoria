from typing import Callable, Dict, List, Union
import numpy as np
from itertools import combinations

from .text_embedding import generate_batch_note_embeddings
from app.schemas.note_schemas import Note


def cosine_similarity(vec_a: np.ndarray, vec_b: np.ndarray) -> float:
    """Calculate the cosine similarity between two vectors."""
    dot_product = np.dot(vec_a, vec_b)
    magnitude = np.linalg.norm(vec_a) * np.linalg.norm(vec_b)
    return dot_product / magnitude


def find_note_similarities(
    notes: List[Note],
    similarity_func: Callable[[np.ndarray, np.ndarray], float] = cosine_similarity,
) -> List[Dict[str, Union[str, float]]]:
    """Compute semantic similarities between notes using a specified similarity function to compare text embeddings."""
    note_embeddings_list = generate_batch_note_embeddings(notes)
    note_similarities = [
        {
            "source": source_note_id,
            "target": target_note_id,
            "value": similarity_func(source_embedding, target_embedding),
        }
        for (i, (source_note_id, source_embedding)), (
            j,
            (target_note_id, target_embedding),
        ) in combinations(enumerate(note_embeddings_list), 2)
    ]

    return note_similarities
