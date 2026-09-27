# EchoGPT Ecosystem Redesign

A frontend redesign concept for the **EchoGPT ecosystem**, built as an assignment for the **AppifyDevs Software Engineering Internship (Frontend)**. One Next.js project delivers a marketing site, a full AI-workspace dashboard (14 feature pages plus chat and settings), a Chrome extension concept, and a demo authentication flow — all sharing a single design system.

> **Demo notice:** this is a frontend-only concept. There is no backend, no real authentication, no real payments, and no real AI. Every "generate," "connect," "subscribe," and "sign in" flow is simulated with mock data and local state, and is labeled as such in the UI. Model names, product names, and community stats are representative placeholders.

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| **Live demo**         | https://echogpt-ecosystem.vercel.app/                        |
| **GitHub repository** | https://github.com/ShantoSarkar34/echogpt-ecosystem-redesign |

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

| Route                | What it is                                                   |
| -------------------- | ------------------------------------------------------------ |
| `/`                  | Landing page                                                 |
| `/app`               | Chat                                                         |
| `/app/settings`      | Settings (theme, model, response style, interface prefs)     |
| `/app/image-studio`  | Image Studio — mock AI image generation                      |
| `/app/video-studio`  | Video Studio — mock AI video generation with progress        |
| `/app/compare`       | Compare 2–4 AI models side by side                           |
| `/app/connectors`    | Manage integrations (Drive, Slack, GitHub, etc.)             |
| `/app/history`       | Unified activity history across chats, images, videos, tasks |
| `/app/store`         | AI tools/templates/prompts marketplace                       |
| `/app/tasks`         | AI Tasks — create and run mock background tasks              |
| `/app/job-analysis`  | Paste a job description, get a mock analysis                 |
| `/app/sop-builder`   | Generate, edit, and export a mock SOP                        |
| `/app/support`       | FAQ search + a demo support ticket flow                      |
| `/app/newsletter`    | Newsletter subscribe + recent issues                         |
| `/app/subscriptions` | Plans, current-plan indicator, demo subscribe flow           |
| `/app/platform`      | Model catalog with search and provider filters               |
| `/app/discord`       | Community page with a demo join flow                         |
| `/extension`         | Chrome extension concept (in a mock browser)                 |

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

### Dashboard shell

- One shared `AppShell` (sidebar + header) used by every `/app/*` route — no per-page duplication
- Sidebar organized into **Engagement**, **Help & Support**, **Account**, and **Platform** sections, plus the original conversation history pinned at the top
- Shared `AppHeader`: page title, the chat's model selector (shown only on `/app`), and a Sign In / signed-in-user control
- Mobile drawer, active-state highlighting, and keyboard navigation across all 17 in-app routes

### Chat (`/app`) — unchanged from the original build

- New chat, grouped history (Today/Yesterday/Previous 7 days), model selector remembered per conversation
- Quick actions, Markdown-lite formatted replies, regenerate, edit-and-resend
- Loading, empty, and error (`/error` + retry) states
- Enter/Shift+Enter/Ctrl+Enter behavior driven by Settings

### The 14 dashboard pages

Each page below is fully interactive with mock data — not a static mockup:

- **Image Studio** — prompt, style/ratio/quality/count controls, generate → loading → gallery with reuse/copy/delete
- **Video Studio** — script input, style/duration, generate → live progress bar → Ready state with a play button
- **Compare** — pick 2–4 models, one prompt, side-by-side responses with timing and token counts
- **Connectors** — 8 integrations, search + category filters, connect/disconnect with live-region announcements
- **History** — filter by type, search, sort, inline rename, delete with confirmation
- **Store** — featured section, search/filter/sort, product detail dialogs
- **AI Tasks** — live stats, create-task modal, run a task through Pending → Running → Completed
- **AI Job Analysis** — paste a job description, get a match score, skills, gaps, and recommendations; `/error` demo included
- **AI SOP Builder** — guided form, generated SOP with Edit / Copy / Save / **real `.txt` export**
- **Support** — searchable FAQ by category, contact-support ticket modal with a success state
- **Newsletter** — validated email subscribe, recent issues
- **Subscriptions** — 4 billing plans, current-plan indicator, confirm-to-subscribe flow
- **AI Platform** — model catalog, search + provider filters, speed/intelligence meters
- **Discord** — community stats, categorized channels, recent activity, demo join dialogs

### Authentication demo

- Sign In / Sign Up in one modal, switchable via "Create account" / "Sign in"
- Real client-side validation: empty fields, invalid email format, password length, mismatched confirm-password
- Loading → success states for both the form and each of the three social login buttons (Google, Facebook, GitHub — real brand icons via `react-icons`)
- Header and sidebar both reflect signed-in state; one click signs back out

---

### Chrome extension concept (`/extension`)

- Compact 380px popup shell, shown inside a mock browser with an address bar and toolbar icon
- **Three tabs:** Chat, History, Settings
- **Page-context concept:** a mock article is "read" by the extension, and quick actions change to page-specific ones such as _Summarize this page_ and _Explain selected text_
- Model selection, theme toggle, and new chat in a compact header
- History with **search**
- Extension-specific settings

