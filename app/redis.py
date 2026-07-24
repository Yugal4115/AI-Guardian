import asyncio
import logging
from typing import AsyncGenerator
import redis.asyncio as aioredis
from app.config import settings

logger = logging.getLogger("gaurdian.redis")

# Create connection pool
redis_pool = aioredis.ConnectionPool.from_url(
    settings.REDIS_URL,
    decode_responses=True,
    max_connections=50
)

class MockRedis:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(MockRedis, cls).__new__(cls)
            cls._instance.store = {}
        return cls._instance

    async def ping(self):
        return True

    async def get(self, key: str) -> str | None:
        return self.store.get(key)

    async def set(self, key: str, value: str, ex: int = None) -> bool:
        self.store[key] = str(value)
        return True

    async def delete(self, key: str) -> int:
        if key in self.store:
            del self.store[key]
            return 1
        return 0

    async def publish(self, channel: str, message: str) -> int:
        logger.info(f"[MockRedis Publish] Channel: {channel} | Message: {message}")
        return 1

    async def close(self):
        pass

# Async dependency for Redis
async def get_redis() -> AsyncGenerator[aioredis.Redis | MockRedis, None]:
    client = aioredis.Redis(connection_pool=redis_pool)
    try:
        # Check if Redis is responsive
        await asyncio.wait_for(client.ping(), timeout=1.0)
        yield client
    except Exception:
        logger.warning("Redis connection failed. Falling back to MockRedis.")
        yield MockRedis()
    finally:
        await client.close()

# Redis helper utility class for simple get/set/publish operations
class RedisManager:
    def __init__(self, client = None):
        self._client = client

    async def _get_client(self):
        if self._client:
            return self._client
        client = aioredis.Redis(connection_pool=redis_pool)
        try:
            await asyncio.wait_for(client.ping(), timeout=1.0)
            return client
        except Exception:
            return MockRedis()

    async def get(self, key: str) -> str | None:
        client = await self._get_client()
        return await client.get(key)

    async def set(self, key: str, value: str, expire: int = None) -> bool:
        client = await self._get_client()
        return await client.set(key, value, ex=expire)

    async def delete(self, key: str) -> int:
        client = await self._get_client()
        return await client.delete(key)

    async def publish(self, channel: str, message: str) -> int:
        client = await self._get_client()
        return await client.publish(channel, message)

    async def close(self):
        if self._client:
            await self._client.close()
