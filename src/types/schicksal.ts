// Schicksals-Type Definitionen

export interface SchicksalResult {
  id: string
  name: string
  beschreibung: string
  detailBeschreibung: string
  effekt: string
  beispiele?: string[]
  kontext?: string
}

export interface SchicksalWurf {
  wurf: number
  ergebnis: SchicksalResult
  kontext?: string
  zeitstempel: Date
}

// Kontext-Optionen für Schicksalswürfe
export type SchicksalKontext = 
  | 'kampf'
  | 'erkundung'
  | 'sozial'
  | 'magie'
  | 'reise'
  | 'allgemein'

export const SCHICKSAL_KONTEXT_BESCHREIBUNG = {
  kampf: 'Während eines Kampfes',
  erkundung: 'Bei der Erkundung',
  sozial: 'In sozialen Situationen',
  magie: 'Bei magischen Ereignissen',
  reise: 'Auf Reisen',
  allgemein: 'Allgemeine Situation'
} as const

// Schicksals-Stufen
export const SCHICKSAL_STUFEN = {
  1: 'katastrophe',
  2: 'desaster', 
  3: 'krise',
  4: 'zufall',
  5: 'zwischenfall',
  6: 'gluecksstraehne'
} as const

export type SchicksalStufe = typeof SCHICKSAL_STUFEN[keyof typeof SCHICKSAL_STUFEN]