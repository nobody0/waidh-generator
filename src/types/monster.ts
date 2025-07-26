import type { DiceTable } from './dice'

// Basis-Interfaces für Monster
export interface MonsterAge {
  id: string
  name: string
  baseLP: number
  baseSP: number
  baseAP: number
  baseAttributes: number
  spMultiplier: number
  xValue: number
  yValue: number
}

export interface MonsterAttribute {
  type: 'stärke' | 'geschick' | 'willenskraft' | 'logik' | 'mystik'
  value: number
  isStrength?: boolean
  isWeakness?: boolean
}

export interface MonsterAbility {
  id: string
  name: string
  attribute: MonsterAttribute['type']
  description: string
  effect?: string
  cost?: number
}

export interface MonsterProperty {
  id: string
  name: string
  effect: string
  penalty?: string
}

export interface MonsterSpecialAction {
  name: string
  attribute: MonsterAttribute['type']
  cost: number
  effect: string
  exhaustion: boolean
}

// Komplettes Monster
export interface Monster {
  // Basis
  age: MonsterAge
  attributes: {
    stärke: number
    geschick: number
    willenskraft: number
    logik: number
    mystik: number
  }
  
  // Berechnete Werte
  lp: number
  maxLp: number
  sp: number
  maxSp: number
  ap: number
  initiative: number
  attack: string // z.B. "3W6+4"
  defense: string // z.B. "3W6+4"
  
  // Fähigkeiten & Eigenschaften
  abilities: MonsterAbility[]
  properties: MonsterProperty[]
  specialAction: MonsterSpecialAction
  
  // Meta
  name?: string
  description?: string
  createdAt: Date
}

// Generator State
export interface MonsterGeneratorState {
  currentStep: number
  age?: MonsterAge
  strengthAttribute?: MonsterAttribute['type']
  weaknessAttribute?: MonsterAttribute['type']
  strengthRoll?: number
  weaknessRoll?: number
  abilities: MonsterAbility[]
  properties: MonsterProperty[]
  manualOverrides: {
    age?: number
    strength?: number
    weakness?: number
    abilities?: Record<string, number>
    properties?: number[]
  }
}

// Tabellen-Typen
export type MonsterAgeTable = DiceTable<MonsterAge>
export type AttributeTable = DiceTable<MonsterAttribute['type']>
export type AbilityTable = DiceTable<MonsterAbility>
export type PropertyTable = DiceTable<MonsterProperty>

// Konstanten
export const MONSTER_ATTRIBUTES = [
  'stärke',
  'geschick', 
  'willenskraft',
  'logik',
  'mystik'
] as const

export const ATTRIBUTE_SHORT = {
  stärke: 'STR',
  geschick: 'GES',
  willenskraft: 'WIL',
  logik: 'LOG',
  mystik: 'MYS'
} as const