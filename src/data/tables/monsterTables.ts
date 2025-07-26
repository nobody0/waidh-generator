import type { 
  MonsterAgeTable, 
  AttributeTable, 
  AbilityTable, 
  PropertyTable,
  MonsterAbility,
  MonsterProperty
} from '@/types/monster'

// Monster-Alter Tabelle (1W6)
export const monsterAgeTable: MonsterAgeTable = {
  id: 'monster-age',
  name: 'Monster-Alter',
  diceType: '1d6',
  entries: [
    { 
      range: 1, 
      value: {
        id: 'jung',
        name: 'Junges Monster',
        baseLP: 20,
        baseSP: 30,
        baseAP: 6,
        baseAttributes: 3,
        spMultiplier: 3,
        xValue: 1,
        yValue: 1
      },
      description: 'Ein junges, unerfahrenes Monster'
    },
    { 
      range: 2, 
      value: {
        id: '2jung',
        name: '2 junge Monster',
        baseLP: 20,
        baseSP: 30,
        baseAP: 6,
        baseAttributes: 3,
        spMultiplier: 3,
        xValue: 1,
        yValue: 1
      },
      description: 'Zwei junge Monster als Gruppe'
    },
    { 
      range: 3, 
      value: {
        id: 'erwachsen',
        name: 'Erwachsenes Monster',
        baseLP: 25,
        baseSP: 40,
        baseAP: 6,
        baseAttributes: 5,
        spMultiplier: 3,
        xValue: 2,
        yValue: 2
      },
      description: 'Ein ausgewachsenes Monster'
    },
    { 
      range: 4, 
      value: {
        id: 'alt',
        name: 'Altes Monster',
        baseLP: 35,
        baseSP: 55,
        baseAP: 6,
        baseAttributes: 7,
        spMultiplier: 3,
        xValue: 3,
        yValue: 3
      },
      description: 'Ein erfahrenes, altes Monster'
    },
    { 
      range: 5, 
      value: {
        id: 'altehrwuerdig',
        name: 'Altehrwürdiges Monster',
        baseLP: 55,
        baseSP: 75,
        baseAP: 7,
        baseAttributes: 10,
        spMultiplier: 6,
        xValue: 4,
        yValue: 4
      },
      description: 'Ein legendäres Monster (4W6 Angriff/Verteidigung)'
    },
    { 
      range: 6, 
      value: {
        id: 'weltenbestie',
        name: 'Weltenbestie',
        baseLP: 100,
        baseSP: 180,
        baseAP: 8,
        baseAttributes: 15,
        spMultiplier: 6,
        xValue: 5,
        yValue: 5
      },
      description: 'Eine weltbedrohende Bestie (4W6 Angriff/Verteidigung)'
    }
  ]
}

// Stärke-Attribut Tabelle (1W6)
export const strengthAttributeTable: AttributeTable = {
  id: 'monster-strength',
  name: 'Stärke-Attribut',
  diceType: '1d6',
  entries: [
    { range: 1, value: 'stärke', description: 'Stärke (+X) / Geschick (-Y)' },
    { range: 2, value: 'geschick', description: 'Geschick (+X) / Stärke (-Y)' },
    { range: 3, value: 'willenskraft', description: 'Willenskraft (+X) / Willenskraft (-Y)' },
    { range: 4, value: 'logik', description: 'Logik (+X) / Logik (-Y)' },
    { range: 5, value: 'mystik', description: 'Mystik (+X) / Mystik (-Y)' },
    { range: 6, value: 'stärke', description: 'Würfle 2x neu (keine 6)' }
  ]
}

