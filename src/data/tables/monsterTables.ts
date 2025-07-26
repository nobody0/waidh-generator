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
    effect: 'Reduziert LP-Schaden um 50% des STR-Attributs (aufgerundet). Falls aller Schaden verhindert würde, wird er stattdessen auf 1 reduziert. Permanent aktiv.'
  },
  {
    id: 'kampfrausch',
    name: 'Kampfrausch',
    attribute: 'stärke',
    description: 'Steigert sich in Rage',
    effect: '+1 Schaden bei jedem Angriff (egal ob Treffer oder nicht). Stapelt sich bis max. 10×. Setzt sich zurück wenn Monster einen ganzen Zug lang nicht trifft. Mehrfach: Erhöht Schaden pro Stapel, nicht Maximum.'
  },
  {
    id: 'panik',
    name: 'Panik',
    attribute: 'stärke',
    description: 'Verursacht Furcht',
    effect: 'Aktiviert einmalig pro Kampf bei LP-Schaden. +3 auf alle STR/GES-Proben bis Ende nächsten Zuges. Mehrfach: Weitere Aktivierungen.'
  },
  {
    id: 'graben',
    name: 'Graben',
    attribute: 'stärke',
    description: 'Kann sich eingraben',
    effect: 'Unterirdische Bewegung mit 50% der normalen Geschwindigkeit. Hinterlässt begehbare Tunnel. Mehrfach: +50% Geschwindigkeit pro zusätzlicher Zuweisung.'
  },
  {
    id: 'unruhe',
    name: 'Unruhe',
    attribute: 'stärke',
    description: 'Mehrfachangriff',
    effect: '4 AP für 2 Angriffe auf dasselbe Ziel. Angriffe nutzen: 3W6 + GES. Mehrfach: +1 Angriff pro zusätzlicher Zuweisung. Mit Projektil: Eine Ladung für alle Angriffe.'
  },
  {
    id: 'ergreifen',
    name: 'Ergreifen',
    attribute: 'stärke',
    description: 'Packt und hält Gegner',
    effect: '5 AP um Ziel zu greifen (keine Probe nötig bei kleinerem Ziel). Gegriffen = normale Bewegung wenn Ziel kleiner. Mehrfach: +5m Bewegung pro Zuweisung beim Tragen.'
  }
]

// Geschick-Fähigkeiten (1W6)
const dexterityAbilities: MonsterAbility[] = [
  {
    id: 'umherspringen',
    name: 'Umherspringen',
    attribute: 'geschick',
    description: 'Springt wild umher',
    effect: 'Bewegung + direkt folgender Angriff = -1 AP Kosten. Permanent aktiv.'
  },
  {
    id: 'projektil',
    name: 'Projektil',
    attribute: 'geschick',
    description: 'Fernkampfangriff',
    effect: '3 AP für Fernkampf bis 60m. Angriff: 3W6 + (GES × 2). Schaden: +STR. 1× pro Zug. Mehrfach: +1 Angriff pro Zug und +60m Reichweite.'
  },
  {
    id: 'rasende-geschwindigkeit',
    name: 'Rasende Geschwindigkeit',
    attribute: 'geschick',
    description: 'Extrem schnell',
    effect: 'Bei 5m+ Bewegung kann Monster nicht abgefangen/angegriffen werden. Gilt für direkt vor/während/nach der Bewegung.'
  },
  {
    id: 'angepasste-bewegung',
    name: 'Angepasste Bewegung',
    attribute: 'geschick',
    description: 'Spezielle Fortbewegung',
    effect: '+50% Bewegung im Heimat-Terrain. Funktioniert nur im angepassten Lebensraum. Beispiele: Hufe für Steppe, Greifarme für Bäume.'
  },
  {
    id: 'fliegen',
    name: 'Fliegen',
    attribute: 'geschick',
    description: 'Kann fliegen',
    effect: 'Freies Fliegen und Schweben. Mehrfach: +50% Fluggeschwindigkeit pro Zuweisung.'
  },
  {
    id: 'schmerzreaktion',
    name: 'Schmerzreaktion',
    attribute: 'geschick',
    description: 'Reflexartiger Rückzug',
    effect: 'Bei Schaden (wenn nicht gegriffen): Muss sich GES Meter bewegen. Automatisch, keine Kosten.'
  }
]

