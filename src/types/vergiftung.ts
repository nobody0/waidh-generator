// Vergiftungs-Type Definitionen

export interface VergiftungEffekt {
  id: string
  name: string
  beschreibung: string
  dauer: string
  spezialEffekte?: string[]
}

export interface VergiftungWurf {
  würfel: number[]
  summe: number
  effekt: VergiftungEffekt
  spezialRegeln: SpezialRegel[]
  zeitstempel: Date
}

export type SpezialRegel = 'kränklich' | 'feigling' | 'keine'

export const SPEZIAL_REGEL_BESCHREIBUNG = {
  kränklich: 'Würfle 2×, beide Effekte gelten',
  feigling: 'Zusätzliche Effekte bei Angst-Resultaten',
  keine: 'Keine Spezialregeln'
} as const

// Stress-Arten
export type StressArt = 'körperlich' | 'geistig' | 'mystisch'

export interface StressEffekt {
  arten: StressArt[]
  beschreibung: string
}