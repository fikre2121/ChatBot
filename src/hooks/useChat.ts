import { useEffect, useState } from "react";
import { sendMessage } from "@/lib/api";
import type { Conversation, Message } from "@/types/chat";

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("chat_conversations");

    if (saved) {
      const parsed: Conversation[] = JSON.parse(saved);

      setConversations(parsed);

      if (parsed.length > 0) {
        setActiveChatId(parsed[0].id);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_conversations", JSON.stringify(conversations));
  }, [conversations]);

  const activeConversation = conversations.find((c) => c.id === activeChatId);

  const createNewChat = () => {
    const newChat: Conversation = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    };

    setConversations((prev) => [newChat, ...prev]);

    setActiveChatId(newChat.id);
  };

  // SEND MESSAGE
  const send = async (text: string) => {
    if (!activeConversation) return;

    const trimmed = text.trim();

    if (!trimmed || loading) return;

    // USER MESSAGE
    const userMessage: Message = {
      role: "user",
      content: trimmed,
    };

    // UPDATED MESSAGE ARRAY
    const updatedMessages: Message[] = [
      ...activeConversation.messages,
      userMessage,
    ];

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: updatedMessages,
            }
          : chat,
      ),
    );

    setLoading(true);

    try {
      const payload: {
        prompt: string;
        conversationId?: string;
      } = {
        prompt: trimmed,
      };

      if (activeConversation.conversationId) {
        payload.conversationId = activeConversation.conversationId;
      }

      const response = await sendMessage(payload);

      // AI MESSAGE
      const aiMessage: Message = {
        role: "assistant",
        content: response.reply,
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                conversationId: response.conversationId,

                title:
                  chat.messages.length === 0
                    ? trimmed.slice(0, 30)
                    : chat.title,

                messages: [...updatedMessages, aiMessage],
              }
            : chat,
        ),
      );
    } catch (err) {
      console.error("❌ Chat Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    conversations,
    activeConversation,
    activeChatId,
    setActiveChatId,
    createNewChat,
    send,
    loading,
  };
};
