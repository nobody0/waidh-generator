import type {
  ChamberCountTable,
  ThemeTable,
  GuardLevelTable,
  EnvironmentTable,
  ProtectionTable,
  TreasureTable,
  CoreSpellTable,
  KerkerTheme,
  Trap
} from '@/types/kerker'

// Anzahl Kammern (1W6)
export const chamberCountTable: ChamberCountTable = {
  id: 'chamber-count',
  name: 'Anzahl Kammern',
  diceType: '1d6',
  entries: [
    { range: 1, value: 2, description: '2 Kammern' },
    { range: 2, value: 3, description: '3 Kammern' },
    { range: 3, value: 4, description: '4 Kammern' },
    { range: 4, value: 5, description: '5 Kammern' },
    { range: 5, value: 6, description: '6 Kammern' },
    { range: 6, value: 7, description: '7 Kammern' }
  ]
}

// Thema (1W6)
export const themeTable: ThemeTable = {
  id: 'kerker-theme',
  name: 'Kerker-Thema',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'pflanzen',
        name: 'Pflanzen',
        description: 'Ein Kerker voller Ranken, Dornen und giftiger Sporen',
        trapExamples: [
          'Dornenranken die sich um Eindringlinge schlingen',
          'Giftsporen die bei Berührung freigesetzt werden',
          'Schlingende Wurzeln aus dem Boden',
          'Säurespuckende Pflanzen'
        ],
        atmosphere: 'Feuchte Luft, erdiger Geruch, überall Ranken und Moos',
        guardAppearance: 'Mit Rinde bedeckt, Blätter als Haare, grüne Augen'
      }
    },
    {
      range: 2,
      value: {
        id: 'erde',
        name: 'Erde und Gestein',
        description: 'Massive Steinwände, Erdbeben und fallende Felsen',
        trapExamples: [
          'Fallende Felsbrocken von der Decke',
          'Einstürzende Bodensegmente',
          'Steinspitzen die aus Wänden schießen',
          'Erdrutsche die Gänge blockieren'
        ],
        atmosphere: 'Staubige Luft, Echo hallender Schritte, massive Steinformationen',
        guardAppearance: 'Aus Stein gemeißelt, Kristalle in der Haut, leuchtende Gesteinsaugen'
      }
    },
    {
      range: 3,
      value: {
        id: 'feuer',
        name: 'Feuer',
        description: 'Glühende Hitze, Lavaströme und brennende Fallen',
        trapExamples: [
          'Feuerstöße aus versteckten Öffnungen',
          'Lavagruben im Boden',
          'Brennende Gitterwände',
          'Explodierende Feuerbälle'
        ],
        atmosphere: 'Drückende Hitze, flimmernde Luft, rotes Glühen überall',
        guardAppearance: 'Flammende Haare, glühende Haut, Funken sprühende Augen'
      }
    },
    {
      range: 4,
      value: {
        id: 'wasser',
        name: 'Wasser oder Eis',
        description: 'Überflutete Kammern, Eiswände und gefrorene Fallen',
        trapExamples: [
          'Plötzliche Flutwellen',
          'Gefrierender Nebel',
          'Eiszapfen die von der Decke fallen',
          'Rutschige Eisböden'
        ],
        atmosphere: 'Tropfendes Wasser, eisige Kälte oder feuchte Schwüle',
        guardAppearance: 'Schuppige Haut, Kiemen, eisige oder wässrige Aura'
      }
    },
    {
      range: 5,
      value: {
        id: 'kristall',
        name: 'Kristall und pures Mana',
        description: 'Schimmernde Kristalle, Manawirbel und magische Anomalien',
        trapExamples: [
          'Manablitze zwischen Kristallen',
          'Verwirrende Spiegelungen',
          'Manaentzug-Felder',
          'Teleportationsfallen'
        ],
        atmosphere: 'Summende Energie, prismatisches Licht, knisternde Magie',
        guardAppearance: 'Kristalline Körper, leuchtende Adern, prismatische Augen'
      }
    },
    {
      range: 6,
      value: {
        id: 'wind',
        name: 'Windkanäle und/oder Sand',
        description: 'Heulende Stürme, Sandstürme und Luftdruckfallen',
        trapExamples: [
          'Windstöße die in Gruben drücken',
          'Erstickende Sandwolken',
          'Schneidende Windklingen',
          'Wirbelnde Sandtrichter'
        ],
        atmosphere: 'Pfeifender Wind, wirbelnder Sand, schwankender Luftdruck',
        guardAppearance: 'Wirbelnde Gestalt, Sandkörper, sturmumtoste Erscheinung'
      }
    }
  ]
}

