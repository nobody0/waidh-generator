import type { 
  AdventureProblemTable, 
  AdventureTriggerTable, 
  AdventureObstacleTable,
  AdventureProblem,
  AdventureTrigger,
  AdventureObstacle
} from '@/types/adventure'

// Problem-Tabelle (1W6)
export const problemTable: AdventureProblemTable = {
  id: 'adventure-problem',
  name: 'Problem',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'direkte-bedrohung',
        name: 'Siedlung/Dorf wird direkt und aktiv bedroht',
        category: 'direkt',
        description: 'Eine unmittelbare Gefahr bedroht die Bewohner oder ihre Lebensgrundlage.',
        examples: [
          'Monster greifen regelmäßig an',
          'Belagerung durch Banditen',
          'Seuche breitet sich aus',
          'Magische Anomalie zerstört Gebäude'
        ],
        severity: 3
      }
    },
    {
      range: 2,
      value: {
        id: 'indirekte-beeintraechtigung',
        name: 'Siedlung/Dorf wird offen, aber indirekt beeinträchtigt',
        category: 'indirekt',
        description: 'Die Lebensqualität ist stark eingeschränkt, aber keine unmittelbare Lebensgefahr.',
        examples: [
          'Brunnen vergiftet',
          'Ernten verdorren',
          'Fluch liegt auf dem Ort',
          'Wichtige Ressource versiegt'
        ],
        severity: 2
      }
    },
    {
      range: 3,
      value: {
        id: 'unsichere-routen',
        name: 'Die Handels- und Reiserouten sind unsicher',
        category: 'route',
        description: 'Reisen und Handel sind gefährlich oder unmöglich geworden.',
        examples: [
          'Banditen überfallen Karawanen',
          'Monster lauern auf den Wegen',
          'Brücke zerstört',
          'Magischer Nebel verwirrt Reisende'
        ],
        severity: 2
      }
    },
    {
      range: 4,
      value: {
        id: 'unerklärliches-ereignis',
        name: 'Ein unerklärlich erscheinendes Ereignis ist aufgetreten',
        category: 'unerklärlich',
        description: 'Mysteriöse Vorkommnisse beunruhigen die Bevölkerung.',
        examples: [
          'Menschen verschwinden spurlos',
          'Seltsame Visionen plagen alle',
          'Tiere verhalten sich aggressiv',
          'Zeit verläuft anders'
        ],
        severity: 2
      }
    },
    {
      range: 5,
      value: {
        id: 'drohende-ausbreitung',
        name: 'Eine Siedlung/ein Dorf wurde zerstört, Gefahr droht sich auszubreiten',
        category: 'ausbreitung',
        description: 'Eine Katastrophe hat bereits zugeschlagen und könnte weitere Orte treffen.',
        examples: [
          'Flüchtlinge berichten von Monster-Horde',
          'Seuche hat Nachbarort ausgelöscht',
          'Magische Explosion hinterlässt wachsende Todeszone',
          'Kult opferte ganzes Dorf'
        ],
        severity: 3
      }
    },
    {
      range: 6,
      value: {
        id: 'wachstums-limitierung',
        name: 'Eine Siedlung/ein Dorf will wachsen, wird darin aber limitiert',
        category: 'wachstum',
        description: 'Expansion oder Entwicklung wird durch äußere Umstände verhindert.',
        examples: [
          'Monster-Revier blockiert Expansion',
          'Nachbarort beansprucht Land',
          'Magische Barriere begrenzt Gebiet',
          'Wichtige Ressource für Wachstum fehlt'
        ],
        severity: 1
      }
    }
  ]
}

// Auslöser-Tabelle (1W6)
export const triggerTable: AdventureTriggerTable = {
  id: 'adventure-trigger',
  name: 'Auslöser',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'nicht-spielbares-wesen',
        name: 'Eine Naturkatastrophe oder ein nicht spielbares Wesen',
        type: 'wesen',
        description: 'Elementare Kräfte oder mächtige Wesen haben das Problem verursacht.',
        details: [
          'Elementar wütet in der Gegend',
          'Drache hat sich niedergelassen',
          'Erdbeben/Flut/Sturm',
          'Feenwesen spielt Streiche'
        ],
        dangerLevel: 2
      }
    },
    {
      range: 2,
      value: {
        id: 'wandelholz',
        name: 'Ein Wandelholz oder Zauberwald',
        type: 'wandelholz',
        description: 'Die wilde Magie der Natur ist außer Kontrolle geraten.',
        details: [
          'Wandelholz breitet sich aus',
          'Zauberwald wird aggressiv',
          'Magische Pflanzen mutieren',
          'Natürliche Balance gestört'
        ],
        dangerLevel: 3
      }
    },
    {
      range: 3,
      value: {
        id: 'menschlicher-fehler',
        name: 'Ein Fehler eines Ortsbewohners/eines anderen Reisenden',
        type: 'fehler',
        description: 'Menschliches Versagen hat die Situation herbeigeführt.',
        details: [
          'Magisches Experiment ging schief',
          'Verbotenes Ritual durchgeführt',
          'Wichtiges Siegel gebrochen',
          'Falscher Handel abgeschlossen'
        ],
        dangerLevel: 1
      }
    },
    {
      range: 4,
      value: {
        id: 'monster',
        name: 'Ein Monster',
        type: 'monster',
        description: 'Eine oder mehrere Bestien sind die Ursache.',
        details: [
          'Territoriales Monster',
          'Hungrige Bestie',
          'Brutzeit macht aggressiv',
          'Aus Lebensraum vertrieben'
        ],
        dangerLevel: 2
      }
    },
    {
      range: 5,
      value: {
        id: 'banditenbande',
        name: 'Eine Banditenbande',
        type: 'banditen',
        description: 'Organisierte Kriminelle nutzen die Situation aus.',
        details: [
          'Ehemaliger Söldnertrupp',
          'Verzweifelte Flüchtlinge',
          'Korrupte Ex-Wachen',
          'Kultisten mit Agenda'
        ],
        dangerLevel: 2
      }
    },
    {
      range: 6,
      value: {
        id: 'artefakt',
        name: 'Ein Artefakt',
        type: 'artefakt',
        description: 'Ein mächtiger magischer Gegenstand ist involviert.',
        details: [
          'Verfluchtes Erbstück aktiviert',
          'Gestohlenes Tempel-Artefakt',
          'Uralte Waffe erwacht',
          'Korrumpierender Einfluss'
        ],
        dangerLevel: 3
      }
    }
  ]
}

