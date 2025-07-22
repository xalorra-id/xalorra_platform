#!/bin/bash

echo "🛠 Membuat struktur AI Engineer internal..."

mkdir -p ai_engineer/{agent,context,executor,memory,tools,prompts}
touch cli.py
touch ai_engineer/__init__.py

# File inti
echo 'import typer\nfrom ai_engineer.agent.lead import run_lead_mode\n\napp = typer.Typer()\n\n@app.command()\ndef lead(task: str):\n    run_lead_mode(task)\n\nif __name__ == "__main__":\n    app()' > cli.py

echo 'def run_lead_mode(task):\n    print(f"🚀 Planning: {task}")\n    # Tambahkan eksekusi planner nanti' > ai_engineer/agent/lead.py

# Prompt template
echo 'Kamu adalah Lead Engineer Xalorra.\nTask: "{prompt}"\nContext:\n{context}' > ai_engineer/prompts/lead_architect.txt

echo "✅ Struktur dasar selesai dibuat."
