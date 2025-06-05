import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Prompt } from "@/types/propmt";

interface PromptsState {
  prompts: Prompt[];
  addPrompt: (prompt: Omit<Prompt, "id">) => void;
  updatePrompt: (id: string, prompt: Partial<Omit<Prompt, "id">>) => void;
  removePrompt: (id: string) => void;
}

export const usePrompts = create<PromptsState>()(
  persist(
    (set) => ({
      prompts: [],
      addPrompt: (prompt) => set((state) => ({ 
        prompts: [...state.prompts, { ...prompt, id: crypto.randomUUID() }] 
      })),
      updatePrompt: (id, updates) => set((state) => ({
        prompts: state.prompts.map((prompt) => 
          prompt.id === id ? { ...prompt, ...updates } : prompt
        )
      })),
      removePrompt: (id) => set((state) => ({
        prompts: state.prompts.filter((prompt) => prompt.id !== id)
      })),
    }),
    {
      name: 'prompt-store',
    }
  )
)