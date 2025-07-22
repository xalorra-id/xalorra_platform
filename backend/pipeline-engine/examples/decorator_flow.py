from engine.decorators import task, flow


@task
def say_hello(name: str):
    print(f"Hello, {name}!")


@task
def add(a: int, b: int) -> int:
    return a + b


@flow
def main_flow():
    say_hello("Xalorra")
    result = add(2, 3)
    print(f"Hasil penjumlahan: {result}")


if __name__ == "__main__":
    main_flow()
