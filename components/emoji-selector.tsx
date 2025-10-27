"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EmojiSelectorProps {
  onEmojiSelect: (emoji: string) => void;
  disabled: boolean;
  selectedEmoji: string;
  emojiList: string[];
  title?: string;
}

export function EmojiSelector({
  onEmojiSelect,
  disabled,
  selectedEmoji,
  emojiList,
  title,
}: EmojiSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmojis = emojiList.filter((emoji) =>
    emoji.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2">
      {title && <div className="font-bold text-sm">{title}</div>}

      {!disabled && emojiList.length > 20 && (
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      )}

      <div className="max-h-48 overflow-y-auto border rounded-md p-2">
        <div className="flex flex-wrap gap-1">
          {filteredEmojis.length > 0 ? (
            filteredEmojis.map((emoji) => (
              <Button
                key={emoji}
                variant="outline"
                className={`w-10 h-10 p-0 text-base disabled:opacity-50 ${
                  emoji === selectedEmoji
                    ? "bg-accent border-purple-500 border-2"
                    : ""
                }`}
                onClick={() => onEmojiSelect(emoji)}
                disabled={disabled}
              >
                {emoji}
              </Button>
            ))
          ) : (
            <div className="text-sm text-muted-foreground w-full text-center py-4">
              No matches found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
