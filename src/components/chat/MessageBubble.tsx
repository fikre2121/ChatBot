import { cn } from "@/lib/utils";

export default function MessageBubble({ message }: any) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "px-4 py-3 rounded-2xl max-w-[75%] text-sm leading-relaxed break-words whitespace-pre-wrap shadow-sm",
          isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-zinc-800 text-zinc-100 rounded-bl-sm",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
