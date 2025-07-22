# === Xalorra Platform Makefile ===

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
