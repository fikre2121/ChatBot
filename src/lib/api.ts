import type { ChatResponse } from "@/types/chat";

const BASE_URL = "http://localhost:3000/api/chat";

export const sendMessage = async (payload: {
  prompt: string;
  conversationId: string | null;
}): Promise<ChatResponse> => {
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
