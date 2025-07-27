import type { NSCArchetyp } from '@/types/nsc'

// NSC Archetypen nach Art
export const körperlicheArchetypen: NSCArchetyp[] = [
  {
    id: 'stadtwache',
    name: 'Stadtwache',
    beschreibung: 'Einfache Wache für Siedlungen',
    waffen: ['Speer', 'Kurzschwert'],
    rüstung: 'Leichte Rüstung',
    verhaltensTemplate: 'Pflichtbewusst, misstrauisch gegenüber Fremden'
  },
  {
    id: 'soeldner',
    name: 'Söldner',
    beschreibung: 'Kampferfahrener Krieger',
    waffen: ['Langschwert', 'Armbrust'],
    rüstung: 'Mittlere Rüstung',
    spezialAusrüstung: ['Heiltrank'],
    verhaltensTemplate: 'Pragmatisch, loyal zum Zahler'
  },
  {
    id: 'bandit',
    name: 'Bandit',
    beschreibung: 'Gesetzloser Wegelagerer',
    waffen: ['Keule', 'Kurzbogen'],
    rüstung: 'Lederrüstung',
    verhaltensTemplate: 'Feige, gierig, flieht bei Unterlegenheit'
  },
  {
    id: 'schlaeger',
    name: 'Schläger',
    beschreibung: 'Brutaler Nahkämpfer',
    waffen: ['Fäuste', 'Schlagring'],
    verhaltensTemplate: 'Aggressiv, einschüchternd'
  },
  {
    id: 'jaeger',
    name: 'Jäger',
    beschreibung: 'Kundschafter und Spurenleser',
    waffen: ['Jagdbogen', 'Jagdmesser'],
    rüstung: 'Pelzkleidung',
    spezialAusrüstung: ['Fallen', 'Seil'],
    verhaltensTemplate: 'Vorsichtig, naturverbunden'
  }
]

export const geistigeArchetypen: NSCArchetyp[] = [
  {
    id: 'gelehrter',
    name: 'Gelehrter',
    beschreibung: 'Wissensdurstiger Akademiker',
    waffen: ['Wanderstab'],
    spezialAusrüstung: ['Bücher', 'Schreibzeug'],
    verhaltensTemplate: 'Neugierig, besserwisserisch'
  },
  {
    id: 'haendler',
    name: 'Händler',
    beschreibung: 'Geschäftstüchtiger Kaufmann',
    waffen: ['Dolch'],
    spezialAusrüstung: ['Waage', 'Geldbeutel'],
    verhaltensTemplate: 'Freundlich, berechnend, verhandlungsbereit'
  },
  {
    id: 'spion',
    name: 'Spion',
    beschreibung: 'Meister der Täuschung',
    waffen: ['Versteckter Dolch', 'Giftnadel'],
    spezialAusrüstung: ['Verkleidung', 'Lockpicks'],
    verhaltensTemplate: 'Unauffällig, aufmerksam, misstrauisch'
  },
  {
    id: 'diplomat',
    name: 'Diplomat',
    beschreibung: 'Geschickter Unterhändler',
    waffen: ['Zeremoniendolch'],
    rüstung: 'Edle Kleidung',
    verhaltensTemplate: 'Höflich, manipulativ, kompromissbereit'
  },
  {
    id: 'schreiber',
    name: 'Schreiber',
    beschreibung: 'Buchhalter und Kopist',
    waffen: ['Federmesser'],
    spezialAusrüstung: ['Pergament', 'Tinte'],
    verhaltensTemplate: 'Pedantisch, ängstlich'
  }
]

export const mystischeArchetypen: NSCArchetyp[] = [
  {
    id: 'zauberlehrling',
    name: 'Zauberlehrling',
    beschreibung: 'Unerfahrener Magieanwender',
    waffen: ['Zauberstab'],
    spezialAusrüstung: ['Zauberbuch', 'Komponenten'],
    verhaltensTemplate: 'Übereifrig, unvorsichtig'
  },
  {
    id: 'priester',
    name: 'Priester',
    beschreibung: 'Diener der Götter',
    waffen: ['Heiliges Symbol'],
    rüstung: 'Priesterrobe',
    spezialAusrüstung: ['Weihwasser', 'Gebetsbuch'],
    verhaltensTemplate: 'Fromm, dogmatisch'
  },
  {
    id: 'hexer',
    name: 'Hexer',
    beschreibung: 'Wilder Magiewirker',
    waffen: ['Knorriger Stab', 'Ritualdolch'],
    spezialAusrüstung: ['Kräuter', 'Tierknochen'],
    verhaltensTemplate: 'Unberechenbar, naturverbunden'
  },
  {
    id: 'kultist',
    name: 'Kultist',
    beschreibung: 'Fanatischer Anhänger',
    waffen: ['Opferdolch'],
    rüstung: 'Kultistenrobe',
    spezialAusrüstung: ['Unheiliges Symbol'],
    verhaltensTemplate: 'Fanatisch, verschwiegen'
  },
  {
    id: 'wahrsager',
    name: 'Wahrsager',
    beschreibung: 'Seher der Zukunft',
    waffen: ['Kristallkugel'],
    spezialAusrüstung: ['Tarotkarten', 'Weihrauch'],
    verhaltensTemplate: 'Mysteriös, kryptisch'
  }
]

