# setup.py

from setuptools import setup, find_packages

setup(
    name="xalorra",
    version="0.3.0",
    packages=find_packages(),
    install_requires=[
        "uvicorn",
    ],
    entry_points={
        "console_scripts": [
            "xalorra = xalorra.cli:main"
        ]
    },
    include_package_data=True,
    author="Xalorra Foundation",
    description="Xalorra Internal CLI for orchestration, logs, and model operations",
    python_requires=">=3.8",
)
