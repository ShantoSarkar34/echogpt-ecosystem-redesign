export interface Plan {
  id: string;
  name: string;
  billing: "Monthly" | "Quarterly" | "Half-Yearly" | "Annual";
  price: string;
  perLabel: string;
  models: string;
  credits: string;
  features: string[];
  current?: boolean;
  highlight?: boolean;
}

export const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    billing: "Monthly",
    price: "$15",
    perLabel: "/month",
    models: "All Echo models",
    credits: "500 credits/mo",
    features: [
      "Unlimited chats",
      "Priority response speed",
      "Access to Image & Video Studio",
    ],
    current: true,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    billing: "Quarterly",
    price: "$40",
    perLabel: "/3 months",
    models: "All Echo models",
    credits: "1,800 credits",
    features: [
      "Everything in Monthly",
      "11% savings",
      "Early access to new features",
    ],
  },
  {
    id: "half-yearly",
    name: "Half-Yearly",
    billing: "Half-Yearly",
    price: "$72",
    perLabel: "/6 months",
    models: "All Echo models + GPT-5.6",
    credits: "4,000 credits",
    features: [
      "Everything in Quarterly",
      "20% savings",
      "Compare across 6 models",
    ],
    highlight: true,
  },
  {
    id: "annual",
    name: "Annual",
    billing: "Annual",
    price: "$120",
    perLabel: "/year",
    models: "All Echo models + GPT-5.6",
    credits: "9,000 credits",
    features: ["Everything in Half-Yearly", "33% savings", "Dedicated support"],
  },
];