// Schwäche-Attribut Tabelle (1W6)
export const weaknessAttributeTable: AttributeTable = {
  id: 'monster-weakness',
  name: 'Schwäche-Attribut',
  diceType: '1d6',
  entries: [
    { range: 1, value: 'geschick', description: 'Geschick (-Y)' },
    { range: 2, value: 'stärke', description: 'Stärke (-Y)' },
    { range: 3, value: 'willenskraft', description: 'Willenskraft (-Y)' },
    { range: 4, value: 'logik', description: 'Logik (-Y)' },
    { range: 5, value: 'mystik', description: 'Mystik (-Y)' },
    { range: 6, value: 'stärke', description: 'Würfle 2x neu (keine 6)' }
  ]
}

// Stärke-Fähigkeiten (1W6)
const strengthAbilities: MonsterAbility[] = [
  {
    id: 'panzer',
    name: 'Panzer',
    attribute: 'stärke',
    description: 'Natürliche Rüstung',
    effect: 'Reduziert eingehenden Schaden'
  },
  {
    id: 'kampfrausch',
    name: 'Kampfrausch',
    attribute: 'stärke',
    description: 'Steigert sich in Rage',
    effect: '+2 auf Angriff wenn verletzt'
  },
  {
    id: 'panik',
    name: 'Panik',
    attribute: 'stärke',
    description: 'Verursacht Furcht',
    effect: 'Gegner müssen Willenskraft-Probe bestehen'
  },
  {
    id: 'graben',
    name: 'Graben',
    attribute: 'stärke',
    description: 'Kann sich eingraben',
    effect: 'Bewegung unter der Erde'
  },
  {
    id: 'unruhe',
    name: 'Unruhe',
    attribute: 'stärke',
    description: 'Ständig in Bewegung',
    effect: 'Schwerer zu treffen'
  },
  {
    id: 'ergreifen',
    name: 'Ergreifen',
    attribute: 'stärke',
    description: 'Packt und hält Gegner',
    effect: 'Gegner ist bewegungsunfähig'
  }
]

// Geschick-Fähigkeiten (1W6)
const dexterityAbilities: MonsterAbility[] = [
  {
    id: 'umherspringen',
    name: 'Umherspringen',
    attribute: 'geschick',
    description: 'Springt wild umher',
    effect: '+2 auf Verteidigung'
  },
  {
    id: 'projektil',
    name: 'Projektil',
    attribute: 'geschick',
    description: 'Fernkampfangriff',
    effect: 'Kann aus der Distanz angreifen'
  },
  {
    id: 'rasende-geschwindigkeit',
    name: 'Rasende Geschwindigkeit',
    attribute: 'geschick',
    description: 'Extrem schnell',
    effect: 'Doppelte Bewegungsreichweite'
  },
  {
    id: 'angepasste-bewegung',
    name: 'Angepasste Bewegung',
    attribute: 'geschick',
    description: 'Spezielle Fortbewegung',
    effect: 'Klettern, Schwimmen oder ähnliches'
  },
  {
    id: 'fliegen',
    name: 'Fliegen',
    attribute: 'geschick',
    description: 'Kann fliegen',
    effect: 'Flugbewegung'
  },
  {
    id: 'schmerzreaktion',
    name: 'Schmerzreaktion',
    attribute: 'geschick',
    description: 'Reflexartiger Gegenangriff',
    effect: 'Automatischer Gegenangriff bei Treffer'
  }
]

