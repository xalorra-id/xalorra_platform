from setuptools import setup, find_packages

setup(
    name="xalorra-ml-core",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "scikit-learn",
        "xgboost",
        "pandas",
        "numpy",
        "joblib",
        "tensorflow",
        "click"
    ],
    entry_points={
        "console_scripts": [
            "xalorra = xalorra_ml_core.cli:main"
        ]
    },
)
