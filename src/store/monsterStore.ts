import { create } from 'zustand'
import type { MonsterGeneratorState, Monster } from '@/types/monster'

interface MonsterStore {
  // Generator State
  generatorState: MonsterGeneratorState
  updateGeneratorState: (updates: Partial<MonsterGeneratorState>) => void
  resetGenerator: () => void
  
  // Gespeicherte Monster
  savedMonsters: Monster[]
  saveMonster: (monster: Monster) => void
  deleteMonster: (index: number) => void
  
  // Aktuelles Monster
  currentMonster: Monster | null
  setCurrentMonster: (monster: Monster | null) => void
}

const initialGeneratorState: MonsterGeneratorState = {
  currentStep: 0,
  abilities: [],
  properties: [],
  manualOverrides: {}
}

export const useMonsterStore = create<MonsterStore>((set) => ({
  // Generator State
  generatorState: initialGeneratorState,
  
  updateGeneratorState: (updates) => set((state) => ({
    generatorState: {
      ...state.generatorState,
      ...updates
    }
  })),
  
  resetGenerator: () => set({
    generatorState: initialGeneratorState
  }),
  
  // Gespeicherte Monster
  savedMonsters: [],
  
  saveMonster: (monster) => set((state) => ({
    savedMonsters: [...state.savedMonsters, monster]
  })),
  
  deleteMonster: (index) => set((state) => ({
    savedMonsters: state.savedMonsters.filter((_, i) => i !== index)
  })),
  
  // Aktuelles Monster
  currentMonster: null,
  
  setCurrentMonster: (monster) => set({
    currentMonster: monster
  })
}))