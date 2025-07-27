import type { DiceTable } from '@/types/dice'
import type { SchicksalResult, SchicksalKontext } from '@/types/schicksal'

// Schicksals-Tabelle (1W6)
export const schicksalTable: DiceTable<SchicksalResult> = {
  id: 'schicksal',
  name: 'Schicksalswurf',
  diceType: '1d6',
  entries: [
    {
      range: 1,
      value: {
        id: 'katastrophe',
        name: 'KATASTROPHE',
        beschreibung: 'Das Schlimmste tritt ein - sofort und unabwendbar',
        detailBeschreibung: 'Die Situation verschlechtert sich dramatisch und die Charaktere sind direkt betroffen. Es gibt keine Vorwarnung und keine Möglichkeit zur Vorbereitung.',
        effekt: 'Sofortige dramatische Verschlechterung ohne Vorwarnung'
      }
    },
    {
      range: 2,
      value: {
        id: 'desaster',
        name: 'DESASTER',
        beschreibung: 'Ein schwerwiegendes Problem kündigt sich an',
        detailBeschreibung: 'Die Situation wird sich verschlechtern, aber es gibt eine kurze Vorwarnzeit. Mit schnellem Handeln könnte das Schlimmste noch vermieden werden.',
        effekt: 'Verschlechterung mit kurzer Vorbereitungszeit'
      }
    },
    {
      range: 3,
      value: {
        id: 'krise',
        name: 'KRISE',
        beschreibung: 'Ein Problem mit versteckter Chance',
        detailBeschreibung: 'Das Problem verschlimmert sich, aber die Charaktere haben Zeit zur Vorbereitung. Bei erfolgreicher Bewältigung ergibt sich ein Vorteil.',
        effekt: 'Problem + Opportunity bei Bewältigung'
      }
    },
    {
      range: 4,
      value: {
        id: 'zufall',
        name: 'ZUFALL',
        beschreibung: 'Eine unerwartete Wendung mit Potential',
        detailBeschreibung: 'Die Situation verschärft sich, aber es eröffnet sich ein neuer Lösungsweg. Dieser ist nicht einfach, aber effektiv.',
        effekt: 'Verschärfung + neuer Lösungsweg'
      }
    },
    {
      range: 5,
      value: {
        id: 'zwischenfall',
        name: 'ZWISCHENFALL',
        beschreibung: 'Ein temporäres Hindernis',
        detailBeschreibung: 'Ein temporäres Nebenproblem tritt auf, das nicht direkt mit der Quest zusammenhängt. Die Lösung führt zu einer besseren Position.',
        effekt: 'Temporäres Problem mit positivem Ausgang'
      }
    },
    {
      range: 6,
      value: {
        id: 'gluecksstraehne',
        name: 'GLÜCKSSTRÄHNE',
        beschreibung: 'Das Schicksal lächelt',
        detailBeschreibung: 'Eine neue oder bessere Lösung zeigt sich. Diese Gelegenheit ist zeitlich begrenzt, bringt aber keine Nachteile wenn sie ignoriert wird.',
        effekt: 'Neue/bessere Lösung ohne Nachteile'
      }
    }
  ]
}

