import type { DiceTable } from './dice'

// Basis-Interfaces für Abenteuer
export interface AdventureProblem {
  id: string
  name: string
  category: 'direkt' | 'indirekt' | 'route' | 'unerklärlich' | 'ausbreitung' | 'wachstum'
  description: string
  examples: string[]
  severity: number // 1-3 für Belohnungsberechnung
}

export interface AdventureTrigger {
  id: string
  name: string
  type: 'wesen' | 'wandelholz' | 'fehler' | 'monster' | 'banditen' | 'artefakt'
  description: string
  details?: string[]
  dangerLevel: number // 1-3 für Belohnungsberechnung
}

export interface AdventureObstacle {
  id: string
  name: string
  description: string
  solutions: string[]
  complexity: number // 1-3 für Belohnungsberechnung
}

export interface AdventureLocation {
  name: string
  type: 'siedlung' | 'dorf' | 'außenposten' | 'wildnis'
  population?: number
  features?: string[]
}

export interface AdventureQuestGiver {
  name: string
  role: string
  motivation: string
  relationToProblem: string
  personality?: string
}

export interface AdventureComplication {
  id: string
  name: string
  type: 'zeitdruck' | 'moral' | 'agenda' | 'konkurrenz'
  description: string
  effect: string
}

export interface AdventureReward {
  baseTaler: number // 20-40 pro Charakter
  modifiers: {
    problem: number
    trigger: number
    obstacle: number
    complications?: number
  }
  totalPerCharacter: number
  additionalRewards?: string[]
  influencePoints?: number
}

// Komplettes Abenteuer
export interface AdventureQuest {
  // Würfelergebnisse
  problem: AdventureProblem
  trigger: AdventureTrigger
  obstacle: AdventureObstacle
  
  // Generierte Inhalte
  location: AdventureLocation
  questGiver?: AdventureQuestGiver
  complications?: AdventureComplication[]
  
  // Story
  story: {
    introduction: string
    mainBody: string
    resolution: string
    hooks?: string[]
  }
  
  // Belohnung
  reward: AdventureReward
  
  // Meta
  title?: string
  createdAt: Date
  storyTemplate?: string
}

// Generator State
export interface AdventureGeneratorState {
  problemResult?: { value: AdventureProblem; roll: number }
  triggerResult?: { value: AdventureTrigger; roll: number }
  obstacleResult?: { value: AdventureObstacle; roll: number }
  location?: AdventureLocation
  questGiver?: AdventureQuestGiver
  complications: AdventureComplication[]
  storyTemplate: 'direkt' | 'mysterium' | 'düster' | 'hoffnungsvoll'
  charactersCount: number
}

// Tabellen-Typen
export type AdventureProblemTable = DiceTable<AdventureProblem>
export type AdventureTriggerTable = DiceTable<AdventureTrigger>
export type AdventureObstacleTable = DiceTable<AdventureObstacle>

// Konstanten
export const PROBLEM_CATEGORIES = [
  'direkt',
  'indirekt',
  'route',
  'unerklärlich',
  'ausbreitung',
  'wachstum'
] as const

export const TRIGGER_TYPES = [
  'wesen',
  'wandelholz',
  'fehler',
  'monster',
  'banditen',
  'artefakt'
] as const

export const COMPLICATION_TYPES = [
  'zeitdruck',
  'moral',
  'agenda',
  'konkurrenz'
] as const

export const STORY_TEMPLATES = [
  'direkt',
  'mysterium',
  'düster',
  'hoffnungsvoll'
] as const

// Ortsnamen-Generierung
export interface LocationNameParts {
  prefixes: string[]
  suffixes: string[]
  features: string[]
}