// Wächter-Stufen (1W6)
export const guardLevelTable: GuardLevelTable = {
  id: 'guard-levels',
  name: 'Wächter-Stufen',
  diceType: '1d6',
  entries: [
    { range: 1, value: { id: '1-4', name: 'Stufe 1-4', minLevel: 1, maxLevel: 4 } },
    { range: 2, value: { id: '2-5', name: 'Stufe 2-5', minLevel: 2, maxLevel: 5 } },
    { range: 3, value: { id: '3-6', name: 'Stufe 3-6', minLevel: 3, maxLevel: 6 } },
    { range: 4, value: { id: '4-7', name: 'Stufe 4-7', minLevel: 4, maxLevel: 7 } },
    { range: 5, value: { id: '5-8', name: 'Stufe 5-8', minLevel: 5, maxLevel: 8 } },
    { range: 6, value: { id: '6-9', name: 'Stufe 6-9', minLevel: 6, maxLevel: 9 } }
  ]
}

// Umgebung (1W6)
export const environmentTable: EnvironmentTable = {
  id: 'environment',
  name: 'Umgebung',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'siedlung',
        name: 'Eine Siedlung',
        description: 'Der Kerker befindet sich nahe einer größeren Siedlung'
      }
    },
    {
      range: 2,
      value: {
        id: 'dorf',
        name: 'Ein Dorf',
        description: 'Ein kleines Dorf in der Nähe des Kerkers'
      }
    },
    {
      range: 3,
      value: {
        id: 'monster',
        name: 'Ein Monster',
        description: 'Ein gefährliches Monster haust in der Umgebung'
      }
    },
    {
      range: 4,
      value: {
        id: 'wesen',
        name: 'Ein anderes nicht-spielbares Wesen',
        description: 'Mysteriöse Kreaturen bewohnen die Gegend'
      }
    },
    {
      range: 5,
      value: {
        id: 'banditen',
        name: 'Ein Banditenlager',
        description: 'Banditen haben sich in der Nähe niedergelassen'
      }
    },
    {
      range: 6,
      value: {
        id: 'zauberwald',
        name: 'Ein Zauberwald',
        description: 'Der Kerker liegt im Herzen eines magischen Waldes'
      }
    }
  ]
}

// Kammer-Schutz (1W6)
export const protectionTable: ProtectionTable = {
  id: 'chamber-protection',
  name: 'Kammer-Schutz',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'few-high',
        name: 'Wenige starke Wächter',
        guardCount: 0, // Wird mit 1W6-3 (min 0) berechnet
        guardLevel: 'high',
        trapCount: 0,
        trapVisibility: 'hidden'
      },
      description: '(1W6-3, min 0) Wächter hoher Stufe',
      subRolls: [{ diceType: '1d6', modifier: -3 }]
    },
    {
      range: 2,
      value: {
        id: 'low-hidden-trap',
        name: 'Schwache Wächter + versteckte Falle',
        guardCount: 1, // Wird mit 1W6-2 (min 1) berechnet
        guardLevel: 'low',
        trapCount: 1,
        trapVisibility: 'hidden'
      },
      description: '(1W6-2, min 1) Wächter niedriger Stufe + 1 versteckte Falle',
      subRolls: [{ diceType: '1d6', modifier: -2 }]
    },
    {
      range: 3,
      value: {
        id: 'low-obvious-traps',
        name: 'Schwache Wächter + offensichtliche Fallen',
        guardCount: 1, // Wird mit 1W6-3 (min 1) berechnet
        guardLevel: 'low',
        trapCount: 2,
        trapVisibility: 'obvious'
      },
      description: '(1W6-3, min 1) Wächter niedriger Stufe + 2 offensichtliche Fallen',
      subRolls: [{ diceType: '1d6', modifier: -3 }]
    },
    {
      range: 4,
      value: {
        id: 'many-low',
        name: 'Viele schwache Wächter',
        guardCount: 2, // Wird mit 1W6+1 (min 2) berechnet
        guardLevel: 'low',
        trapCount: 0,
        trapVisibility: 'hidden'
      },
      description: '(1W6+1, min 2) Wächter niedriger Stufe',
      subRolls: [{ diceType: '1d6', modifier: 1 }]
    },
    {
      range: 5,
      value: {
        id: 'few-medium',
        name: 'Mittlere Wächter',
        guardCount: 1, // Wird mit 1W6-3 (min 1) berechnet
        guardLevel: 'medium',
        trapCount: 0,
        trapVisibility: 'hidden'
      },
      description: '(1W6-3, min 1) Wächter mittlerer Stufe',
      subRolls: [{ diceType: '1d6', modifier: -3 }]
    },
    {
      range: 6,
      value: {
        id: 'boss',
        name: 'Boss-Wächter',
        guardCount: 1, // Wird mit 1W2 berechnet
        guardLevel: 'high',
        trapCount: 0,
        trapVisibility: 'hidden'
      },
      description: '(1W2) Wächter hoher Stufe',
      subRolls: [{ diceType: 'custom', customFormula: '1d2' }]
    }
  ]
}

