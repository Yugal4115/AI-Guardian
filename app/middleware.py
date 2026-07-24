import time
import logging
from fastapi import FastAPI
from starlette.datastructures import MutableHeaders

logger = logging.getLogger("gaurdian.middleware")
logging.basicConfig(level=logging.INFO)

class LoggingMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        start_time = time.perf_counter()
        path = scope.get("path", "")
        method = scope.get("method", "")

        async def send_wrapper(message):
            if message["type"] == "http.response.start":
                process_time = (time.perf_counter() - start_time) * 1000
                headers = MutableHeaders(scope=message)
                headers["X-Process-Time-Ms"] = f"{process_time:.2f}"
                status_code = message.get("status", 200)
                logger.info(
                    f"[{method}] {path} - Status: {status_code} - Duration: {process_time:.2f}ms"
                )
            await send(message)

        try:
            await self.app(scope, receive, send_wrapper)
        except Exception as e:
            process_time = (time.perf_counter() - start_time) * 1000
            logger.error(
                f"[{method}] {path} failed: {str(e)} - Duration: {process_time:.2f}ms"
            )
            raise e

def register_middleware(app: FastAPI):
    app.add_middleware(LoggingMiddleware)
