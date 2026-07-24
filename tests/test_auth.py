import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_user_registration_schema(client: AsyncClient):
    payload = {
        "email": "testdriver@gaurdian.ai",
        "full_name": "Test Driver",
        "role": "DRIVER",
        "password": "securepassword123"
    }
    # Call user registration router
    response = await client.post("/api/v1/users/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "testdriver@gaurdian.ai"
    assert "id" in data
