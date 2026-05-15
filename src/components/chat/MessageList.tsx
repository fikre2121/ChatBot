import MessageBubble from "./MessageBubble";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto w-full">
      {messages.length === 0 ? (
        <div className="text-center text-zinc-500 mt-10">
          Start a conversation 👋
        </div>
      ) : (
        messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
      )}
    </div>
  );
}
