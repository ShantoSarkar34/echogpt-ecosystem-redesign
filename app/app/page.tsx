import type { Metadata } from "next";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatView } from "@/components/chat/chat-view";

export const metadata: Metadata = { title: "Chat" };

export default function AppPage() {
  return (
    <>
      <ChatHeader />
      <ChatView />
    </>
  );
}