// Hindernis-Tabelle (1W6)
export const obstacleTable: AdventureObstacleTable = {
  id: 'adventure-obstacle',
  name: 'Warum nicht selbst lösbar',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'interner-konflikt',
        name: 'Konflikt zwischen den Anwohnern (Gefühle, Moral, Glauben etc.)',
        description: 'Die Gemeinschaft ist gespalten und kann sich nicht einigen.',
        solutions: [
          'Vermittlung zwischen Parteien',
          'Neutralen Schlichter finden',
          'Kompromiss ausarbeiten',
          'Wahren Schuldigen entlarven'
        ],
        complexity: 2
      }
    },
    {
      range: 2,
      value: {
        id: 'fehlende-ausruestung',
        name: 'Unzureichende Ausrüstung oder Materialien',
        description: 'Die nötigen Mittel zur Problemlösung fehlen.',
        solutions: [
          'Spezialausrüstung beschaffen',
          'Seltene Komponenten finden',
          'Experten-Werkzeuge leihen',
          'Alternative Methoden entwickeln'
        ],
        complexity: 1
      }
    },
    {
      range: 3,
      value: {
        id: 'ausloeser-zu-maechtig',
        name: 'Der Auslöser des Problems',
        description: 'Die Ursache selbst ist zu mächtig für die Bewohner.',
        solutions: [
          'Schwachpunkt finden',
          'Verbündete sammeln',
          'List statt Gewalt',
          'Verhandlungslösung suchen'
        ],
        complexity: 3
      }
    },
    {
      range: 4,
      value: {
        id: 'problem-zu-komplex',
        name: 'Das Problem selbst',
        description: 'Die Situation ist zu komplex oder gefährlich.',
        solutions: [
          'Problem in Teile zerlegen',
          'Schrittweise vorgehen',
          'Expertise von außen',
          'Unkonventionelle Lösung'
        ],
        complexity: 2
      }
    },
    {
      range: 5,
      value: {
        id: 'unbekannte-ursache',
        name: 'Die tatsächliche Quelle des Problems ist den Anwohnern nicht bekannt',
        description: 'Ohne das wahre Problem zu kennen, kann es nicht gelöst werden.',
        solutions: [
          'Gründliche Untersuchung',
          'Zeugen befragen',
          'Spuren verfolgen',
          'Magische Divination'
        ],
        complexity: 2
      }
    },
    {
      range: 6,
      value: {
        id: 'niemand-traut-sich',
        name: 'Niemand traut sich',
        description: 'Angst oder Aberglaube lähmt die Bevölkerung.',
        solutions: [
          'Mut machen',
          'Vorbild sein',
          'Ängste entkräften',
          'Schutz gewährleisten'
        ],
        complexity: 1
      }
    }
  ]
}

// Komplikationen (optional, nicht gewürfelt)
export const complications = [
  {
    id: 'zeitdruck',
    name: 'Zeitdruck',
    type: 'zeitdruck' as const,
    description: 'Die Situation verschlimmert sich rapide.',
    effect: 'Nur 3 Tage Zeit oder Konsequenzen'
  },
  {
    id: 'moralisches-dilemma',
    name: 'Moralisches Dilemma',
    type: 'moral' as const,
    description: 'Die Lösung hat einen hohen Preis.',
    effect: 'Unschuldige könnten leiden'
  },
  {
    id: 'versteckte-agenda',
    name: 'Versteckte Agenda',
    type: 'agenda' as const,
    description: 'Nicht alle sind ehrlich.',
    effect: 'Questgeber hat eigene Ziele'
  },
  {
    id: 'konkurrenz',
    name: 'Konkurrenz',
    type: 'konkurrenz' as const,
    description: 'Andere wollen die Belohnung.',
    effect: 'Rivalisierendes Abenteurer-Team'
  }
]

// Ortsnamen-Komponenten
export const locationNameParts = {
  prefixes: [
    'Eisen', 'Wolfs', 'Grün', 'Alt', 'Neu', 'Schwarz', 'Rot', 'Weiß',
    'Stein', 'Gold', 'Silber', 'Kupfer', 'Eichen', 'Birken', 'Tannen',
    'Berg', 'Tal', 'Fluss', 'See', 'Moor', 'Wald', 'Hügel', 'Fels'
  ],
  suffixes: [
    'bach', 'heim', 'dorf', 'burg', 'tal', 'hof', 'furt', 'stadt',
    'haven', 'brück', 'moor', 'wald', 'feld', 'anger', 'rode', 'hain'
  ],
  features: [
    'am Wald', 'im Tal', 'am Fluss', 'am See', 'am Berg', 'an der Grenze',
    'am Handelsweg', 'im Moor', 'an der Furt', 'am Pass', 'im Hochland'
  ]
}