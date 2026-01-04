from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_recommendation_endpoint():
    # Note: This might fail if the DB is not initialized, 
    # but it demonstrates the API structure.
    response = client.post(
        "/api/v1/recommend",
        json={"mood": "happy"}
    )
    assert response.status_code == 200
    assert "recommendations" in response.json()
    assert "explanation" in response.json()

