import { create } from "zustand";
import { initialConversations } from "@/data/conversations";
import { DEFAULT_MODEL_ID } from "@/data/models";
import { generateMockReply, REPLY_DELAY_MS } from "@/lib/mock-responses";
import type { Conversation, Message, ModelId } from "@/types/chat";
import { useSettingsStore } from "@/hooks/use-settings-store";

export type PendingStatus = "loading" | "error";

interface ChatState {
  conversations: Conversation[];
  activeId: string | null;
  modelId: ModelId;
  mobileNavOpen: boolean;
  pending: Record<string, PendingStatus>;
  selectConversation: (id: string) => void;
  startNewChat: () => void;
  setModel: (id: ModelId) => void;
  setMobileNavOpen: (open: boolean) => void;
  sendMessage: (text: string) => void;
  retry: () => void;
  resetChats: () => void;
  regenerate: () => void;
  editAndResend: (messageId: string, newText: string) => void;
}

function makeTitle(text: string): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length > 48 ? `${oneLine.slice(0, 48).trimEnd()}…` : oneLine;
}

export const useChatStore = create<ChatState>()((set, get) => {
  function scheduleReply(
    conversationId: string,
    prompt: string,
    allowFail: boolean,
  ) {
    const conversation = get().conversations.find(
      (c) => c.id === conversationId,
    );
    if (!conversation) return;

    set((s) => ({ pending: { ...s.pending, [conversationId]: "loading" } }));

    window.setTimeout(() => {
      const shouldFail = allowFail && prompt.toLowerCase().includes("/error");

      set((s) => {
        const pending = { ...s.pending };

        if (shouldFail) {
          pending[conversationId] = "error";
          return { pending };
        }

        delete pending[conversationId];
        const current = s.conversations.find((c) => c.id === conversationId);
        if (!current) return { pending };

        const reply: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: generateMockReply(
            prompt,
            current.modelId,
            useSettingsStore.getState().responseStyle,
          ),
        };

        return {
          pending,
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, messages: [...c.messages, reply] }
              : c,
          ),
        };
      });
    }, REPLY_DELAY_MS[conversation.modelId]);
  }

  return {
    conversations: initialConversations,
    activeId: null,
    modelId: DEFAULT_MODEL_ID,
    mobileNavOpen: false,
    pending: {},

    selectConversation: (id) => {
      const conversation = get().conversations.find((c) => c.id === id);
      if (!conversation) return;
      set({
        activeId: id,
        modelId: conversation.modelId,
        mobileNavOpen: false,
      });
    },

    startNewChat: () =>
      set({
        activeId: null,
        mobileNavOpen: false,
        modelId: useSettingsStore.getState().defaultModelId,
      }),

    setModel: (id) =>
      set((state) => ({
        modelId: id,
        conversations: state.conversations.map((c) =>
          c.id === state.activeId ? { ...c, modelId: id } : c,
        ),
      })),

    setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

    resetChats: () =>
      set({
        conversations: initialConversations,
        activeId: null,
        pending: {},
        modelId: useSettingsStore.getState().defaultModelId,
      }),

    sendMessage: (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const { activeId, modelId, pending } = get();
      if (activeId && pending[activeId] === "loading") return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      };
      let conversationId: string;

      if (activeId === null) {
        conversationId = crypto.randomUUID();
        const created: Conversation = {
          id: conversationId,
          title: makeTitle(trimmed),
          group: "Today",
          modelId,
          messages: [userMessage],
        };
        set((s) => ({
          conversations: [created, ...s.conversations],
          activeId: created.id,
        }));
      } else {
        conversationId = activeId;
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === activeId
              ? { ...c, messages: [...c.messages, userMessage] }
              : c,
          ),
        }));
      }

      scheduleReply(conversationId, trimmed, true);
    },

    retry: () => {
      const { activeId, conversations, pending } = get();
      if (!activeId || pending[activeId] !== "error") return;

      const conversation = conversations.find((c) => c.id === activeId);
      const lastUser = conversation?.messages.findLast(
        (m) => m.role === "user",
      );
      if (!lastUser) return;

      scheduleReply(activeId, lastUser.content, false);
    },

    regenerate: () => {
      const { activeId, conversations, pending } = get();
      if (!activeId || pending[activeId]) return;

      const conversation = conversations.find((c) => c.id === activeId);
      const lastUser = conversation?.messages.findLast(
        (m) => m.role === "user",
      );
      if (!lastUser || !conversation) return;

      // Drop the last assistant reply, then generate a fresh one for the same prompt.
      const lastAssistantIndex = conversation.messages.findLastIndex(
        (m) => m.role === "assistant",
      );
      set((s) => ({
        conversations: s.conversations.map((c) =>
          c.id === activeId && lastAssistantIndex !== -1
            ? { ...c, messages: c.messages.slice(0, lastAssistantIndex) }
            : c,
        ),
      }));

      scheduleReply(activeId, lastUser.content, false);
    },

    editAndResend: (messageId, newText) => {
      const { activeId, conversations, pending } = get();
      if (!activeId || pending[activeId]) return;
      const trimmed = newText.trim();
      if (!trimmed) return;

      const conversation = conversations.find((c) => c.id === activeId);
      const index = conversation?.messages.findIndex((m) => m.id === messageId);
      if (!conversation || index === undefined || index === -1) return;

      // Truncate everything from the edited message onward, then resend.
      set((s) => ({
        conversations: s.conversations.map((c) =>
          c.id === activeId
            ? {
                ...c,
                messages: [
                  ...c.messages.slice(0, index),
                  { id: messageId, role: "user", content: trimmed },
                ],
              }
            : c,
        ),
      }));

      scheduleReply(activeId, trimmed, true);
    },
  };
});