// Willenskraft-Fähigkeiten (1W6)
const willpowerAbilities: MonsterAbility[] = [
  {
    id: 'aufbaeumen',
    name: 'Aufbäumen',
    attribute: 'willenskraft',
    description: 'Kämpft bis zum Ende',
    effect: 'Einmalig pro Kampf bei LP-Schaden. Stellt alle SP wieder her. Ignoriert Verletzungs-Mali bis Ende nächsten Zuges.'
  },
  {
    id: 'schmerzresistenz',
    name: 'Schmerzresistenz',
    attribute: 'willenskraft',
    description: 'Unempfindlich gegen Schmerz',
    effect: 'Erste 3 fehlende LP haben keinen Malus. Ab 4+ fehlenden LP: Voller Malus. Tritt wieder in Kraft wenn unter 4 fehlende LP.'
  },
  {
    id: 'todeskampf',
    name: 'Todeskampf',
    attribute: 'willenskraft',
    description: 'Letzter verzweifelter Kampf',
    effect: 'Aktiviert bei 25% oder weniger LP. +2 auf alle Attribut-Proben. Immun gegen Vergiftung. Ignoriert Knochenbrüche. Mehrfach: Nur Bonus stapelt sich.'
  },
  {
    id: 'aufwind',
    name: 'Aufwind',
    attribute: 'willenskraft',
    description: 'Motiviert sich selbst',
    effect: '+4 SP Regeneration am Zugende. Nur wenn zwischen Zügen kein Schaden erlitten.'
  },
  {
    id: 'schadenfreude',
    name: 'Schadenfreude',
    attribute: 'willenskraft',
    description: 'Freut sich über Schmerz',
    effect: '+5 SP wenn Monster LP-Schaden verursacht. Pro getroffenen Angriff.'
  },
  {
    id: 'bedrohen',
    name: 'Bedrohen',
    attribute: 'willenskraft',
    description: 'Einschüchternde Präsenz',
    effect: '1× pro Zug ohne AP-Kosten. Wurf: 3W6 + WIL. Ziel wehrt mit WIL oder LOG. Bei Erfolg: Ziel geistig gestresst + halbe Bewegung. Mehrfach: +1 Anwendung pro Zug.'
  }
]

// Logik-Fähigkeiten (1W6)
const logicAbilities: MonsterAbility[] = [
  {
    id: 'einschaetzen',
    name: 'Einschätzen',
    attribute: 'logik',
    description: 'Analysiert Gegner',
    effect: '1× pro Zug ohne Kosten. Erkennt aktuelle SP und LP eines Ziels.'
  },
  {
    id: 'tot-stellen',
    name: 'Tot Stellen',
    attribute: 'logik',
    description: 'Täuscht den Tod vor',
    effect: 'Aktiviert bei 20% LP (oder weniger). Herausfordernde LOG-Probe zum Durchschauen. Mehrfach: Weitere Schwellen (bei 3×: 60%, 40%, 20%). Maximum 5× (dann bei jedem LP-Schaden).'
  },
  {
    id: 'misstrauen',
    name: 'Misstrauen',
    attribute: 'logik',
    description: 'Extrem vorsichtig',
    effect: 'Bei Überraschungsangriff: Würfle 1W6. Bei 1-2: Darf trotzdem verteidigen. Mehrfach: Bei 2×: 1-4, bei 3×: Immer. Maximum 3×.'
  },
  {
    id: 'erwarten',
    name: 'Erwarten',
    attribute: 'logik',
    description: 'Antizipiert Angriffe',
    effect: '2× pro Runde: Freier Nahkampfangriff wenn sich jemand in Reichweite bewegt. Angriff: 3W6 + (GES × 1,5). Mehrfach: +1 Angriff pro Runde. Mit Projektil: Auch Fernkampf möglich.'
  },
  {
    id: 'unergruendlich',
    name: 'Unergründlich',
    attribute: 'logik',
    description: 'Unvorhersehbare Aktionen',
    effect: 'ANALYSE-Aktion funktioniert kaum. Bei 2×: ANALYSE gibt Falschinformationen. Maximum 2×.'
  },
  {
    id: 'tarnung',
    name: 'Tarnung',
    attribute: 'logik',
    description: 'Meister der Tarnung',
    effect: 'Gezielt gesucht: Erst aus 50m erkennbar. Nicht gesucht: Erst aus 15m erkennbar. Solange sich nicht auffällig bewegt. Stapelt sich nicht.'
  }
]

