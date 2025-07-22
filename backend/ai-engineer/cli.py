import sys
import os
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

import typer
from ai_engineer.agent.lead import run_lead_mode

app = typer.Typer()

def main(task: str = typer.Argument(..., help="Tugas yang akan dianalisis oleh AI Engineer")):
    """AI Engineer Lead mode: analyze and plan for high-level tasks"""
    run_lead_mode(task)

app.command()(main)

if __name__ == "__main__":
    app()
