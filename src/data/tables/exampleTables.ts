import type { DiceTable } from '@/types/dice'

// Beispiel-Interfaces für verschiedene Tabellen-Typen
// Diese sollten von den jeweiligen Generatoren definiert werden

export interface ExampleMonsterAge {
  name: string
  baseValue: number
  // weitere eigenschaften...
}

export interface ExampleAttribute {
  type: string
  modifier: number
  // weitere eigenschaften...
}

// Beispiel-Tabellen ohne konkreten Inhalt
// Zeigt nur die Struktur für die Integration

export const exampleSimpleTable: DiceTable<string> = {
  id: 'example-simple',
  name: 'Beispiel Einfache Tabelle',
  diceType: '1d6',
  entries: [
    { range: 1, value: 'Wert 1', description: 'Beschreibung 1' },
    { range: 2, value: 'Wert 2', description: 'Beschreibung 2' },
    { range: 3, value: 'Wert 3', description: 'Beschreibung 3' },
    { range: 4, value: 'Wert 4', description: 'Beschreibung 4' },
    { range: 5, value: 'Wert 5', description: 'Beschreibung 5' },
    { range: 6, value: 'Wert 6', description: 'Beschreibung 6' }
  ]
}

export const exampleRangeTable: DiceTable<number> = {
  id: 'example-range',
  name: 'Beispiel Bereichs-Tabelle',
  diceType: '2d6',
  entries: [
    { range: 2, value: 10 },
    { range: [3, 4], value: 20 },
    { range: [5, 6], value: 30 },
    { range: [7, 8], value: 40 },
    { range: [9, 10], value: 50 },
    { range: [11, 12], value: 60 }
  ]
}

export const exampleComplexTable: DiceTable<ExampleMonsterAge> = {
  id: 'example-complex',
  name: 'Beispiel Komplexe Tabelle',
  diceType: '1d6',
  allowReroll: true,
  entries: [
    {
      range: 1,
      value: {
        name: 'Beispiel 1',
        baseValue: 10
      },
      description: 'Erste Option'
    },
    {
      range: [2, 5],
      value: {
        name: 'Beispiel 2-5',
        baseValue: 20
      },
      description: 'Mittlere Optionen'
    },
    {
      range: 6,
      value: {
        name: 'Beispiel 6',
        baseValue: 30
      },
      description: 'Letzte Option',
      subRolls: [
        { diceType: '1d6' },
        { diceType: '1d6' }
      ]
    }
  ]
}