// Mystik-Fähigkeiten (1W6)
const mysticAbilities: MonsterAbility[] = [
  {
    id: 'zauberbestie',
    name: 'Zauberbestie',
    attribute: 'mystik',
    description: 'Kann Zauber wirken',
    effect: '2 AP für Mana verdichten. 1 AP für Mana aktivieren. Bei 2×: +Mana weben (2 AP). Bei 3×: +Mana kondensieren (3 AP). Maximum 3×.'
  },
  {
    id: 'manawirbel',
    name: 'Manawirbel',
    attribute: 'mystik',
    description: 'Stört Magie',
    effect: 'Verdichtetes Mana in Nahkampfreichweite zerfasert. Zu Beginn des Monster-Zuges. Außer eigene Zauber. Mehrfach: Größerer Radius.'
  },
  {
    id: 'manabarriere',
    name: 'Manabarriere',
    attribute: 'mystik',
    description: 'Magischer Schutz',
    effect: 'LP-Schaden halbiert (min -5). Kann auf 0 reduzieren trotz PANZER. Deaktiviert für 1 Runde nach LP-Schaden. Mehrfach: +1 Treffer bevor Deaktivierung.'
  },
  {
    id: 'absorption',
    name: 'Absorption',
    attribute: 'mystik',
    description: 'Absorbiert Mana',
    effect: 'Bei magischem Schaden: Heilt 50% am Zugende. Auch wenn nur SP getroffen. Bei vollen LP: +3 SP stattdessen.'
  },
  {
    id: 'gift',
    name: 'Gift',
    attribute: 'mystik',
    description: 'Giftiger Angriff',
    effect: 'Bei Nahkampf-LP-Schaden: +1 Giftschaden. Ziel würfelt auf Vergiftungstabelle. Mehrfach: Mehr Giftschaden. Mit Projektil: Auch Fernkampf.'
  },
  {
    id: 'zwilling',
    name: 'Zwilling',
    attribute: 'mystik',
    description: 'Erschafft Duplikat',
    effect: 'Exakt identisches zweites Monster. Gleiche Attribute, Fähigkeiten, Eigenschaften. Verbündet oder tolerieren sich. Kann NICHT mehrfach gewürfelt werden.'
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
        effect: 'Erhöhter Staminaschaden: +3 wenn Monster den Angriff kommen sieht. Gilt nur für sichtbare Angriffe. Betrifft nur Stamina, nicht LP direkt.'
      }
    },
    {
      range: 3,
      value: {
        id: 'vertrieben',
        name: 'Vertrieben',
        effect: 'Monster stammt aus anderer Umgebung. Malus -1 auf ALLE Proben. Kann Fähigkeiten nicht optimal einsetzen. Aggressiver als für Alter normal (aktive Mana-Suche).'
      }
    },
    {
      range: 4,
      value: {
        id: 'aquaphobie',
        name: 'Aquaphobie',
        effect: 'Angst vor Wasser tiefer als Bauchhöhe. Meidet solche Gewässer wenn möglich. Im tiefen Wasser: Körperlich, geistig UND mystisch gestresst. Stress endet erst auf trockenem Land/beim Fliegen. Überschreibt andere Instinkte - will um jeden Preis raus.'
      }
    },
    {
      range: 5,
      value: {
        id: 'traege',
        name: 'Träge',
        effect: '1. Kampfrunde: Initiative -20. 2. Kampfrunde: Initiative -10. Ab 3. Kampfrunde: Initiative -5 (permanent). Monster braucht Zeit um "warm zu werden".'
      }
    },
    {
      range: 6,
      value: {
        id: 'verletzt',
        name: 'Verletzt',
        effect: 'Malus -2 auf alle GES-Proben. Angriffe auf verletzte Stelle: +3 Schaden. Nach 1 Monat: Malus sinkt auf -1. Nach 3 Monaten: Wird zu VERNARBT. Schützt verletzte Stelle im Kampf. Körperteil muss notiert werden. Kann im Spiel neu erhalten werden (bei ≤25% LP Kampfende).'
      }
    },
    {
      range: 7,
      value: {
        id: 'vernarbt',
        name: 'Vernarbt',
        effect: 'Angriffe auf Narben-Stelle: +3 STAMINAschaden. Zusatzschaden kann auf LP übergreifen (nur wenn SP nicht für ganzen Angriff reicht). Bei 0 SP: Kein Zusatzschaden auf LP. Körperteil muss notiert werden. Kann mehrfach für verschiedene Körperteile gelten. Wenn VERLETZT + VERNARBT am selben Teil: Nur VERLETZT gilt.'
      }
    },
    {
      range: 8,
      value: {
        id: 'stahlfuerchtig',
        name: 'Stahlfürchtig',
        effect: 'Respekt vor Stahl-/Wandelholz-/Monsterwaffen. Vorsichtiges Ausweichen kostet mehr. Staminaschaden von solchen Waffen: +25% (min +5). Berechnung NACH allen anderen Modifikatoren. Zusatzschaden geht nur auf LP wenn noch SP vorhanden waren.'
      }
    },
    {
      range: 9,
      value: {
        id: 'zerbrechlich',
        name: 'Zerbrechlich',
        effect: 'LP-Schaden immer +5. Mit MANABARRIERE: Kein Zusatzschaden solange Barriere aktiv. Sobald Barriere fällt: Zusatzschaden gilt wieder.'
      }
    },
    {
      range: 10,
      value: {
        id: 'manablind',
        name: 'Manablind',
        effect: 'Kann Mana NICHT wahrnehmen (sonst können alle Monster das). Spürt nur instinktiv ob Umgebung genug Mana produziert. Muss auf gut Glück neue Orte suchen. Erkennt Zauber nicht als solche (außer eigene).'
      }
    },
    {
      range: 11,
      value: {
        id: 'passiv',
        name: 'Passiv',
        effect: 'NICHT aggressiv gegen Tiere/Humanoide. Greift andere Monster trotzdem an. Verteidigt sich bei Angriff mit voller Stärke. Versucht eher Kampfende als Gegner zu töten. Probleme durch: Konsumverhalten, Mana-Absorption, Zerstörung für Nestbau. Zeigt nur gegen andere Monster echte Mordlust.'
      }
    },
    {
      range: 12,
      value: {
        id: 'blinde-wut',
        name: 'Blinde Wut',
        effect: 'Im Kampf: Greift IMMER nächstes/auffälligstes Ziel an. Auch wenn Köder oder überlegener Feind (z.B. Weltenbestie). Wechselt Ziel sobald aktuelles fällt. Ignoriert Bewusstlose solange andere Feinde da sind. Außerhalb Kampf: Normal aggressiv. Verfällt auch bei ADRENALINSCHUB in Kampfeswut.'
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