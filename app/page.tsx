import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VariationVaultContent } from "./encoder-decoder-content";
import { ThemeToggle } from "@/components/theme-toggle";
import { Lock } from "lucide-react";

export default function VariationVault() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-slate-900 flex items-center justify-center p-4 transition-colors">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-2xl shadow-2xl border-2 dark:border-purple-800">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              VariationVault
            </CardTitle>
          </div>
          <CardDescription className="text-center text-base">
            Hide secret messages in plain sight using Unicode steganography
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<CardContent>Loading...</CardContent>}>
          <VariationVaultContent />
        </Suspense>
      </Card>
    </div>
  );
}
