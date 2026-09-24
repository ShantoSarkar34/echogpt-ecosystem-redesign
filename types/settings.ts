import type { ModelId } from "@/types/chat";

export type ResponseStyle = "concise" | "balanced" | "detailed";
export type ThemeChoice = "light" | "dark" | "system";

export interface Preferences {
  defaultModelId: ModelId;
  responseStyle: ResponseStyle;
  compactMode: boolean;
  enterToSend: boolean;
  reduceMotion: boolean;
}
