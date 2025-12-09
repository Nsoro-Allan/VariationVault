# 🔐 VariationVault

**Hide secret messages in plain sight using Unicode steganography**

VariationVault is a modern web application that allows you to encode hidden messages into emojis, letters, numbers, or any custom character using Unicode variation selectors. Share encoded content anywhere, and only those who know can decode your secret messages.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- 🎨 **Custom Carrier Characters** - Use any emoji, word, or symbol to hide your messages
- 😀 **500+ Preset Emojis** - Extensive collection organized by category
- 🔤 **Letters & Numbers** - Encode into standard alphabet characters and digits
- 🎯 **Special Characters** - Support for symbols and special characters
- 🔍 **Smart Search** - Quickly find the perfect emoji with built-in search
- 📋 **One-Click Copy** - Copy encoded/decoded messages instantly
- 🌓 **Dark/Light Mode** - Beautiful themes that adapt to your preference
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Real-Time Encoding** - See results instantly as you type
- 🔒 **Privacy First** - All encoding happens locally in your browser

## 🚀 Demo

Try it live: [VariationVault Demo](https://variation-vault.vercel.app) _(Update with your deployment URL)_

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Testing:** [Vitest](https://vitest.dev/)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Clone the Repository

```bash
git clone https://github.com/Nsoro-Allan/VariationVault.git
cd VariationVault
```

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

## 🧪 Running Tests

```bash
npm run test
```

## 📖 How It Works

VariationVault uses **Unicode Variation Selectors** to hide messages within characters. These are invisible Unicode characters (U+FE00 to U+FE0F and U+E0100 to U+E01EF) that can be appended to any character without changing its visual appearance.

### Encoding Process

1. Choose a carrier character (emoji, letter, number, or custom input)
2. Type your secret message
3. Each byte of your message is converted to a variation selector
4. These selectors are appended to your carrier character
5. The result looks like a single character but contains hidden data

### Decoding Process

1. Paste the encoded character
2. The app extracts the variation selectors
3. Converts them back to bytes
4. Reconstructs your original message

### Example

```
Input: "Hello"
Carrier: 😀
Output: 😀︀︁︂︂︃ (looks like just 😀 but contains hidden data)
```

## 🎯 Use Cases

- 🕵️ **Steganography** - Hide messages in social media posts
- 🎮 **Gaming** - Share secret codes with teammates
- 💬 **Messaging** - Send hidden messages in plain sight
- 🎓 **Education** - Learn about Unicode and steganography
- 🔐 **Privacy** - Communicate discreetly

## 📁 Project Structure

```
VariationVault/
├── app/
│   ├── emoji.ts                    # Emoji and character lists
│   ├── encoding.ts                 # Core encoding/decoding logic
│   ├── encoding.test.ts            # Unit tests
│   ├── encoder-decoder-content.tsx # Main content component
│   ├── layout.tsx                  # Root layout with theme provider
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── components/
│   ├── ui/                         # Shadcn UI components
│   ├── emoji-selector.tsx          # Emoji picker component
│   ├── theme-provider.tsx          # Theme context provider
│   └── theme-toggle.tsx            # Dark/light mode toggle
├── public/                         # Static assets
└── package.json                    # Dependencies and scripts
```

## 🎨 Customization

### Adding More Emojis

Edit `app/emoji.ts` and add your emojis to the `EMOJI_LIST` array:

```typescript
export const EMOJI_LIST = [
  "😀",
  "😃",
  "😄",
  // Add your emojis here
];
```

### Modifying Themes

The app uses Tailwind CSS with CSS variables. Customize colors in `app/globals.css`:

```css
:root {
  --primary: 262.1 83.3% 57.8%;
  /* Modify other colors */
}
```

## 🙏 Acknowledgments

- Forked from [Paul Butler's](https://github.com/paulgb) original project [emoji-encoder](https://github.com/paulgb/emoji-encoder)

## 🧑‍💻 Author

**🧑‍💻 Redesigned and updated by [Nsoro Allan.](https://github.com/Nsoro-Allan) 🧑‍💻**
