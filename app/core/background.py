import asyncio
import logging
from typing import Callable, Coroutine, Any

logger = logging.getLogger("gaurdian.background")

class BackgroundWorker:
    def __init__(self):
        self.tasks = set()

    def run_in_background(self, coro: Coroutine[Any, Any, Any]) -> asyncio.Task:
        task = asyncio.create_task(coro)
        self.tasks.add(task)
        task.add_done_callback(self.tasks.discard)
        return task

    async def shutdown(self):
        if not self.tasks:
            return
        logger.info(f"Cancelling {len(self.tasks)} background tasks during shutdown...")
        for task in self.tasks:
            task.cancel()
        await asyncio.gather(*self.tasks, return_exceptions=True)

background_worker = BackgroundWorker()
