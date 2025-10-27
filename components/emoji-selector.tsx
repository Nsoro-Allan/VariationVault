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
      {title && (
        <div className="font-semibold text-sm text-foreground">{title}</div>
      )}

      {!disabled && emojiList.length > 20 && (
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      <div className="max-h-52 overflow-y-auto border rounded-lg p-2 bg-background/50 dark:bg-background/20">
        <div className="flex flex-wrap gap-1.5">
          {filteredEmojis.length > 0 ? (
            filteredEmojis.map((emoji) => (
              <Button
                key={emoji}
                variant="outline"
                className={`w-11 h-11 p-0 text-lg disabled:opacity-50 transition-all hover:scale-110 ${
                  emoji === selectedEmoji
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-600 dark:border-purple-400 border-2 scale-105"
                    : "hover:border-purple-300 dark:hover:border-purple-700"
                }`}
                onClick={() => onEmojiSelect(emoji)}
                disabled={disabled}
              >
                {emoji}
              </Button>
            ))
          ) : (
            <div className="text-sm text-muted-foreground w-full text-center py-6">
              No matches found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