// Kontext-spezifische Beispiele
export const schicksalBeispiele: Record<SchicksalKontext, Record<string, string[]>> = {
  kampf: {
    katastrophe: [
      'Verstärkung für die Gegner trifft ein - doppelte Anzahl!',
      'Eine kritische Waffe zerbricht im schlimmsten Moment',
      'Der Boden gibt nach - alle stürzen eine Ebene tiefer',
      'Ein weiteres Monster wird vom Kampflärm angelockt'
    ],
    desaster: [
      'Feinde rufen um Hilfe - Verstärkung in 3 Runden',
      'Die Fluchtroute wird abgeschnitten',
      'Ein Feuer bricht aus und breitet sich aus',
      'Die Deckung bricht zusammen'
    ],
    krise: [
      'Gegner ziehen sich zurück, aber blockieren den Ausgang',
      'Waffen der Feinde sind vergiftet - aber heilbar',
      'Der Kampf lockt die Stadtwache an',
      'Ein neutraler Dritter mischt sich ein'
    ],
    zufall: [
      'Ein Gegner wechselt die Seiten - unter Bedingungen',
      'Eine versteckte Waffe oder Rüstung wird sichtbar',
      'Der Kampf offenbart einen Geheimgang',
      'Ein Unbeteiligter bietet Hilfe gegen Gefallen'
    ],
    zwischenfall: [
      'Ein Händler unterbricht und bietet Heiltränke',
      'Schaulustige behindern beide Seiten',
      'Ein Tier läuft durch den Kampf',
      'Nebel zieht auf und behindert die Sicht'
    ],
    gluecksstraehne: [
      'Die Gegner fliehen grundlos in Panik',
      'Eine Kiste mit Heiltränken wird entdeckt',
      'Verbündete erscheinen unerwartet',
      'Die Sonne blendet nur die Gegner'
    ]
  },
  
  erkundung: {
    katastrophe: [
      'Der Boden gibt nach - Sturz in eine Grube',
      'Eine Falle löst aus und versiegelt den Bereich',
      'Ein schlafendes Monster erwacht wütend',
      'Giftgas strömt aus versteckten Öffnungen'
    ],
    desaster: [
      'Der Rückweg beginnt einzustürzen',
      'Wasser steigt schnell an',
      'Eine Horde kleinerer Monster nähert sich',
      'Die Fackeln erlöschen - Finsternis droht'
    ],
    krise: [
      'Eine verschlossene Tür blockiert den Weg',
      'Der Kompass spielt verrückt - Orientierung verloren',
      'Vorräte sind kontaminiert, aber es gibt Kräuter',
      'Ein Labyrinth offenbart sich'
    ],
    zufall: [
      'Ein alter Wegweiser zeigt Abkürzung - aber gefährlich',
      'Spuren führen zu verstecktem Schatz und Gefahr',
      'Ein verlassenes Lager mit Hinweisen',
      'Echos verraten geheime Räume'
    ],
    zwischenfall: [
      'Ein verirrter Händler kreuzt den Weg',
      'Harmlose Tiere blockieren den Pfad',
      'Ein alter Einsiedler erzählt Geschichten',
      'Schönes Wetter lädt zur Rast ein'
    ],
    gluecksstraehne: [
      'Eine Abkürzung offenbart sich',
      'Frische Vorräte werden gefunden',
      'Ein hilfreicher Wegweiser taucht auf',
      'Perfekte Wetterbedingungen'
    ]
  },
  
  sozial: {
    katastrophe: [
      'Eine tödliche Beleidigung wird ausgesprochen',
      'Die Wachen werden alarmiert',
      'Ein Missverständnis eskaliert zur Fehde',
      'Wichtige Verbündete wenden sich ab'
    ],
    desaster: [
      'Das Gespräch wird belauscht von Feinden',
      'Eine Lüge fliegt auf',
      'Der Gesprächspartner ist betrunken und unberechenbar',
      'Kulturelle Tabus werden gebrochen'
    ],
    krise: [
      'Bestechung wird gefordert, aber nachvollziehbar',
      'Ein Duell wird gefordert - mit Regeln',
      'Geheimnisse werden verlangt',
      'Ein Test der Loyalität'
    ],
    zufall: [
      'Ein Rivale des Gegenübers erscheint',
      'Kompromittierendes Material taucht auf',
      'Ein gemeinsamer Feind wird erkannt',
      'Alte Schulden können beglichen werden'
    ],
    zwischenfall: [
      'Ein Missverständnis sorgt für Lacher',
      'Das Gespräch wird von Kindern unterbrochen',
      'Ein Fest beginnt',
      'Jemand verwechselt die Charaktere'
    ],
    gluecksstraehne: [
      'Der Gegenüber ist außergewöhnlich großzügig',
      'Ein einflussreicher Gönner zeigt Interesse',
      'Wertvolle Information wird preisgegeben',
      'Eine Einladung zu wichtigem Ereignis'
    ]
  },
  
  magie: {
    katastrophe: [
      'Zauber schlägt fehl und trifft Verbündete',
      'Magisches Artefakt explodiert',
      'Dämon wird herbeigerufen',
      'Fluch breitet sich aus'
    ],
    desaster: [
      'Mana-Sturm zieht auf',
      'Zauber wirkt, aber unkontrolliert',
      'Magische Barriere versagt',
      'Verwandlung beginnt'
    ],
    krise: [
      'Zauber fordert unerwarteten Preis',
      'Magische Interferenz stört alle Zauber',
      'Konkurrierender Magier mischt sich ein',
      'Ritual muss verlängert werden'
    ],
    zufall: [
      'Unbekannter Zauber wird zugänglich',
      'Magische Resonanz verstärkt Effekte',
      'Verborgenes magisches Wissen',
      'Elementargeist bietet Handel an'
    ],
    zwischenfall: [
      'Harmlose magische Nebenwirkungen',
      'Magisches Tier erscheint neugierig',
      'Zauber erzeugt hübsche Lichteffekte',
      'Telepathische Verbindung entsteht kurz'
    ],
    gluecksstraehne: [
      'Zauber gelingt perfekt mit Bonus',
      'Verlorenes magisches Artefakt gefunden',
      'Mana-Quelle entdeckt',
      'Segen eines Elementars'
    ]
  },
  
  reise: {
    katastrophe: [
      'Brücke stürzt ein beim Überqueren',
      'Räuberbande umzingelt die Gruppe',
      'Erdrutsch blockiert beide Richtungen',
      'Reittiere werden krank oder sterben'
    ],
    desaster: [
      'Unwetter zieht auf - Sturm droht',
      'Vorräte sind verdorben',
      'Verfolger holen auf',
      'Orientierung komplett verloren'
    ],
    krise: [
      'Wegzoll wird verlangt - hoch aber berechtigt',
      'Umweg nötig wegen Gefahr',
      'Rastplatz ist besetzt',
      'Fluss ist angeschwollen'
    ],
    zufall: [
      'Reisende mit gleichen Ziel aber eigener Agenda',
      'Abkürzung durch gefährliches Gebiet',
      'Verlassenes Lager mit Spuren',
      'Karawane bietet Mitreise'
    ],
    zwischenfall: [
      'Rad bricht aber Ersatz ist findbar',
      'Freundliche Bauern laden zur Rast',
      'Seltene Tiere kreuzen den Weg',
      'Wanderzirkus unterhält'
    ],
    gluecksstraehne: [
      'Perfektes Reisewetter beschleunigt',
      'Gastfreundschaft in edlem Haus',
      'Verlorener Gegenstand am Wegesrand',
      'Göttlicher Wind in die richtige Richtung'
    ]
  },
  
  allgemein: {
    katastrophe: [
      'Das Hauptziel wird unmöglich',
      'Verrat aus den eigenen Reihen',
      'Krankheit befällt die Gruppe',
      'Wichtige Ausrüstung wird zerstört'
    ],
    desaster: [
      'Zeitdruck verschärft sich dramatisch',
      'Ressourcen gehen zur Neige',
      'Ruf der Gruppe wird geschädigt',
      'Konkurrenten kommen zuvor'
    ],
    krise: [
      'Moralisches Dilemma spaltet die Gruppe',
      'Hilfe ist möglich aber teuer',
      'Wichtige Information fehlt noch',
      'Alte Schuld wird eingefordert'
    ],
    zufall: [
      'Unerwarteter Verbündeter mit Eigeninteresse',
      'Alternative Lösung mit Risiken',
      'Geheimnis wird aufgedeckt',
      'Macht-Vakuum entsteht'
    ],
    zwischenfall: [
      'Missverständnis sorgt für Verzögerung',
      'Lokales Fest behindert Pläne',
      'Bürokratie verlangsamt Fortschritt',
      'Wetter erzwingt Pause'
    ],
    gluecksstraehne: [
      'Unerwartete Hilfe ohne Gegenleistung',
      'Problem löst sich von selbst',
      'Glücklicher Zufall hilft weiter',
      'Inspiration führt zu besserer Lösung'
    ]
  }
}