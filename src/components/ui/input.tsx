import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="chat-input"
      className={cn(
        // base layout (ChatGPT style)
        "flex h-12 w-full rounded-full border border-zinc-700  px-4 text-sm text-black",

        // placeholder
        "placeholder:text-zinc-500",
        
        // smooth animation
        "transition-all duration-200",

        // disabled
        "disabled:opacity-50 disabled:cursor-not-allowed",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
