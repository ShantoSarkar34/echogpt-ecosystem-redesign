export const supportCategories = [
  "Getting Started",
  "Account & Billing",
  "AI Models",
  "Integrations",
  "Troubleshooting",
  "Security",
] as const;

export const faqItems: {
  category: (typeof supportCategories)[number];
  question: string;
  answer: string;
}[] = [
  {
    category: "Getting Started",
    question: "How do I create a new chat?",
    answer:
      'Click "New chat" in the sidebar, or open the sidebar drawer on mobile and tap the same button.',
  },
  {
    category: "AI Models",
    question: "How do I change AI models?",
    answer:
      "Use the model selector in the chat header to switch between Echo Swift, Balanced, and Deep.",
  },
  {
    category: "Getting Started",
    question: "How does EchoGPT store my conversations?",
    answer:
      "In this demo, conversations live only in your browser session and reset on refresh.",
  },
  {
    category: "Integrations",
    question: "How do I connect Google Drive?",
    answer:
      "Open Connectors from the sidebar and click Connect on the Google Drive card.",
  },
  {
    category: "Account & Billing",
    question: "How do I manage my subscription?",
    answer: "Open Subscriptions from the sidebar to view and change your plan.",
  },
  {
    category: "Troubleshooting",
    question: "Can I use EchoGPT on mobile?",
    answer:
      "Yes — the layout adapts to a mobile drawer and stacked cards on small screens.",
  },
];