// Alle Archetypen nach Art gruppiert
export const archetypenNachArt = {
  körperlich: körperlicheArchetypen,
  geistig: geistigeArchetypen,
  mystisch: mystischeArchetypen
}

// Waffen-Datenbank
export const waffenDatenbank = {
  // Nahkampfwaffen
  'Fäuste': { schaden: '1W6', reichweite: 'Nahkampf' },
  'Schlagring': { schaden: '1W6+1', reichweite: 'Nahkampf' },
  'Dolch': { schaden: '1W6+1', reichweite: 'Nahkampf' },
  'Kurzschwert': { schaden: '1W6+2', reichweite: 'Nahkampf' },
  'Langschwert': { schaden: '1W6+3', reichweite: 'Nahkampf' },
  'Speer': { schaden: '1W6+2', reichweite: 'Nahkampf' },
  'Keule': { schaden: '1W6+2', reichweite: 'Nahkampf' },
  'Wanderstab': { schaden: '1W6', reichweite: 'Nahkampf' },
  'Zauberstab': { schaden: '1W6', reichweite: 'Nahkampf' },
  'Knorriger Stab': { schaden: '1W6+1', reichweite: 'Nahkampf' },
  'Ritualdolch': { schaden: '1W6+1', reichweite: 'Nahkampf' },
  'Opferdolch': { schaden: '1W6+2', reichweite: 'Nahkampf' },
  'Jagdmesser': { schaden: '1W6+1', reichweite: 'Nahkampf' },
  'Zeremoniendolch': { schaden: '1W6', reichweite: 'Nahkampf' },
  'Federmesser': { schaden: '1W6-1', reichweite: 'Nahkampf' },
  'Heiliges Symbol': { schaden: '1W6', reichweite: 'Nahkampf' },
  'Versteckter Dolch': { schaden: '1W6+1', reichweite: 'Nahkampf' },
  'Kristallkugel': { schaden: '1W6', reichweite: 'Nahkampf' },
  
  // Fernkampfwaffen
  'Kurzbogen': { schaden: '1W6+1', reichweite: '30m' },
  'Jagdbogen': { schaden: '1W6+2', reichweite: '40m' },
  'Armbrust': { schaden: '1W6+3', reichweite: '50m' },
  'Giftnadel': { schaden: '1', reichweite: '5m', spezial: 'Gift' }
}

// Rüstungs-Datenbank
export const rüstungsDatenbank = {
  'Keine Rüstung': { schutz: 0 },
  'Pelzkleidung': { schutz: 1 },
  'Lederrüstung': { schutz: 2 },
  'Leichte Rüstung': { schutz: 3 },
  'Mittlere Rüstung': { schutz: 4 },
  'Priesterrobe': { schutz: 0 },
  'Kultistenrobe': { schutz: 0 },
  'Edle Kleidung': { schutz: 0 }
}

// Namen-Generator Listen
export const namenListen = {
  männlich: [
    'Aldric', 'Brom', 'Cedric', 'Doran', 'Erik', 'Finn', 'Gareth', 'Harald',
    'Ivan', 'Jorik', 'Klaus', 'Lars', 'Magnus', 'Nils', 'Olaf', 'Peder',
    'Ragnar', 'Sven', 'Torben', 'Ulrich', 'Viktor', 'Wilhelm', 'Yorik', 'Zoran'
  ],
  weiblich: [
    'Astrid', 'Brigitte', 'Clara', 'Dagmar', 'Elsa', 'Freya', 'Greta', 'Helga',
    'Ingrid', 'Johanna', 'Karin', 'Lena', 'Marta', 'Nora', 'Olga', 'Petra',
    'Rosa', 'Sigrid', 'Tilda', 'Ursula', 'Vera', 'Wilma', 'Ylva', 'Zelda'
  ],
  nachnamen: [
    'Eisenfaust', 'Sturmbringer', 'Waldläufer', 'Steinbrecher', 'Flammenzunge',
    'Schattenweber', 'Donnerschlag', 'Frostbart', 'Goldschmied', 'Schwertträger',
    'von Altburg', 'aus Neustadt', 'der Kühne', 'der Weise', 'Rotmantel'
  ]
}

// Persönlichkeits-Eigenschaften
export const persönlichkeitsEigenschaften = {
  positiv: [
    'mutig', 'ehrlich', 'loyal', 'hilfsbereit', 'geduldig', 'weise',
    'freundlich', 'humorvoll', 'aufmerksam', 'fleißig', 'optimistisch'
  ],
  negativ: [
    'feige', 'gierig', 'misstrauisch', 'faul', 'arrogant', 'jähzornig',
    'neidisch', 'rachsüchtig', 'verbittert', 'zynisch', 'rücksichtslos'
  ],
  neutral: [
    'vorsichtig', 'pragmatisch', 'schweigsam', 'neugierig', 'skeptisch',
    'traditionell', 'unabhängig', 'pflichtbewusst', 'zurückhaltend'
  ]
}