// Kammer-Schatz (1W6)
export const treasureTable: TreasureTable = {
  id: 'chamber-treasure',
  name: 'Kammer-Schatz',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'coins',
        name: 'Tasche mit Talern',
        description: 'Eine Ledertasche gefüllt mit klingenden Münzen'
      },
      description: 'Tasche mit 5W6 Talern',
      subRolls: [{ diceType: 'custom', customFormula: '5d6' }]
    },
    {
      range: 2,
      value: {
        id: 'trade-goods',
        name: '3 wasserdicht verpackte Handelswaren',
        description: 'Wertvolle Handelsgüter, gut vor den Elementen geschützt',
        requiresLocation: true
      }
    },
    {
      range: 3,
      value: {
        id: 'resource-theme',
        name: 'Ressource passend zum Thema',
        description: 'Eine wertvolle Ressource die zum Kerker-Thema passt (nahe Siedlung zahlt gut)',
        requiresLocation: true
      }
    },
    {
      range: 4,
      value: {
        id: 'valuable-resource',
        name: 'Wertvolle Ressource',
        description: 'Eine besonders wertvolle Ressource (entfernte Orte zahlen gut)',
        requiresLocation: true
      }
    },
    {
      range: 5,
      value: {
        id: 'damaged-equipment',
        name: 'Beschädigter Ausrüstungsgegenstand',
        description: 'Ein nützlicher Gegenstand der repariert werden muss (50% Reparaturkosten)'
      }
    },
    {
      range: 6,
      value: {
        id: 'crafting-materials',
        name: 'Stahl/Wandelholz/Monsterteile',
        description: 'Wertvolle Handwerksmaterialien (5 Einheiten = -10% Herstellungskosten)'
      }
    }
  ]
}

// Kernzauber-Kammer (1W6)
export const coreSpellTable: CoreSpellTable = {
  id: 'core-spell',
  name: 'Kernzauber-Inhalt',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'monster-devour',
        name: 'Monster kurz vor Zauber-Verschlingen',
        description: 'Ein gefangenes Monster versucht den Kernzauber zu verschlingen',
        special: 'Zusätzlicher Kampf gegen das Monster'
      }
    },
    {
      range: 2,
      value: {
        id: 'iron-wood-weapon',
        name: 'Eine Eisen-/Holzwaffe',
        description: 'Eine meisterhafte Waffe aus Eisen oder Wandelholz'
      }
    },
    {
      range: 3,
      value: {
        id: 'armor',
        name: 'Eine reguläre Rüstung',
        description: 'Eine gut erhaltene Rüstung von hoher Qualität'
      }
    },
    {
      range: 4,
      value: {
        id: 'magic-item',
        name: 'Magischer Gegenstand (keine Ausrüstung)',
        description: 'Ein mysteriöser magischer Gegenstand mit unbekannten Kräften'
      }
    },
    {
      range: 5,
      value: {
        id: 'platinum',
        name: 'Platinerz-Brocken',
        description: 'Ein schwerer Brocken reinen Platinerzes (40-50 Taler)'
      }
    },
    {
      range: 6,
      value: {
        id: 'artifact',
        name: 'Ein Artefakt',
        description: 'Ein mächtiges Artefakt von großer Bedeutung',
        special: 'Besondere Vorsicht geboten!'
      }
    }
  ]
}

