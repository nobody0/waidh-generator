import type { DiceTable } from '@/types/dice'
import type { VergiftungEffekt } from '@/types/vergiftung'

// Vergiftungs-Tabelle (3W6)
export const vergiftungTable: DiceTable<VergiftungEffekt> = {
  id: 'vergiftung',
  name: 'Vergiftungs-Effekte',
  diceType: '3d6',
  entries: [
    {
      range: 3,
      value: {
        id: 'schockreaktion',
        name: 'Schockreaktion',
        beschreibung: 'Der Charakter wird bewusstlos für 1-2 Züge',
        dauer: '1-2 Züge (würfle 1W2)',
        spezialEffekte: ['Bewusstlos', 'Keine Aktionen möglich']
      }
    },
    {
      range: 4,
      value: {
        id: 'kontrollverlust',
        name: 'Kontrollverlust',
        beschreibung: 'Der Charakter erhält alle 3 Stress-Arten gleichzeitig',
        dauer: 'Bis Ende nächster Zug',
        spezialEffekte: ['Körperlich gestresst', 'Geistig gestresst', 'Mystisch gestresst']
      }
    },
    {
      range: 5,
      value: {
        id: 'panikgefuehl',
        name: 'Panikgefühl',
        beschreibung: 'Der Charakter erhält alle 3 Stress-Arten gleichzeitig',
        dauer: 'Bis Ende nächster Zug',
        spezialEffekte: ['Körperlich gestresst', 'Geistig gestresst', 'Mystisch gestresst', 'Feigling: Muss fliehen']
      }
    },
    {
      range: 6,
      value: {
        id: 'sinnesschwaeche',
        name: 'Sinnesschwäche',
        beschreibung: 'Malus -1 auf alle Proben',
        dauer: 'Bis Ende nächster Zug'
      }
    },
    {
      range: 7,
      value: {
        id: 'stechender-schmerz',
        name: 'Stechender Schmerz',
        beschreibung: 'Körperlich und geistig gestresst',
        dauer: 'Bis Ende nächster Zug',
        spezialEffekte: ['Körperlich gestresst', 'Geistig gestresst']
      }
    },
    {
      range: 8,
      value: {
        id: 'schmerz',
        name: 'Schmerz',
        beschreibung: 'Körperlich gestresst (WIL-Probe um zu widerstehen)',
        dauer: 'Bis Ende nächster Zug oder erfolgreiche WIL-Probe',
        spezialEffekte: ['Körperlich gestresst']
      }
    },
    {
      range: 9,
      value: {
        id: 'prickeln',
        name: 'Prickeln',
        beschreibung: 'Malus -2 auf WIL und LOG Proben',
        dauer: 'Bis Ende nächster Zug'
      }
    },
    {
      range: 10,
      value: {
        id: 'jucken',
        name: 'Jucken',
        beschreibung: 'Malus -1 auf alle Proben',
        dauer: 'Bis Ende nächster Zug'
      }
    },
    {
      range: 11,
      value: {
        id: 'starker-husten',
        name: 'Starker Husten',
        beschreibung: 'Verliert 3 AP oder erhält -4 auf nächste Probe',
        dauer: 'Sofort',
        spezialEffekte: ['Wahl: -3 AP oder -4 auf nächste Probe']
      }
    },
    {
      range: 12,
      value: {
        id: 'hustenanfall',
        name: 'Hustenanfall',
        beschreibung: 'Malus -2 auf alle Proben, 4 AP um zu beenden',
        dauer: 'Bis 4 AP ausgegeben oder Kampfende',
        spezialEffekte: ['-2 auf alle Proben']
      }
    },
    {
      range: 13,
      value: {
        id: 'angstgefuehl',
        name: 'Angstgefühl',
        beschreibung: 'Geistig gestresst (WIL-Probe um zu widerstehen)',
        dauer: 'Bis Ende nächster Zug oder erfolgreiche WIL-Probe',
        spezialEffekte: ['Geistig gestresst', 'Feigling: Muss 1 Runde fliehen']
      }
    },
    {
      range: 14,
      value: {
        id: 'blutung',
        name: 'Blutung',
        beschreibung: 'Der Charakter verliert zu Beginn seines nächsten Zuges 1 Lebenspunkt',
        dauer: 'Zu Beginn des nächsten Zuges',
        spezialEffekte: ['-1 LP (nicht verhinderbar)']
      }
    },
    {
      range: 15,
      value: {
        id: 'taube-gliedmassen',
        name: 'Taube Gliedmaßen',
        beschreibung: 'Malus -1 auf STR und GES, -25% Bewegung',
        dauer: 'Bis Ende nächster Zug',
        spezialEffekte: ['-1 STR', '-1 GES', '-25% Bewegung']
      }
    },
    {
      range: 16,
      value: {
        id: 'starke-uebelkeit',
        name: 'Starke Übelkeit',
        beschreibung: 'Verliert 1 AP und ist körperlich gestresst',
        dauer: 'Sofort',
        spezialEffekte: ['-1 AP', 'Körperlich gestresst']
      }
    },
    {
      range: 17,
      value: {
        id: 'uebelkeit',
        name: 'Übelkeit',
        beschreibung: 'WIL-Probe oder wie Starke Übelkeit',
        dauer: 'Sofort oder bis Ende nächster Zug',
        spezialEffekte: ['WIL-Probe oder: -1 AP + Körperlich gestresst']
      }
    },
    {
      range: 18,
      value: {
        id: 'immunreaktion',
        name: 'Immunreaktion',
        beschreibung: 'Keine negativen Effekte - der Körper wehrt das Gift ab',
        dauer: 'Keine',
        spezialEffekte: ['Keine negativen Effekte']
      }
    }
  ]
}

