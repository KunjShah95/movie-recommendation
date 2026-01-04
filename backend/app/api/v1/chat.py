# app/api/v1/chat.py

from fastapi import APIRouter, Depends
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter()
chat_service = ChatService()

@router.post("/", response_model=ChatResponse)
async def chat_with_archivist(request: ChatRequest):
    """
    Handles a conversational turn with the Cinematic Archivist.
    """
    messages_dict = [m.model_dump() for m in request.messages]
    result = await chat_service.get_chat_response(messages_dict, request.context)
    return result
