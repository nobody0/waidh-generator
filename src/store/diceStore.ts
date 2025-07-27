import { create } from 'zustand'

interface DiceRoll {
  id: string
  timestamp: Date
  dice: string
  results: number[]
  total: number
}

interface DiceStore {
  // Keep history for components that might use it
  history: DiceRoll[]
  addRoll: (dice: string, results: number[], total: number) => void
  clearHistory: () => void
}

export const useDiceStore = create<DiceStore>((set) => ({
  history: [],
  addRoll: (dice, results, total) =>
    set((state) => ({
      history: [
        {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          dice,
          results,
          total,
        },
        ...state.history.slice(0, 19), // Keep last 20 rolls
      ],
    })),
  clearHistory: () => set({ history: [] }),
}))