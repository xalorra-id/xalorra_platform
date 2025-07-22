'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function KeyFeatures() {
  return (
    <Container id="key-features" className="mt-24 scroll-mt-24">
      <Subheading>4. Key Features</Subheading>
      <Heading as="h2" className="mt-2">
        Built for Real-World AI Workflows
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra Studio delivers a unified experience for building, testing, and deploying AI — from GenAI to classic ML.
      </Lead>

      <ul className="mt-6 text-sm/6 text-gray-600 max-w-3xl list-disc pl-6 space-y-3">
        <li>
          <strong>Prompt Playground:</strong> A rapid interface to experiment with LLMs, adjust temperature, top-k, and save inference chains.
        </li>
        <li>
          <strong>Notebook-style Editors:</strong> Mix code, markdown, and outputs for storytelling and iterative exploration.
        </li>
        <li>
          <strong>Dataset Versioning:</strong> Upload and manage tabular datasets with automatic metadata extraction.
        </li>
        <li>
          <strong>Train & Evaluate:</strong> Run training jobs for structured models (e.g., XGBoost, LightGBM) and fine-tune GenAI models in isolated sandboxes.
        </li>
        <li>
          <strong>Model Registry:</strong> Track models, experiments, metrics, and artifacts for reproducibility and auditability.
        </li>
        <li>
          <strong>Deployment Pipeline:</strong> Launch models as APIs, streamlit apps, or batch pipelines with environment templates.
        </li>
        <li>
          <strong>Vector Search:</strong> Integrate vector databases like Qdrant for semantic search, embeddings, and RAG applications.
        </li>
      </ul>
    </Container>
  )
}
