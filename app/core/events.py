import asyncio
import logging
from typing import Any, Callable, Dict, List

logger = logging.getLogger("gaurdian.events")

class EventBus:
    def __init__(self):
        self._listeners: Dict[str, List[Callable[[Any], Any]]] = {}

    def subscribe(self, event_type: str, handler: Callable[[Any], Any]):
        if event_type not in self._listeners:
            self._listeners[event_type] = []
        self._listeners[event_type].append(handler)
        logger.info(f"Handler {handler.__name__} registered for event: {event_type}")

    def unsubscribe(self, event_type: str, handler: Callable[[Any], Any]):
        if event_type in self._listeners:
            try:
                self._listeners[event_type].remove(handler)
                logger.info(f"Handler {handler.__name__} unsubscribed from event: {event_type}")
            except ValueError:
                pass

    async def publish(self, event_type: str, data: Any = None):
        if event_type not in self._listeners:
            return
        
        logger.debug(f"Publishing event {event_type} to {len(self._listeners[event_type])} handlers")
        
        tasks = []
        for handler in self._listeners[event_type]:
            if asyncio.iscoroutinefunction(handler):
                tasks.append(asyncio.create_task(handler(data)))
            else:
                try:
                    handler(data)
                except Exception as e:
                    logger.error(f"Error executing event handler {handler.__name__}: {str(e)}")

        if tasks:
            results = await asyncio.gather(*tasks, return_exceptions=True)
            for res in results:
                if isinstance(res, Exception):
                    logger.error(f"Async event handler raised exception: {str(res)}")

# Global event bus instance
event_bus = EventBus()
