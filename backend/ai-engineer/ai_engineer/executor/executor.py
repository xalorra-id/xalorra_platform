import os

def write_file(path: str, content: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

def append_to_file(path: str, content: str):
    with open(path, "a") as f:
        f.write("\n" + content)

def replace_in_file(path: str, old: str, new: str):
    with open(path, "r") as f:
        data = f.read()
    with open(path, "w") as f:
        f.write(data.replace(old, new))
