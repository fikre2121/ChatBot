export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  success: boolean;
  conversationId: string;
  reply: string;
};
