'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function UserPersonas() {
  return (
    <Container id="user-personas" className="mt-24 scroll-mt-24">
      <Subheading>6. User Personas</Subheading>
      <Heading as="h2" className="mt-2">
        Built for Developers, Analysts, and AI Enthusiasts
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra is designed to serve a broad audience of technical and semi-technical users. We focus on real-world workflows and empower users across roles.
      </Lead>

      <div className="mt-6 max-w-3xl text-sm/6 text-gray-600 space-y-6">
        <div>
          <h3 className="font-medium text-gray-800">Data Scientists</h3>
          <p>
            Use the platform to train, compare, and visualize multiple ML models (e.g., XGBoost, LightGBM, CatBoost, TensorFlow) across structured datasets.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">AI Engineers</h3>
          <p>
            Integrate generative models, deploy inference pipelines, and fine-tune LLMs through a common interface with sandboxed Python cells and vector database support.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">Analysts & Ops Teams</h3>
          <p>
            Use pre-trained pipelines to monitor business KPIs, detect anomalies, and trigger automated actions with minimal setup.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">Open Source Contributors</h3>
          <p>
            Help extend modules, develop plugins, and build community use cases via GitLab with badge-based recognition and optional sponsorship.
          </p>
        </div>
      </div>
    </Container>
  )
}
