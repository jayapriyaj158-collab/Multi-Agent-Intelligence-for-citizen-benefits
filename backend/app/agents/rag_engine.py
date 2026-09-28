import datetime
from typing import List, Dict, Any, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class GroundedRAGEngine:
    """RAG & Knowledge Freshness Engine. Stores chunked knowledge with verified metadata
    and evaluates semantic similarity against verified government corpus."""

    def __init__(self):
        self.corpus_chunks: List[Dict[str, Any]] = []
        self.vectorizer = TfidfVectorizer(stop_words='english', max_features=5000, ngram_range=(1, 2))
        self.tfidf_matrix = None
        self.is_indexed = False

    def build_index(self, schemes_data: List[Dict[str, Any]]):
        """Indexes scheme text, objectives, rules, and guidelines into grounded RAG chunks."""
        self.corpus_chunks = []
        for scheme in schemes_data:
            # Chunk 1: Overview & Objectives
            self.corpus_chunks.append({
                "chunk_id": f"{scheme['scheme_id']}_overview",
                "scheme_id": scheme["scheme_id"],
                "scheme_name": scheme["scheme_name"],
                "text": f"{scheme['scheme_name']}. {scheme['description']} Objective: {scheme.get('objective', '')}",
                "source_name": scheme.get("source_name", "Official Government Portal"),
                "source_url": scheme.get("official_source_url", ""),
                "source_level": scheme.get("source_level", 1),
                "last_verified": scheme.get("last_verified_at", "2026-09-20"),
                "category": scheme.get("category", "General"),
                "state": scheme.get("state", "All India")
            })

            # Chunk 2: Benefits & Entitlements
            self.corpus_chunks.append({
                "chunk_id": f"{scheme['scheme_id']}_benefits",
                "scheme_id": scheme["scheme_id"],
                "scheme_name": scheme["scheme_name"],
                "text": f"Benefits of {scheme['scheme_name']}: {scheme['benefits']} Benefit type: {scheme.get('benefit_type', '')}",
                "source_name": scheme.get("source_name", "Official Government Portal"),
                "source_url": scheme.get("official_source_url", ""),
                "source_level": scheme.get("source_level", 1),
                "last_verified": scheme.get("last_verified_at", "2026-09-20"),
                "category": scheme.get("category", "General"),
                "state": scheme.get("state", "All India")
            })

            # Chunk 3: Eligibility & Documents
            docs_str = ", ".join(scheme.get("required_documents", []))
            self.corpus_chunks.append({
                "chunk_id": f"{scheme['scheme_id']}_eligibility_docs",
                "scheme_id": scheme["scheme_id"],
                "scheme_name": scheme["scheme_name"],
                "text": f"Eligibility for {scheme['scheme_name']}: Income limit: {scheme.get('income_limit')}. Target group: {scheme.get('target_group', '')}. Required documents: {docs_str}",
                "source_name": scheme.get("source_name", "Official Government Portal"),
                "source_url": scheme.get("official_source_url", ""),
                "source_level": scheme.get("source_level", 1),
                "last_verified": scheme.get("last_verified_at", "2026-09-20"),
                "category": scheme.get("category", "General"),
                "state": scheme.get("state", "All India")
            })

        texts = [c["text"] for c in self.corpus_chunks]
        if texts:
            self.tfidf_matrix = self.vectorizer.fit_transform(texts)
            self.is_indexed = True

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """Retrieves top-k evidence chunks with cosine similarity and citation metadata."""
        if not self.is_indexed or not self.corpus_chunks:
            return []

        query_vec = self.vectorizer.transform([query])
        sims = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        top_indices = np.argsort(sims)[::-1][:top_k]

        results = []
        for idx in top_indices:
            score = float(sims[idx])
            chunk = self.corpus_chunks[idx].copy()
            chunk["similarity_score"] = round(score, 3)
            # Only include if meaningful similarity
            if score > 0.05:
                results.append(chunk)

        return results

rag_engine = GroundedRAGEngine()
