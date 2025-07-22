.PHONY: test run lint clean format

test:
	PYTHONPATH=. pytest tests/

run:
	PYTHONPATH=. python3 main.py

lint:
	ruff check . --ignore E501

format:
	ruff format .

clean:
	find . -type d -name "__pycache__" -exec rm -r {} +
	find . -type f -name "*.pyc" -delete