// Willenskraft-Fähigkeiten (1W6)
const willpowerAbilities: MonsterAbility[] = [
  {
    id: 'aufbaeumen',
    name: 'Aufbäumen',
    attribute: 'willenskraft',
    description: 'Kämpft bis zum Ende',
    effect: 'Ignoriert Mali durch Verletzungen'
  },
  {
    id: 'schmerzresistenz',
    name: 'Schmerzresistenz',
    attribute: 'willenskraft',
    description: 'Unempfindlich gegen Schmerz',
    effect: 'Reduzierte Mali durch Schaden'
  },
  {
    id: 'todeskampf',
    name: 'Todeskampf',
    attribute: 'willenskraft',
    description: 'Letzter verzweifelter Angriff',
    effect: 'Bonusangriff bei 0 LP'
  },
  {
    id: 'aufwind',
    name: 'Aufwind',
    attribute: 'willenskraft',
    description: 'Motiviert sich selbst',
    effect: 'Regeneriert SP im Kampf'
  },
  {
    id: 'schadenfreude',
    name: 'Schadenfreude',
    attribute: 'willenskraft',
    description: 'Freut sich über Schmerz',
    effect: 'Heilt LP wenn es Schaden verursacht'
  },
  {
    id: 'bedrohen',
    name: 'Bedrohen',
    attribute: 'willenskraft',
    description: 'Einschüchternde Präsenz',
    effect: 'Gegner erhalten Mali auf Angriffe'
  }
]

// Logik-Fähigkeiten (1W6)
const logicAbilities: MonsterAbility[] = [
  {
    id: 'einschaetzen',
    name: 'Einschätzen',
    attribute: 'logik',
    description: 'Analysiert Gegner',
    effect: 'Erkennt Schwächen'
  },
  {
    id: 'tot-stellen',
    name: 'Tot Stellen',
    attribute: 'logik',
    description: 'Täuscht den Tod vor',
    effect: 'Gegner brechen Angriff ab'
  },
  {
    id: 'misstrauen',
    name: 'Misstrauen',
    attribute: 'logik',
    description: 'Extrem vorsichtig',
    effect: 'Immun gegen Täuschungen'
  },
  {
    id: 'erwarten',
    name: 'Erwarten',
    attribute: 'logik',
    description: 'Antizipiert Angriffe',
    effect: '+1 auf Initiative'
  },
  {
    id: 'unergruendlich',
    name: 'Unergründlich',
    attribute: 'logik',
    description: 'Unvorhersehbare Aktionen',
    effect: 'Gegner können Aktionen nicht vorhersehen'
  },
  {
    id: 'tarnung',
    name: 'Tarnung',
    attribute: 'logik',
    description: 'Meister der Tarnung',
    effect: 'Kann sich verstecken'
  }
]

// Mystik-Fähigkeiten (1W6)
const mysticAbilities: MonsterAbility[] = [
  {
    id: 'zauberbestie',
    name: 'Zauberbestie',
    attribute: 'mystik',
    description: 'Kann Zauber wirken',
    effect: 'Zugang zu Zaubern'
  },
  {
    id: 'manawirbel',
    name: 'Manawirbel',
    attribute: 'mystik',
    description: 'Stört Magie',
    effect: 'Zauber in der Nähe sind erschwert'
  },
  {
    id: 'manabarriere',
    name: 'Manabarriere',
    attribute: 'mystik',
    description: 'Magischer Schutz',
    effect: 'Resistenz gegen Zauber'
  },
  {
    id: 'absorption',
    name: 'Absorption',
    attribute: 'mystik',
    description: 'Absorbiert Mana',
    effect: 'Stiehlt SP von Zauberern'
  },
  {
    id: 'gift',
    name: 'Gift',
    attribute: 'mystik',
    description: 'Giftiger Angriff',
    effect: 'Verursacht Vergiftung'
  },
  {
    id: 'zwilling',
    name: 'Zwilling',
    attribute: 'mystik',
    description: 'Erschafft Illusionen',
    effect: 'Erzeugt Trugbilder von sich'
  }
]

// Fähigkeiten-Tabellen
export const strengthAbilityTable: AbilityTable = {
  id: 'strength-abilities',
  name: 'Stärke-Fähigkeiten',
  diceType: '1d6',
  entries: strengthAbilities.map((ability, index) => ({
    range: index + 1,
    value: ability,
    description: ability.effect
  }))
}

export const dexterityAbilityTable: AbilityTable = {
  id: 'dexterity-abilities',
  name: 'Geschick-Fähigkeiten',
  diceType: '1d6',
  entries: dexterityAbilities.map((ability, index) => ({
    range: index + 1,
    value: ability,
    description: ability.effect
  }))
}

