 === Xalorra Platform Makefile ===

.PHONY: help frontend backend all clean

help:
	@echo "Xalorra Platform Makefile Commands:"
	@echo "  make frontend     Run all frontend apps (Next.js dev)"
	@echo "  make backend      Run all backend engines (Python)"
	@echo "  make all          Run both frontend and backend"
	@echo "  make clean        Stop all running dev servers"

frontend:
	cd frontend/studio-web && pnpm dev & \
	cd frontend/landingpage && pnpm dev & \
	cd frontend/foundation-web && pnpm dev

backend:
	cd backend/api-engine && uvicorn main:app --reload & \
	cd backend/ml-core && python main.py & \
	cd backend/pipeline-engine && python main.py & \
	cd backend/feedback-engine && python main.py

all: frontend backend

clean:
	pkill -f uvicorn || true
	pkill -f "python main.py" || true
	pkill -f "pnpm dev" || true
```

---

## ✅ `README.md` (root `xalorra_platform/README.md`)

```markdown
# 🔷 Xalorra Platform

**Xalorra** is a modular AI Platform designed for open-source development, combining Machine Learning pipelines, orchestration, dataset management, and frontend UI into a scalable architecture.

---

## 📁 Project Structure

```

xalorra\_platform/
├── backend/       # All internal engines (API, MLCore, Dataset, etc.)
├── frontend/      # All frontend apps (Studio, Landing Page, Foundation UI)
├── shared/        # Shared utilities, config, and auth
├── scripts/       # Utility scripts and CLI automation
├── Makefile       # Quick commands to run frontend/backend
├── README.md      # This file
└── .gitignore     # Git ignore rules

````

---

## 🧠 Core Engines

- `api-engine/`: Lightweight internal API engine
- `ml-core/`: Training and evaluation ML pipeline
- `pipeline-engine/`: Task orchestrator like Prefect
- `dataset-engine/`: Upload, preview, and manage datasets
- `feedback-engine/`: Feedback labeling and auto-response

---

## 🌐 Frontend

- `studio-web/`: Xalorra Studio UI (Next.js)
- `landingpage/`: Marketing and whitepaper site
- `foundation-web/`: Website for the open-source community (Xalorra Foundation)

---

## 🚀 Getting Started

```bash
make all     # Run all frontend & backend
make clean   # Kill all dev processes
````
# xalorra_platform
