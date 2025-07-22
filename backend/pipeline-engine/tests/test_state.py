from engine.state import StateJSON


def test_state_file(tmp_path):
    filepath = tmp_path / "state.json"
    state = StateJSON(filepath)

    state.update("task1", "success")
    state.update("task2", "failed")
    state.save()

    reloaded = StateJSON(filepath)
    assert reloaded.get("task1") == "success"
    assert reloaded.get("task2") == "failed"