export const willpowerAbilityTable: AbilityTable = {
  id: 'willpower-abilities',
  name: 'Willenskraft-Fähigkeiten',
  diceType: '1d6',
  entries: willpowerAbilities.map((ability, index) => ({
    range: index + 1,
    value: ability,
    description: ability.effect
  }))
}

export const logicAbilityTable: AbilityTable = {
  id: 'logic-abilities',
  name: 'Logik-Fähigkeiten',
  diceType: '1d6',
  entries: logicAbilities.map((ability, index) => ({
    range: index + 1,
    value: ability,
    description: ability.effect
  }))
}

export const mysticAbilityTable: AbilityTable = {
  id: 'mystic-abilities',
  name: 'Mystik-Fähigkeiten',
  diceType: '1d6',
  entries: mysticAbilities.map((ability, index) => ({
    range: index + 1,
    value: ability,
    description: ability.effect
  }))
}

// Schlechte Eigenschaften (2W6)
export const badPropertiesTable: PropertyTable = {
  id: 'bad-properties',
  name: 'Schlechte Eigenschaften',
  diceType: '2d6',
  entries: [
    {
      range: 2,
      value: {
        id: 'aengstlich',
        name: 'Ängstlich',
        effect: 'Flieht bei halben LP'
      }
    },
    {
      range: 3,
      value: {
        id: 'vertrieben',
        name: 'Vertrieben',
        effect: 'Wurde aus seinem Revier vertrieben'
      }
    },
    {
      range: 4,
      value: {
        id: 'aquaphobie',
        name: 'Aquaphobie',
        effect: 'Angst vor Wasser'
      }
    },
    {
      range: 5,
      value: {
        id: 'traege',
        name: 'Träge',
        effect: '-1 auf Initiative'
      }
    },
    {
      range: 6,
      value: {
        id: 'verletzt',
        name: 'Verletzt',
        effect: 'Startet mit -25% LP'
      }
    },
    {
      range: 7,
      value: {
        id: 'vernarbt',
        name: 'Vernarbt',
        effect: 'Alte Verletzungen behindern'
      }
    },
    {
      range: 8,
      value: {
        id: 'stahlfuerchtig',
        name: 'Stahlfürchtig',
        effect: 'Angst vor Metallwaffen'
      }
    },
    {
      range: 9,
      value: {
        id: 'zerbrechlich',
        name: 'Zerbrechlich',
        effect: '-10% LP'
      }
    },
    {
      range: 10,
      value: {
        id: 'manablind',
        name: 'Manablind',
        effect: 'Kann Mana nicht wahrnehmen'
      }
    },
    {
      range: 11,
      value: {
        id: 'passiv',
        name: 'Passiv',
        effect: 'Greift nur an wenn angegriffen'
      }
    },
    {
      range: 12,
      value: {
        id: 'blinde-wut',
        name: 'Blinde Wut',
        effect: '-2 auf Verteidigung im Kampf'
      }
    }
  ]
}

// Hilfsfunktionen
export function getAbilityTableByAttribute(attribute: string): AbilityTable | null {
  switch (attribute) {
    case 'stärke': return strengthAbilityTable
    case 'geschick': return dexterityAbilityTable
    case 'willenskraft': return willpowerAbilityTable
    case 'logik': return logicAbilityTable
    case 'mystik': return mysticAbilityTable
    default: return null
  }
}

// Alle Fähigkeiten als flache Liste
export const allAbilities: MonsterAbility[] = [
  ...strengthAbilities,
  ...dexterityAbilities,
  ...willpowerAbilities,
  ...logicAbilities,
  ...mysticAbilities
]

// Alle Eigenschaften als flache Liste
export const allProperties: MonsterProperty[] = badPropertiesTable.entries.map(e => e.value)