---
description: Use Bun instead of Node.js, npm, pnpm, or vite.
globs: "*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json"
alwaysApply: false
---

# PollyGlot - Translation App

A solo project from Scrimba's Fullstack Path (AI Engineering Section). PollyGlot is a web app that uses the OpenAI API to translate phrases between languages.

## Learning Context

This is a **learning project**. When assisting:
- Explain the "why" behind implementation choices
- Identify opportunities for the user to write meaningful code (5-10 lines)
- Focus on business logic, API integration patterns, and design decisions
- Ask the user to implement key pieces where their input shapes the solution
- Provide educational insights about web development and AI API usage

## Project Overview

**Goal:** Create a simple translation app where users can:
1. Type a message to translate
2. Select a target language (French, Spanish, or Japanese)
3. Press "Translate" to get the translation via OpenAI
4. View the result and "Start Over" to translate more

## Design Specifications

- **Header:** Dark navy blue background with world map pattern, parrot mascot logo
- **Branding:** "PollyGlot" with tagline "Perfect Translation Every Time"
- **Form Card:** White rounded card containing:
  - "Text to translate" label with 👇 emoji
  - Multi-line text input
  - "Select language" label with 👇 emoji
  - Radio buttons: French 🇫🇷, Spanish 🇪🇸, Japanese 🇯🇵
  - Dark blue "Translate" button
- **Color Scheme:** Navy blue (#1a2b4a-ish) primary, white card, clean minimal style

## API Integration

- Uses OpenAI API for translations
- API key stored in `.env` as `OPENAI_API_KEY` (Bun loads automatically)
- Endpoint: `/api/translate` accepts POST with `{ text, language }`

## Tech Stack

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // optional websocket support
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // handle close
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will transpile & bundle automatically. `<link>` tags can point to stylesheets and Bun's CSS bundler will bundle.

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";

// import .css files directly and it works
import './index.css';

import { createRoot } from "react-dom/client";

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.md`.
