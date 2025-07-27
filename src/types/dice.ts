export type DiceType = '1d6' | '2d6' | '3d6' | 'custom'

export interface MultiDiceResult {
  dice: number[]
  total: number
}

export interface DiceRoll {
  diceType: DiceType
  customFormula?: string
  modifier?: number
}

export interface DiceTableEntry<T> {
  range: number | [number, number]
  value: T
  description?: string
  subRolls?: DiceRoll[]
}

export interface DiceTable<T> {
  id: string
  name: string
  diceType: DiceType
  entries: DiceTableEntry<T>[]
  allowReroll?: boolean
  uniqueOnly?: boolean
  customFormula?: string
}

export interface DiceRollResult<T> {
  table: DiceTable<T>
  roll: number
  entry: DiceTableEntry<T>
  value: T
  subResults?: DiceRollResult<any>[]
}

export interface TableProbability<T> {
  value: T
  probability: number
  description?: string
}