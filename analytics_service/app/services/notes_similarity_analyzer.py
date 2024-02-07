import numpy as np
from itertools import combinations

from .text_embedding import get_text_embedding

def cosine_similarity(vecA, vecB):
  dot_product = np.dot(vecA, vecB)
  magnitude = np.linalg.norm(vecA) * np.linalg.norm(vecB)
  return dot_product / magnitude

def find_notes_similarity(notes, similarity_function):
  embeddings = [(note['id'], get_text_embedding(note['textbody'])) for note in notes]
  similarities = [
    {
      "source": f"Vec {i+1}",
      "target": f"Vec {j+1}",
      "value": cosine_similarity(vecA, vecB)
    }
    for (i, (_, vecA)), (j, (_, vecB)) in combinations(enumerate(embeddings), 2)
  ]
  return similarities
