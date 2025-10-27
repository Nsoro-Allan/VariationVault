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
    <CardContent className="space-y-4">
      <p>
        This tool allows you to encode a hidden message into an emoji or
        alphabet letter. You can copy and paste text with a hidden message in it
        to decode the message.
      </p>

      <div className="flex items-center justify-center space-x-2">
        <Label htmlFor="mode-toggle">Decode</Label>
        <Switch
          id="mode-toggle"
          checked={isEncoding}
          onCheckedChange={handleModeToggle}
        />
        <Label htmlFor="mode-toggle">Encode</Label>
      </div>

      <Textarea
        placeholder={
          isEncoding ? "Enter text to encode" : "Paste an emoji to decode"
        }
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="min-h-[100px]"
      />

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

      <Textarea
        placeholder={`${isEncoding ? "Encoded" : "Decoded"} output`}
        value={outputText}
        readOnly
        className="min-h-[100px]"
      />

      {errorText && <div className="text-red-500 text-center">{errorText}</div>}
    </CardContent>
  );
}
