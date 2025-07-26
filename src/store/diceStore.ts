import { create } from 'zustand'

interface DiceRoll {
  id: string
  timestamp: Date
  dice: string
  results: number[]
  total: number
}

interface DiceStore {
  history: DiceRoll[]
  soundEnabled: boolean
  isRolling: boolean
  addRoll: (dice: string, results: number[], total: number) => void
  toggleSound: () => void
  setRolling: (rolling: boolean) => void
  clearHistory: () => void
}

export const useDiceStore = create<DiceStore>((set) => ({
  history: [],
  soundEnabled: false,
  isRolling: false,
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
        ...state.history.slice(0, 9),
      ],
    })),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setRolling: (rolling) => set({ isRolling: rolling }),
  clearHistory: () => set({ history: [] }),
}))