from engine.scheduler import Scheduler
import time


def test_scheduler_runs():
    triggered = []

    def task():
        triggered.append("run")
        print("✅ scheduled task executed")

    sched = Scheduler()
    sched.schedule(task, interval=2)

    time.sleep(5)
    assert len(triggered) >= 2
