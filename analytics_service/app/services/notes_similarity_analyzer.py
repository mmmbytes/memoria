from typing import List
import numpy as np
from itertools import combinations

from .text_embedding import get_text_embedding
from app.schemas.note_schemas import Note

EMBED_TEXT_MODEL = "amazon.titan-embed-text-v1"

def cosine_similarity(vecA, vecB):
  dot_product = np.dot(vecA, vecB)
  magnitude = np.linalg.norm(vecA) * np.linalg.norm(vecB)
  return dot_product / magnitude

def find_notes_similarity(notes: List[Note]):
  embeddings = [(note.id, get_text_embedding(note.textbody, EMBED_TEXT_MODEL)) for note in notes]
  similarities = [
    {
      "source": source_id,
      "target": target_id,
      "value": cosine_similarity(vecA, vecB)
    }
    for (i, (source_id, vecA)), (j, (target_id, vecB)) in combinations(enumerate(embeddings), 2)
  ]

  return similarities