// Spezialregeln-Effekte
export const kränklichEffekte = {
  beschreibung: 'Bei der Eigenschaft "Kränklich" würfle 2× auf der Vergiftungstabelle. Beide Effekte gelten gleichzeitig.',
  hinweis: 'Die Effekte können sich stapeln oder ergänzen.'
}

export const feiglingEffekte = {
  '5': 'Muss mindestens eine Runde lang fliehen',
  '13': 'Muss mindestens eine Runde lang fliehen',
  beschreibung: 'Bei der Eigenschaft "Feigling" haben Angst-basierte Effekte zusätzliche Flucht-Komponenten.'
}

// Stress-Effekt Beschreibungen
export const stressEffekte = {
  körperlich: {
    beschreibung: 'Körperlich gestresst',
    effekt: '-2 auf STR und GES basierte Proben'
  },
  geistig: {
    beschreibung: 'Geistig gestresst',
    effekt: '-2 auf LOG und WIL basierte Proben'
  },
  mystisch: {
    beschreibung: 'Mystisch gestresst',
    effekt: '-2 auf MYS basierte Proben'
  }
}

// Wichtige Regeln
export const vergiftungRegeln = {
  allgemein: [
    'Effekt-Dauer ist meist "bis Ende nächster Zug"',
    'Schaden und Verluste werden nicht automatisch geheilt',
    'AP-Verluste reduzieren die verfügbaren Aktionspunkte sofort',
    'LP-Verluste können nicht verhindert werden (außer durch spezielle Fähigkeiten)'
  ],
  stress: [
    'Jede Stress-Art gibt -2 auf die zugehörigen Attribute',
    'Stress-Arten können sich stapeln',
    'Stress endet normalerweise am Ende des nächsten Zuges'
  ],
  spezial: [
    'Kränklich: 2× würfeln, beide Effekte gelten',
    'Feigling: Zusätzliche Flucht-Effekte bei Angst',
    'Monster-Gift: Verursacht diese Tabelle bei LP-Schaden'
  ]
}