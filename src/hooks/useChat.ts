import { useState } from "react";
import { sendMessage } from "@/lib/api";
import type { Message } from "@/types/chat";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim()) return;

    // 1. optimistic UI (user message instantly)
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    setLoading(true);

    try {
      console.log("📤 SENDING TO BACKEND:", {
        prompt: text,
        conversationId,
      });

      // 2. call backend
      const res = await sendMessage({
        prompt: text,
        conversationId,
      });

      console.log("📥 BACKEND RESPONSE:", res);

      // 3. store conversationId (CRITICAL FOR MEMORY)
      setConversationId(res.conversationId);

      // 4. add AI message
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
    } catch (err) {
      console.error("❌ CHAT ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    send,
    loading,
  };
};
