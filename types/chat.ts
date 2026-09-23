export type ModelId = "echo-swift" | "echo-balanced" | "echo-deep";
export type MessageRole = "user" | "assistant";
export type ConversationGroup = "Today" | "Yesterday" | "Previous 7 days";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  group: ConversationGroup;
  modelId: ModelId;
  messages: Message[];
}

export interface AIModel {
  id: ModelId;
  name: string;
  tagline: string;
  badge: string;
}
