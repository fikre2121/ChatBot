import type { Message } from "@/types/chat";

type Props = {
  messages: Message[];
};

export default function MessageList({ messages }: Props) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              message.role === "user"
                ? "bg-white text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
