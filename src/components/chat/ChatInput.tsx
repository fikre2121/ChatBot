import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onSend: (message: string) => void;
  loading: boolean;
};

export default function ChatInput({ onSend, loading }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="flex items-center gap-3 rounded-3xl border border-zinc-700 bg-zinc-900 p-3">
      <Input
        placeholder="Message ChatGPT..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="border-none bg-transparent text-white shadow-none focus-visible:ring-0"
      />

      <Button onClick={handleSend} disabled={loading} className="rounded-full">
        Send
      </Button>
    </div>
  );
}