### Settings (`/app/settings`)

| Setting                                      | Effect                                                   |
| -------------------------------------------- | -------------------------------------------------------- |
| Theme (Light, Dark, System)                  | Switches the whole site                                  |
| Default model                                | Used when starting a new chat                            |
| Response style (Concise, Balanced, Detailed) | Changes the wording of mock replies                      |
| Compact messages                             | Tighter chat spacing                                     |
| Enter to send                                | When off, Ctrl/⌘ + Enter sends                           |
| Reduce animations                            | Minimizes motion app-wide, in addition to the OS setting |
| Reset preferences, Reset demo chats          | Restore defaults (chat reset uses a confirmation dialog) |

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

| Area                  | Technology                                                                  |
| --------------------- | --------------------------------------------------------------------------- |
| Framework             | [Next.js 16](https://nextjs.org/) (App Router)                              |
| Language              | TypeScript (strict)                                                         |
| UI library            | React 19                                                                    |
| Styling               | Tailwind CSS v4 (CSS-first config, design tokens as CSS variables)          |
| Components            | Custom components with `class-variance-authority`, `clsx`, `tailwind-merge` |
| Accessible primitives | Radix UI: Dialog, Dropdown Menu, Tabs, Slot                                 |
| Icons                 | Lucide React                                                                |
| Animation             | Motion (`motion/react`) using `LazyMotion` with `domAnimation`              |
| Theming               | `next-themes`                                                               |
| State                 | Zustand (chat state and persisted preferences)                              |
| Fonts                 | Geist via `next/font`                                                       |
| Hosting               | Vercel                                                                      |

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

| Script              | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the development server                       |
| `npm run build`     | Create a production build                          |
| `npm start`         | Serve the production build                         |
| `npm run lint`      | Run ESLint                                         |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run check`     | Lint, type check, and build in one step            |

### Environment variables

None are required. The project has no secrets and makes no network calls to third-party APIs.

---

## Project structure

```text
app/
├── (marketing)/              # Landing page
├── app/                      # Dashboard (shared layout via AppShell)
│   ├── layout.tsx
│   ├── page.tsx              # Chat
│   ├── settings/
│   ├── image-studio/  video-studio/  compare/  connectors/
│   ├── history/  store/  tasks/  job-analysis/  sop-builder/
│   ├── support/  newsletter/  subscriptions/  platform/  discord/
├── extension/                # Chrome extension concept
├── error.tsx  not-found.tsx
└── layout.tsx  globals.css

components/
├── chat/                     # Message list, composer, model selector, etc.
├── dashboard/                # AppShell, AppSidebar, AppHeader, PageHeader,
│                              # Card, Badge, StatCard, EmptyState, LoadingState,
│                              # DemoNoticeDialog, AuthModal, and one *-view.tsx
│                              # per dashboard page
├── extension/  landing/  settings/  shared/  ui/

data/                         # nav.ts + one file per feature page's mock data
hooks/                        # useChatStore, useSettingsStore, useAuthStore, etc.
lib/  providers/  types/
```

---

## Architecture decisions

- **One generic dashboard shell, not 17 bespoke headers.** `AppShell`/`AppSidebar`/`AppHeader` replaced the original chat-only sidebar and per-page headers, so adding a page never means duplicating navigation.
- **Nav config as the single source of truth.** `data/nav.ts` drives the sidebar, active-state highlighting, and page titles — a new page needs one nav entry and one route, not changes in three places.
- **Client components only where genuinely needed.** Every dashboard page with generate/filter/form interactivity is a client component; the shell's static chrome (Card, Badge, PageHeader) stays server-renderable.
- **One `DemoNoticeDialog` instead of five bespoke "coming soon" modals.** Any button that can't do something real gets this shared, honest component rather than being left dead or faked.
- **Auth is a separate, unpersisted Zustand store**, deliberately not layered into the chat or settings stores, since signing out shouldn't touch chat history or preferences.
- **`react-icons` was added specifically for brand marks** (Google/Facebook/GitHub) that Lucide intentionally doesn't include — every other icon in the project is still Lucide, so there's no icon-system duplication.

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

| Route        | Performance | Accessibility | Best Practices | SEO |
| ------------ | ----------- | ------------- | -------------- | --- |
| `/`          |             |               |                |     |
| `/app`       |             |               |                |     |
| `/extension` |             |               |                |     |

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

- Replies, analyses, and generated content are keyword- or template-based mocks, not real AI output
- The SOP Builder's Department/Tone/Step-count fields are collected but don't change the generated wording — only the title does
- Regenerating or editing a chat message in the extension doesn't reapply that message's original page-context; it falls back to generic phrasing
- Each generation flow (Image Studio, Video Studio, AI Tasks) supports one job in flight at a time by design, not a real concurrent queue
- No Markdown/code-block rendering beyond the lightweight bullet/paragraph renderer used in chat
- No automated test suite yet — testing has been manual, checklist-driven, and via Lighthouse
- The Chrome extension is a concept built inside this app, not a packaged, installable extension

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