// Hilfs-Funktionen für Fallen basierend auf Thema
export function generateTrapForTheme(theme: KerkerTheme, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Trap {
  const trapsByTheme: Record<string, Trap[]> = {
    pflanzen: [
      {
        id: 'thorn-vines',
        name: 'Dornenranken',
        theme: 'pflanzen',
        trigger: 'Druckplatte im Boden',
        effect: '2W6 Schaden, Bewegung halbiert für 3 Runden',
        difficulty: 15,
        resetTime: '1 Stunde'
      },
      {
        id: 'poison-spores',
        name: 'Giftsporen',
        theme: 'pflanzen',
        trigger: 'Berührung der Wände',
        effect: 'Gift (Übelkeit), 1W6 Schaden pro Runde für 3 Runden',
        difficulty: 20,
        resetTime: '30 Minuten'
      }
    ],
    erde: [
      {
        id: 'falling-rocks',
        name: 'Steinschlag',
        theme: 'erde',
        trigger: 'Stolperdraht',
        effect: '3W6 Schaden, Weg blockiert',
        difficulty: 10,
        resetTime: '2 Stunden'
      },
      {
        id: 'pit-trap',
        name: 'Erdloch',
        theme: 'erde',
        trigger: 'Falscher Boden',
        effect: '2W6 Fallschaden, schwer zu entkommen',
        difficulty: 15,
        resetTime: 'Manuell'
      }
    ],
    feuer: [
      {
        id: 'fire-jet',
        name: 'Feuerstoß',
        theme: 'feuer',
        trigger: 'Magischer Sensor',
        effect: '3W6 Feuerschaden, Kleidung kann Feuer fangen',
        difficulty: 18,
        resetTime: '10 Minuten'
      },
      {
        id: 'lava-pit',
        name: 'Lavagrube',
        theme: 'feuer',
        trigger: 'Kippender Boden',
        effect: '4W6 Schaden pro Runde, sofortiger Tod möglich',
        difficulty: 12,
        resetTime: 'Permanent'
      }
    ],
    wasser: [
      {
        id: 'flood-chamber',
        name: 'Flutkammer',
        theme: 'wasser',
        trigger: 'Öffnen der Tür',
        effect: 'Kammer flutet in 5 Runden, Ertrinken möglich',
        difficulty: 14,
        resetTime: '3 Stunden'
      },
      {
        id: 'ice-spikes',
        name: 'Eiszapfen',
        theme: 'wasser',
        trigger: 'Vibration/Lärm',
        effect: '2W6 Stichschaden, Rutschgefahr',
        difficulty: 16,
        resetTime: '1 Stunde'
      }
    ],
    kristall: [
      {
        id: 'mana-drain',
        name: 'Manaentzug',
        theme: 'kristall',
        trigger: 'Betreten des Feldes',
        effect: 'Verliere 2W6 SP, Schwindelgefühl',
        difficulty: 22,
        resetTime: '30 Minuten'
      },
      {
        id: 'teleport-trap',
        name: 'Teleportfalle',
        theme: 'kristall',
        trigger: 'Berührung des Kristalls',
        effect: 'Zufällige Teleportation in andere Kammer',
        difficulty: 25,
        resetTime: '1 Stunde'
      }
    ],
    wind: [
      {
        id: 'wind-blast',
        name: 'Windstoß',
        theme: 'wind',
        trigger: 'Unterbrechen des Luftstroms',
        effect: 'Wirft Ziele um, 1W6 Schaden, kann in Gruben drücken',
        difficulty: 13,
        resetTime: 'Sofort'
      },
      {
        id: 'sand-storm',
        name: 'Sandsturm',
        theme: 'wind',
        trigger: 'Zeitverzögerung',
        effect: 'Blindheit für 5 Runden, 1W6 Schaden pro Runde',
        difficulty: 17,
        resetTime: '2 Stunden'
      }
    ]
  }

  const themeTraps = trapsByTheme[theme.id] || []
  if (themeTraps.length === 0) return {
    id: 'generic-trap',
    name: 'Allgemeine Falle',
    theme: theme.id,
    trigger: 'Unbekannt',
    effect: '2W6 Schaden',
    difficulty: 15,
    resetTime: '1 Stunde'
  }

  // Wähle zufällige Falle
  const trap = themeTraps[Math.floor(Math.random() * themeTraps.length)]
  
  // Passe Schwierigkeit an
  const difficultyModifier = difficulty === 'easy' ? -5 : difficulty === 'hard' ? 5 : 0
  return {
    ...trap,
    difficulty: trap.difficulty + difficultyModifier
  }
}