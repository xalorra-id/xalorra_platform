import threading
import time


class Scheduler:
    def __init__(self):
        self.jobs = []

    def schedule(self, func, interval: int = 5, job_name: str = None):
        """
        Menjadwalkan fungsi untuk dijalankan setiap `interval` detik.

        :param func: Fungsi yang akan dipanggil
        :param interval: Waktu antar pemanggilan (detik)
        :param job_name: Nama job opsional untuk logging
        """

        def loop():
            name = job_name or func.__name__
            while True:
                print(f"⏱  [Scheduler] Running job: {name}")
                try:
                    func()
                except Exception as e:
                    print(f"❌  [Scheduler] Error in {name}: {e}")
                time.sleep(interval)

        thread = threading.Thread(target=loop, daemon=True)
        thread.start()
        self.jobs.append(thread)
        print(
            f"✅ [Scheduler] Job registered: {job_name or func.__name__} (interval: {interval}s)"
        )
