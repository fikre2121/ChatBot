import type { ChatResponse } from "@/types/chat";

type SendMessagePayload = {
  prompt: string;
  conversationId?: string; 
};

const BASE_URL = "http://localhost:5000/api/chat";

export const sendMessage = async (
  payload: SendMessagePayload,
): Promise<ChatResponse> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  console.log("📥 API RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};
