// NSC (Schergen) Type Definitionen

export type NSCArt = 'körperlich' | 'geistig' | 'mystisch'

export interface NSCAttribute {
  stärke: number
  geschick: number
  willenskraft: number
  logik: number
  mystik: number
}

export interface NSCArchetyp {
  id: string
  name: string
  beschreibung?: string
  waffen: string[]
  rüstung?: string
  spezialAusrüstung?: string[]
  verhaltensTemplate?: string
}

export interface NSC {
  // Basis
  art: NSCArt
  stufe: number
  name?: string
  archetyp?: NSCArchetyp
  
  // Attribute
  attribute: NSCAttribute
  
  // Berechnete Werte
  lp: number
  maxLp: number
  sp: number
  maxSp: number
  ap: number
  initiative: number
  
  // Kampfwerte
  angriff: string // z.B. "3W6+4"
  verteidigung: string // z.B. "3W6+4"
  schaden: string // z.B. "1W6+2"
  
  // Ausrüstung
  waffen: string[]
  rüstung?: string
  ausrüstung: string[]
  
  // Meta
  beschreibung?: string
  persönlichkeit?: string
  notizen?: string
  createdAt: Date
}

export interface NSCGruppe {
  name: string
  art: NSCArt
  stufe: number
  anzahl: number
  mitglieder: NSC[]
  gruppenbeschreibung?: string
}

// Konstanten
export const NSC_ARTEN: NSCArt[] = ['körperlich', 'geistig', 'mystisch']

export const NSC_ART_BESCHREIBUNG = {
  körperlich: 'Kämpfer, Wachen, Söldner - STR & GES +1',
  geistig: 'Gelehrte, Händler, Spione - LOG & WIL +1',
  mystisch: 'Magier, Priester, Hexer - MYS +1'
} as const

export const NSC_STUFEN = {
  min: 1,
  max: 10,
  apSchwelle: 7 // Ab Stufe 8 haben NSCs 7 AP statt 6
} as const

// Formel-Definitionen für Berechnungen
export interface NSCFormeln {
  lp: (stufe: number) => number
  sp: (stufe: number) => number
  initiative: (stufe: number) => number
  ap: (stufe: number) => number
  attributBonus: (stufe: number, istPrimär: boolean) => number
}

export const NSC_FORMELN: NSCFormeln = {
  lp: (stufe: number) => 10 + stufe,
  sp: (stufe: number) => 15 + (stufe * 3),
  initiative: (stufe: number) => 3 + stufe,
  ap: (stufe: number) => stufe <= NSC_STUFEN.apSchwelle ? 6 : 7,
  attributBonus: (stufe: number, istPrimär: boolean) => istPrimär ? stufe + 1 : stufe - 1
}