import subprocess

def get_project_context() -> str:
    try:
        tree = subprocess.getoutput("tree -L 2 backend/")
        git = subprocess.getoutput("git status")
        return f"{tree}\n\nGit Status:\n{git}"
    except Exception as e:
        return f"Error mengambil konteks: {e}"
