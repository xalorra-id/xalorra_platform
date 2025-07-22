# pipelines/hello_decorated.py
from pipeline.decorators import task, flow


@task
def say_hello():
    print("Hello from @task!")


@task
def say_done():
    print("This is done task.")


@flow
def hello_decorated(say_hello=say_hello, say_done=say_done):
    pass  # urutan eksekusi dikontrol oleh Pipeline.add_task()

