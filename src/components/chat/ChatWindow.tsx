import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

import { useChat } from "@/hooks/useChat";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function ChatWindow() {
  const {
    conversations,
    activeConversation,
    setActiveChatId,
    createNewChat,
    send,
    loading,
  } = useChat();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // AUTO SCROLL ONLY CHAT AREA
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeConversation?.messages]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#212121] text-white">
      <div className="flex h-full">
        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:static z-50
            h-full w-72
            bg-[#171717]
            border-r border-zinc-800
            flex flex-col
            transition-transform duration-300
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* SIDEBAR HEADER */}
          <div className="shrink-0 p-3 border-b border-zinc-800">
            <Button
              onClick={createNewChat}
              className="w-full justify-start rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white"
            >
              + New Chat
            </Button>
          </div>

          {/* CONVERSATIONS */}
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {conversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setSidebarOpen(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-800 transition"
                >
                  <p className="truncate">{chat.title}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* MAIN AREA */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* TOP BAR */}
          <div className="shrink-0 border-b border-zinc-800 bg-[#212121]">
            <div className="flex items-center gap-3 px-4 py-4">
              {/* MOBILE MENU BUTTON */}
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="size-5" />
              </Button>

              <h1 className="text-sm font-medium">ChatGPT Clone</h1>
            </div>
          </div>

          {/* CHAT SCROLL AREA */}
          <div className="min-h-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-6">
                <MessageList messages={activeConversation?.messages || []} />

                <div ref={bottomRef} />
              </div>
            </ScrollArea>
          </div>

          {/* FIXED INPUT */}
          <div className="shrink-0 border-t border-zinc-800 bg-[#212121] px-3 py-4 sm:px-4">
            <div className="mx-auto w-full max-w-3xl">
              <ChatInput onSend={send} loading={loading} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
