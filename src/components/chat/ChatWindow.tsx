import { useChat } from "@/hooks/useChat";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function ChatWindow() {
  const { messages, send, loading } = useChat();

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white">
      {/* HEADER */}
      <div className="border-b border-zinc-800 p-4 text-center font-semibold text-white">
        AI Chat Assistant
      </div>

      {/* MESSAGES */}
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto p-4">
          <MessageList messages={messages} />
        </div>
      </ScrollArea>

      {/* INPUT */}
      <div className="border-t border-zinc-800 p-4">
        <ChatInput onSend={send} loading={loading} />
      </div>
    </div>
  );
}
