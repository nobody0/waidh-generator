import type { DiceTable } from './dice'

// Basis-Interfaces für Kerker-Elementare
export interface KerkerTheme {
  id: string
  name: string
  description: string
  trapExamples: string[]
  atmosphere: string
  guardAppearance: string
}

export interface GuardLevel {
  id: string
  name: string
  minLevel: number
  maxLevel: number
}

export interface KerkerEnvironment {
  id: string
  name: string
  description: string
}

export interface ChamberProtection {
  id: string
  name: string
  guardCount: number
  guardLevel: 'low' | 'medium' | 'high'
  trapCount: number
  trapVisibility: 'hidden' | 'obvious'
}

export interface ChamberTreasure {
  id: string
  name: string
  value?: number // Für Taler
  description: string
  requiresLocation?: boolean // Für Handelswaren etc.
}

export interface Trap {
  id: string
  name: string
  theme: string
  trigger: string
  effect: string
  difficulty: number // Entdeckungs-Schwierigkeit
  resetTime?: string // z.B. "1 Stunde"
}

export interface Guard {
  id: string
  level: number
  type: string // z.B. "Wächter", "Elementar"
  hp: number
  sp: number
  initiative: number
  ap: number
}

export interface Chamber {
  id: string
  number: number // Position in der Reihenfolge
  protection: ChamberProtection
  treasure: ChamberTreasure
  guards: Guard[]
  traps: Trap[]
  notes?: string
  isCore?: boolean // Kernzauber-Kammer
}

export interface CoreSpellContent {
  id: string
  name: string
  description: string
  special?: string
}

// Kompletter Kerker-Elementar
export interface KerkerElementar {
  // Basis
  chamberCount: number
  theme: KerkerTheme
  guardLevels: GuardLevel
  environment: KerkerEnvironment
  
  // Kammern
  chambers: Chamber[]
  coreSpellContent?: CoreSpellContent
  
  // Meta
  name?: string
  description?: string
  regenerationTime: number // In Stunden
  createdAt: Date
}

// Generator State
export interface KerkerGeneratorState {
  currentPhase: 'structure' | 'details' | 'complete'
  chamberCount?: number
  theme?: KerkerTheme
  guardLevels?: GuardLevel
  environment?: KerkerEnvironment
  chambers: Chamber[]
  selectedChamber?: number
  coreSpellContent?: CoreSpellContent
}

// Tabellen-Typen
export type ChamberCountTable = DiceTable<number>
export type ThemeTable = DiceTable<KerkerTheme>
export type GuardLevelTable = DiceTable<GuardLevel>
export type EnvironmentTable = DiceTable<KerkerEnvironment>
export type ProtectionTable = DiceTable<ChamberProtection>
export type TreasureTable = DiceTable<ChamberTreasure>
export type CoreSpellTable = DiceTable<CoreSpellContent>

// Konstanten
export const KERKER_THEMES = [
  'pflanzen',
  'erde',
  'feuer',
  'wasser',
  'kristall',
  'wind'
] as const

export const GUARD_LEVEL_TYPES = ['low', 'medium', 'high'] as const

export const TRAP_DIFFICULTIES = {
  easy: 10,
  medium: 15,
  hard: 20,
  extreme: 25
} as const