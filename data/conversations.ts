import type { Conversation } from "@/types/chat";

export const initialConversations: Conversation[] = [
  {
    id: "c1",
    title: "Landing page copy for a SaaS launch",
    group: "Today",
    modelId: "echo-balanced",
    messages: [
      {
        id: "c1-m1",
        role: "user",
        content: "Write a punchy hero headline for an AI productivity tool.",
      },
      {
        id: "c1-m2",
        role: "assistant",
        content:
          'Try: "Think faster. Ship sooner." It\'s short, benefit-led, and easy to pair with a one-line subhead.',
      },
    ],
  },
  {
    id: "c2",
    title: "Debounce vs throttle in React",
    group: "Today",
    modelId: "echo-swift",
    messages: [
      {
        id: "c2-m1",
        role: "user",
        content: "When should I use debounce instead of throttle?",
      },
      {
        id: "c2-m2",
        role: "assistant",
        content:
          "Use debounce when you only care about the final value (search-as-you-type). Use throttle when you want steady updates during continuous events (scroll, resize).",
      },
    ],
  },
  {
    id: "c3",
    title:
      "Summarize this quarterly report and list the key risks for the leadership team",
    group: "Yesterday",
    modelId: "echo-deep",
    messages: [
      {
        id: "c3-m1",
        role: "user",
        content: "Summarize the report and list the top risks.",
      },
      {
        id: "c3-m2",
        role: "assistant",
        content:
          "This is demo content. In a real deployment, the assistant would summarize your document here.",
      },
    ],
  },
  {
    id: "c4",
    title: "Weekly meal prep plan",
    group: "Yesterday",
    modelId: "echo-swift",
    messages: [
      {
        id: "c4-m1",
        role: "user",
        content: "Give me a simple 5-day meal prep plan.",
      },
      {
        id: "c4-m2",
        role: "assistant",
        content:
          "Batch-cook one grain, two proteins, and three vegetables on Sunday, then mix and match across the week.",
      },
    ],
  },
  {
    id: "c5",
    title: "Explain CSS container queries",
    group: "Previous 7 days",
    modelId: "echo-balanced",
    messages: [
      {
        id: "c5-m1",
        role: "user",
        content: "Explain container queries like I'm new to CSS.",
      },
      {
        id: "c5-m2",
        role: "assistant",
        content:
          "Media queries respond to the screen size. Container queries respond to the size of a parent element, so a component can adapt wherever it's placed.",
      },
    ],
  },
  {
    id: "c6",
    title: "Regex for validating phone numbers",
    group: "Previous 7 days",
    modelId: "echo-balanced",
    messages: [
      {
        id: "c6-m1",
        role: "user",
        content: "Give me a basic regex for phone number validation.",
      },
      {
        id: "c6-m2",
        role: "assistant",
        content:
          "Phone formats vary a lot by country, so start permissive (digits, spaces, +, -, parentheses) and validate the length separately.",
      },
    ],
  },
];
