import pytest
from app.modules.ai.context import ContextManager
from app.modules.ai.prompts import PromptTemplates

@pytest.mark.asyncio
async def test_risk_score_computation():
    # Setup dummy database session context manager
    mgr = ContextManager(db=None)
    
    # Normal driving conditions: speed 50, zero fatigue, normal visibility and traction
    normal_risk = await mgr.compute_global_risk(speed=50, fatigue=0.0, visibility=10.0, traction=1.0)
    assert normal_risk == 0.0
    
    # Dangerous driving: speeding, high fatigue, poor visibility, and slippery roads
    high_risk = await mgr.compute_global_risk(speed=85, fatigue=0.8, visibility=1.0, traction=0.6)
    # fatigue: 0.8 * 40 = 32
    # speed: (85-70)*1.5 = 22.5
    # visibility: (5-1)*4 = 16
    # traction: (1-0.6)*20 = 8
    # total: 32 + 22.5 + 16 + 8 = 78.5
    assert high_risk > 70.0

def test_prompt_compilation():
    prompt = PromptTemplates.GUARDIAN_SYSTEM_PROMPT.format(
        telemetry="Speed: 60mph, RPM: 2000",
        driver_state="fatigued",
        weather="rain"
    )
    assert "GAURDIAN" in prompt
    assert "Speed: 60mph" in prompt
