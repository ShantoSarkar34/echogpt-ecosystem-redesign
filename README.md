# EchoGPT Ecosystem Redesign

A frontend redesign concept for the **EchoGPT ecosystem**, built as an assignment for the **AppifyDevs Software Engineering Internship (Frontend)**. One Next.js project delivers three connected experiences that share a single design system:

1. **Web application**: a modern AI chat dashboard
2. **Marketing landing page**: a single-page product site
3. **Chrome extension concept**: an interactive, compact popup with page-context features

> **Demo notice:** this is a frontend-only concept. There is no backend, no authentication, and no real AI. All assistant replies are generated locally from mock data, and the model names are representative placeholders. The project is not affiliated with or endorsed by the original product.

|  |  |
|---|---|
| **Live demo** | https://echogpt-ecosystem.vercel.app/ |

---

## Table of contents

- [Quick tour](#quick-tour)
- [Features](#features)
- [Additional features implemented](#additional-features-implemented)
- [Technologies used](#technologies-used)
- [Setup instructions](#setup-instructions)
- [Project structure](#project-structure)
- [Architecture decisions](#architecture-decisions)
- [Design system](#design-system)
- [Responsive design](#responsive-design)
- [Accessibility](#accessibility)
- [Animation approach](#animation-approach)
- [Performance](#performance)
- [Assumptions](#assumptions)
- [Known limitations](#known-limitations)
- [Future improvements](#future-improvements)
- [Deployment](#deployment)

---

## Quick tour

| Route | What it is |
|---|---|
| `/` | Landing page: hero, product preview, features, AI models, how it works, why EchoGPT, FAQ, final CTA |
| `/app` | Chat web app with sidebar, history, model selector, prompt input, and quick actions |
| `/app/settings` | Settings: theme, default model, response style, interface preferences, data reset |
| `/extension` | Chrome extension concept shown inside a mock browser window |

**Things worth trying**

- Send a prompt in `/app`. A typing indicator appears, then a mock reply (speed depends on the selected model).
- Type `hello /error` to preview the error state, then press **Retry**.
- Open `/extension` and click the extension icon in the mock toolbar to open or close the popup.
- Turn **Page context** on or off in the popup and watch the quick actions change.
- Start a chat in the extension, then open `/app`. It appears in the web app's history.
- Change a setting in `/app/settings` (for example, **Compact messages**) and return to the chat.
- Toggle dark and light themes on any route.

---

## Features

### Web application (`/app`)

- Dashboard layout with a persistent sidebar on desktop and an accessible **drawer** on mobile
- **Conversation history** grouped by day (Today, Yesterday, Previous 7 days)
- **New chat** flow: a draft chat is only created when the first message is sent, and its title comes from that message
- **AI model selector** (dropdown with descriptions and badges), remembered per conversation
- User and assistant **message bubbles**, with a copy button on assistant replies
- **Auto-growing prompt input**: Enter to send, Shift+Enter for a new line, IME-safe
- **Quick actions** on the empty state that prefill the prompt
- **Loading state** (animated typing indicator) and **error state** with retry
- Auto-scroll to the latest message, with instant scrolling under reduced motion
- Long titles and long unbroken text are handled without overflow

### Landing page (`/`)

- Sticky responsive navbar with a mobile menu
- Hero with clear primary and secondary calls to action
- Product preview that mirrors the real app UI
- Sections for features, AI models (with speed and depth meters), how it works, and why EchoGPT
- FAQ built on native `<details>` elements
- Final call to action and footer
- Subtle scroll-reveal animations

### Chrome extension concept (`/extension`)

- Compact 380px popup shell, shown inside a mock browser with an address bar and toolbar icon
- **Three tabs:** Chat, History, Settings
- **Page-context concept:** a mock article is "read" by the extension, and quick actions change to page-specific ones such as *Summarize this page* and *Explain selected text*
- Model selection, theme toggle, and new chat in a compact header
- History with **search**
- Extension-specific settings

### Settings (`/app/settings`)

| Setting | Effect |
|---|---|
| Theme (Light, Dark, System) | Switches the whole site |
| Default model | Used when starting a new chat |
| Response style (Concise, Balanced, Detailed) | Changes the wording of mock replies |
| Compact messages | Tighter chat spacing |
| Enter to send | When off, Ctrl/⌘ + Enter sends |
| Reduce animations | Minimizes motion app-wide, in addition to the OS setting |
| Reset preferences, Reset demo chats | Restore defaults (chat reset uses a confirmation dialog) |

---

## Additional features implemented

Beyond the assignment's baseline requirements:

- **One shared chat store across the web app and the extension**: a conversation started in one is visible in the other
- **Persistent user preferences** (localStorage) with deferred hydration, so there are no SSR hydration mismatches
- **Fully working settings**: every control changes real behavior in the UI
- **In-app "Reduce animations"** preference layered on top of `prefers-reduced-motion`
- **Model-aware mock responses**: reply delay and wording vary by model and response style
- **Keyword-aware mock replies**, including page-aware replies in the extension
- **Interactive browser mockup** for the extension, where the toolbar icon opens and closes the popup with an animation
- **Skip links** on both the landing page and the app
- **Custom 404 page** and **error boundary** page
- **Custom UI primitives**: `Switch` and `SegmentedControl` (native radio inputs, so arrow-key navigation works natively), with no extra dependencies
- **Copy-to-clipboard** for assistant replies
- **Conversation search** in the extension history tab
- **Mobile keyboard handling**: 16px inputs to prevent iOS zoom, and the `interactive-widget` viewport setting
- **Typed data layer**: content lives in `data/` and is separated from presentation
- A **`npm run check`** script that runs lint, type checking, and a production build in one command

---

## Technologies used

| Area | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript (strict) |
| UI library | React 19 |
| Styling | Tailwind CSS v4 (CSS-first config, design tokens as CSS variables) |
| Components | Custom components with `class-variance-authority`, `clsx`, `tailwind-merge` |
| Accessible primitives | Radix UI: Dialog, Dropdown Menu, Tabs, Slot |
| Icons | Lucide React |
| Animation | Motion (`motion/react`) using `LazyMotion` with `domAnimation` |
| Theming | `next-themes` |
| State | Zustand (chat state and persisted preferences) |
| Fonts | Geist via `next/font` |
| Hosting | Vercel |

No backend, database, authentication, payments, or external AI API is used.

---

## Setup instructions

### Prerequisites

- Node.js 20.9 or newer (developed on Node 24)
- npm

### Install and run

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd echogpt-ecosystem-redesign

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run check` | Lint, type check, and build in one step |

### Environment variables

None are required. The project has no secrets and makes no network calls to third-party APIs.

---

## Project structure

```text
app/
├── (marketing)/          # Landing page route group (layout with navbar and footer)
│   ├── layout.tsx
│   └── page.tsx
├── app/                  # Web application
│   ├── layout.tsx        # App shell (sidebar and drawer)
│   ├── page.tsx          # Chat
│   └── settings/page.tsx
├── extension/page.tsx    # Chrome extension concept
├── error.tsx             # Error boundary page
├── not-found.tsx         # Custom 404
├── layout.tsx            # Root layout, fonts, providers, metadata, viewport
└── globals.css           # Design tokens, themes, motion tokens

components/
├── chat/                 # Sidebar, header, messages, composer, quick actions, model selector
├── extension/            # Popup panel, tabs, browser mockup, context toggle
├── landing/              # Navbar, hero, sections, footer, reveal animation
├── settings/             # Settings sections and global settings effects
├── shared/               # Logo, theme toggle, container
└── ui/                   # Button, Switch, SegmentedControl

data/                     # Mock conversations, models, quick actions, landing content
hooks/                    # Zustand stores, useMounted, useMediaQuery
lib/                      # Utilities and the mock response generator
providers/                # Theme, motion, and settings providers
types/                    # Shared TypeScript types
```

---

## Architecture decisions

- **One project, three experiences.** Routes and route groups keep the landing page, app, and extension separate while allowing them to share components, tokens, and state.
- **Server components by default.** Client components are used only where interactivity requires them, so most landing sections ship no component JavaScript.
- **Zustand only where state is truly shared.** The chat store is shared by the web app and the extension. Preferences live in a second, persisted store. Everything else is local state.
- **Hydration-safe persistence.** The preferences store uses `skipHydration` and is rehydrated after mount, avoiding server and client mismatches.
- **Content separated from UI.** Copy, mock chats, models, and quick actions live in `data/`, so wording changes never touch components.
- **Accessible primitives from Radix, styling from our own tokens.** Dialogs, menus, and tabs get correct focus management and keyboard behavior without inheriting an external visual style.
- **Hand-built components instead of the shadcn CLI.** This keeps the theme-token system under full control and avoids extra generated files and dependencies.
- **Representative, not factual, content.** Model names, articles, and answers are clearly labeled as demo content.
- **Deliberately omitted sections.** Pricing and testimonials were left out because they would present invented claims as facts and would only lengthen the page.

---

## Design system

**Direction:** dark-first, violet and indigo, layered surfaces, subtle borders, controlled shadows, and restrained gradients. No heavy glassmorphism or neon.

- **Tokens:** colors, radii, shadows, fonts, and motion are CSS variables exposed to Tailwind through `@theme`. Components use semantic names such as `bg-surface`, `text-muted-foreground`, and `border-border` rather than hard-coded colors.
- **Themes:** the light theme is designed separately, not inverted. It has its own surface ladder, borders, and shadows.
- **Contrast adjustments:** darker subtle text in light mode, a stronger violet for filled buttons in both themes, and a dedicated solid red for destructive buttons so white text passes AA.
- **Typography:** one font family (Geist) with a consistent scale for headings, body, labels, and captions.
- **Shared primitives:** buttons, switches, segmented controls, and message components are reused across the app, landing page, and extension.

---

## Responsive design

- Mobile-first layouts checked at 360, 390, 768, 1024, 1440, and 1920px widths
- **App:** desktop sidebar becomes a focus-trapped drawer below 1024px, and the drawer closes automatically if the window grows past that breakpoint
- **Composer:** stays usable on mobile, respects safe-area insets, and uses 16px text to avoid iOS zoom
- **Landing page:** sections stack cleanly, CTAs go full width on small screens, and the mobile menu replaces the desktop nav
- **Extension:** the browser frame is hidden on small screens and the popup is shown on its own
- Long titles truncate, long words wrap, and tables and wide content never cause page-level horizontal scroll
- `100dvh` is used for full-height layouts on mobile browsers

---

## Accessibility

- Semantic landmarks, a logical heading hierarchy, and **skip links**
- Full **keyboard support**: Tab order, Esc to close overlays, arrow keys in tabs, segmented controls, and menus
- Visible **focus rings** on all interactive elements
- Accessible names for icon buttons, `aria-current` on active items, `role="switch"` with `aria-checked`, `aria-pressed` on toggle buttons, and `role="alert"` on errors
- The message list is a polite live region, and the typing indicator has a screen-reader label
- Radix primitives for dialogs, dropdowns, and tabs (focus trap and focus return)
- Information is never conveyed by color alone (for example, On/Off labels beside toggles)
- Respects `prefers-reduced-motion`, plus an in-app override
- Touch targets sized for mobile, with enlarged hit areas on small controls

---

## Animation approach

- **Subtle, purposeful, and fast:** roughly 150 to 400ms, with small movements
- **Scroll reveals** on landing sections use a single reusable component
- **Hero entrance uses pure CSS** so above-the-fold content does not wait for JavaScript
- **Chat:** messages fade in, and the typing indicator uses a gentle opacity pulse
- **Overlays:** drawer, dropdown, dialog, and extension popup use short transitions
- `LazyMotion` with `domAnimation` keeps the animation bundle small
- All motion respects the OS reduced-motion setting and the in-app "Reduce animations" toggle

---

## Performance

- Static prerendering for every route
- Server components for landing content; client components only where needed
- Self-hosted font via `next/font` (single family)
- Reduced animation bundle with `LazyMotion`
- `memo` on message bubbles to avoid re-rendering the whole conversation
- No external images, no third-party scripts, and minimal dependencies

**Lighthouse (production build):** _add your scores here after running Lighthouse_

| Route | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | | | | |
| `/app` | | | | |
| `/extension` | | | | |

---

## Assumptions

- **No real AI or backend.** The brief says a real AI API is not required, so all responses are mocked locally.
- **The Chrome extension is a concept**, built as an interactive page inside the same Next.js project, not a packaged Manifest V3 extension.
- **Model names are placeholders** (Echo Swift, Echo Balanced, Echo Deep) and do not describe real capabilities.
- **The "page" in the extension is a mock article.** Page context is simulated, not read from a real tab.
- **Chats are session-only.** Conversations live in memory and reset on refresh; only preferences and theme are saved (in localStorage).
- **Details of the original product** were not verified, so the design, copy, and features are original and representative.
- **Modern evergreen browsers** are the target.
- **English only.** Internationalization was out of scope.
- The brand mark is a simple placeholder and can be replaced with official assets.

---

## Known limitations

- Replies are keyword-based mock responses, not real AI output
- Conversations are not persisted between page loads
- The extension is not installable and does not interact with real web pages
- No Markdown or code-block rendering in messages
- No automated tests yet (testing has been manual and via Lighthouse)
- No internationalization or right-to-left layout support

---

## Future improvements

- Connect a real AI provider through a server route with streaming, keeping API keys server-side only
- Persist conversations (IndexedDB or a database) and add authentication
- Markdown and syntax-highlighted code blocks in replies
- Package the popup as a real Manifest V3 extension with a content script for genuine page context
- Automated tests: unit tests for the stores and mock generator, and Playwright end-to-end tests for the key flows
- Message actions: regenerate, edit, delete, and export
- Internationalization
- Social preview image and richer metadata

---

## Deployment

The project is deployed on **Vercel**: https://echogpt-ecosystem.vercel.app/

To deploy your own copy:

1. Push the repository to GitHub.
2. Import the repository in Vercel (the Next.js preset is detected automatically).
3. Leave the build settings at their defaults, since no environment variables are required.
4. Deploy.

Before deploying, run:

```bash
npm run check
```

---

## Acknowledgements

Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide](https://lucide.dev/), [Motion](https://motion.dev/), [Zustand](https://zustand-demo.pmnd.rs/), and [next-themes](https://github.com/pacocoursey/next-themes).