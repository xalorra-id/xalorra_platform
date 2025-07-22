_registry = {}


def register(pipeline):
    _registry[pipeline.name] = pipeline


def get(name):
    return _registry.get(name)
