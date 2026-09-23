import { create } from "zustand";
import { initialConversations } from "@/data/conversations";
import { DEFAULT_MODEL_ID } from "@/data/models";
import type { Conversation, ModelId } from "@/types/chat";

interface ChatState {
  conversations: Conversation[];
  /** null = draft "new chat" (nothing created until the first message) */
  activeId: string | null;
  modelId: ModelId;
  mobileNavOpen: boolean;
  selectConversation: (id: string) => void;
  startNewChat: () => void;
  setModel: (id: ModelId) => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  conversations: initialConversations,
  activeId: null,
  modelId: DEFAULT_MODEL_ID,
  mobileNavOpen: false,

  selectConversation: (id) => {
    const conversation = get().conversations.find((c) => c.id === id);
    if (!conversation) return;
    set({ activeId: id, modelId: conversation.modelId, mobileNavOpen: false });
  },

  startNewChat: () => set({ activeId: null, mobileNavOpen: false }),

  setModel: (id) =>
    set((state) => ({
      modelId: id,
      conversations: state.conversations.map((c) =>
        c.id === state.activeId ? { ...c, modelId: id } : c,
      ),
    })),

  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
}));
