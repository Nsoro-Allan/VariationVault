"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { decode, encode } from "./encoding";
import { EmojiSelector } from "@/components/emoji-selector";
import {
  ALPHABET_LIST,
  EMOJI_LIST,
  NUMBER_LIST,
  SPECIAL_CHAR_LIST,
} from "./emoji";

export function VariationVaultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read mode from URL parameters, other state stored locally
  const mode = searchParams.get("mode") || "encode";
  const [inputText, setInputText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("😀");
  const [outputText, setOutputText] = useState("");
  const [errorText, setErrorText] = useState("");

  // Update URL when mode changes
  const updateMode = (newMode: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", newMode);
    router.replace(`?${params.toString()}`);
  };

  // Convert input whenever it changes
  useEffect(() => {
    try {
      const isEncoding = mode === "encode";
      const output = isEncoding
        ? encode(selectedEmoji, inputText)
        : decode(inputText);
      setOutputText(output);
      setErrorText("");
    } catch (e) {
      setOutputText("");
      setErrorText(
        `Error ${mode === "encode" ? "encoding" : "decoding"}: Invalid input`
      );
    }
  }, [mode, selectedEmoji, inputText]);

  const handleModeToggle = (checked: boolean) => {
    updateMode(checked ? "encode" : "decode");
    setInputText(""); // Clear input text when mode changes
  };

  // Handle initial URL state
  useEffect(() => {
    if (!searchParams.has("mode")) {
      updateMode("encode");
    }
  }, [searchParams, updateMode]);

  const isEncoding = mode === "encode";

  return (
    <CardContent className="space-y-5 pb-6">
      <div className="bg-muted/50 dark:bg-muted/20 p-4 rounded-lg border">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Encode hidden messages into emojis or characters using Unicode
          variation selectors. Share them anywhere and only those who know can
          decode them!
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border">
        <Label htmlFor="mode-toggle" className="font-semibold cursor-pointer">
          Decode
        </Label>
        <Switch
          id="mode-toggle"
          checked={isEncoding}
          onCheckedChange={handleModeToggle}
          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
        />
        <Label htmlFor="mode-toggle" className="font-semibold cursor-pointer">
          Encode
        </Label>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          {isEncoding ? "Message to hide" : "Encoded message"}
        </Label>
        <Textarea
          placeholder={
            isEncoding
              ? "Type your secret message here..."
              : "Paste the encoded emoji or character here..."
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[120px] resize-none"
        />
      </div>

      {isEncoding && (
        <div className="space-y-4">
          <EmojiSelector
            onEmojiSelect={setSelectedEmoji}
            selectedEmoji={selectedEmoji}
            emojiList={EMOJI_LIST}
            disabled={!isEncoding}
            title="Pick an emoji"
          />

          <EmojiSelector
            onEmojiSelect={setSelectedEmoji}
            selectedEmoji={selectedEmoji}
            emojiList={ALPHABET_LIST}
            disabled={!isEncoding}
            title="Or pick a letter"
          />

          <EmojiSelector
            onEmojiSelect={setSelectedEmoji}
            selectedEmoji={selectedEmoji}
            emojiList={NUMBER_LIST}
            disabled={!isEncoding}
            title="Or pick a number"
          />

          <EmojiSelector
            onEmojiSelect={setSelectedEmoji}
            selectedEmoji={selectedEmoji}
            emojiList={SPECIAL_CHAR_LIST}
            disabled={!isEncoding}
            title="Or pick a special character"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          {isEncoding ? "Encoded output" : "Decoded message"}
        </Label>
        <Textarea
          placeholder={`${
            isEncoding
              ? "Your encoded message will appear here..."
              : "The hidden message will appear here..."
          }`}
          value={outputText}
          readOnly
          className="min-h-[120px] resize-none bg-muted/50 dark:bg-muted/20 font-mono"
        />
      </div>

      {errorText && (
        <div className="text-destructive text-center text-sm font-medium bg-destructive/10 p-3 rounded-lg border border-destructive/20">
          {errorText}
        </div>
      )}
    </CardContent>
  );
}
