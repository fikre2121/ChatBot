import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatInput({ onSend, loading }: any) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();

    // 🔥 prevent empty messages
    if (!trimmed || loading) return;

    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 max-w-3xl mx-auto w-full">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message..."
        className="bg-zinc-900 border-zinc-700 text-white"
        disabled={loading}
      />

      <Button
        onClick={handleSend}
        disabled={loading || !text.trim()}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {loading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
}