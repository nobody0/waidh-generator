import type { NSC, NSCArt, NSCAttribute, NSCArchetyp, NSCGruppe } from '@/types/nsc'
import { NSC_FORMELN } from '@/types/nsc'
import { 
  archetypenNachArt, 
  waffenDatenbank, 
  rüstungsDatenbank, 
  namenListen,
  persönlichkeitsEigenschaften 
} from '@/data/tables/nscTables'

export class NSCService {
  // Erstelle einen einzelnen NSC
  static createNSC(
    art: NSCArt,
    stufe: number,
    archetyp?: NSCArchetyp,
    name?: string
  ): NSC {
    // Berechne Attribute basierend auf Art
    const attribute = this.calculateAttributes(art, stufe)
    
    // Berechne abgeleitete Werte
    const lp = NSC_FORMELN.lp(stufe)
    const sp = NSC_FORMELN.sp(stufe)
    const ap = NSC_FORMELN.ap(stufe)
    const initiative = NSC_FORMELN.initiative(stufe)
    
    // Kampfwerte basierend auf Attributen
    const geschickBonus = attribute.geschick * 2
    const angriff = `3W6+${geschickBonus}`
    const verteidigung = `3W6+${geschickBonus}`
    
    // Wähle Archetyp wenn nicht vorgegeben
    if (!archetyp) {
      archetyp = this.randomArchetyp(art)
    }
    
    // Bestimme Schaden basierend auf Hauptwaffe
    const hauptwaffe = archetyp.waffen[0]
    const waffenInfo = waffenDatenbank[hauptwaffe as keyof typeof waffenDatenbank]
    const schaden = waffenInfo?.schaden || '1W6'
    
    // Generiere Name wenn nicht vorgegeben
    if (!name) {
      name = this.generateName()
    }
    
    // Generiere Persönlichkeit
    const persönlichkeit = this.generatePersonality()
    
    return {
      art,
      stufe,
      name,
      archetyp,
      attribute,
      lp,
      maxLp: lp,
      sp,
      maxSp: sp,
      ap,
      initiative,
      angriff,
      verteidigung,
      schaden,
      waffen: archetyp.waffen,
      rüstung: archetyp.rüstung,
      ausrüstung: archetyp.spezialAusrüstung || [],
      persönlichkeit,
      createdAt: new Date()
    }
  }
  
  // Berechne Attribute basierend auf Art
  static calculateAttributes(art: NSCArt, stufe: number): NSCAttribute {
    const primärBonus = NSC_FORMELN.attributBonus(stufe, true)
    const sekundärBonus = NSC_FORMELN.attributBonus(stufe, false)
    
    // Basis-Attribute mit Sekundärbonus
    const attribute: NSCAttribute = {
      stärke: sekundärBonus,
      geschick: sekundärBonus,
      willenskraft: sekundärBonus,
      logik: sekundärBonus,
      mystik: sekundärBonus
    }
    
    // Setze Primärattribute basierend auf Art
    switch (art) {
      case 'körperlich':
        attribute.stärke = primärBonus
        attribute.geschick = primärBonus
        break
      case 'geistig':
        attribute.logik = primärBonus
        attribute.willenskraft = primärBonus
        break
      case 'mystisch':
        attribute.mystik = primärBonus
        break
    }
    
    return attribute
  }
  
  // Wähle zufälligen Archetyp für Art
  static randomArchetyp(art: NSCArt): NSCArchetyp {
    const archetypen = archetypenNachArt[art]
    return archetypen[Math.floor(Math.random() * archetypen.length)]
  }
  
  // Generiere zufälligen Namen
  static generateName(): string {
    const istMännlich = Math.random() < 0.5
    const vornamen = istMännlich ? namenListen.männlich : namenListen.weiblich
    const vorname = vornamen[Math.floor(Math.random() * vornamen.length)]
    
    // 50% Chance für Nachnamen
    if (Math.random() < 0.5) {
      const nachname = namenListen.nachnamen[Math.floor(Math.random() * namenListen.nachnamen.length)]
      return `${vorname} ${nachname}`
    }
    
    return vorname
  }
  
  // Generiere Persönlichkeit
  static generatePersonality(): string {
    const eigenschaften: string[] = []
    
    // 1-2 positive Eigenschaften
    const anzahlPositiv = Math.random() < 0.5 ? 1 : 2
    for (let i = 0; i < anzahlPositiv; i++) {
      const eigenschaft = persönlichkeitsEigenschaften.positiv[
        Math.floor(Math.random() * persönlichkeitsEigenschaften.positiv.length)
      ]
      if (!eigenschaften.includes(eigenschaft)) {
        eigenschaften.push(eigenschaft)
      }
    }
    
    // 0-1 negative Eigenschaften
    if (Math.random() < 0.6) {
      const eigenschaft = persönlichkeitsEigenschaften.negativ[
        Math.floor(Math.random() * persönlichkeitsEigenschaften.negativ.length)
      ]
      eigenschaften.push(eigenschaft)
    }
    
    // 1 neutrale Eigenschaft
    const neutraleEigenschaft = persönlichkeitsEigenschaften.neutral[
      Math.floor(Math.random() * persönlichkeitsEigenschaften.neutral.length)
    ]
    eigenschaften.push(neutraleEigenschaft)
    
    return eigenschaften.join(', ')
  }
  
  // Erstelle eine Gruppe von NSCs
  static createNSCGruppe(
    art: NSCArt,
    stufe: number,
    anzahl: number,
    gruppenName?: string,
    archetyp?: NSCArchetyp
  ): NSCGruppe {
    const mitglieder: NSC[] = []
    
    // Erstelle einzelne Mitglieder
    for (let i = 0; i < anzahl; i++) {
      const nsc = this.createNSC(art, stufe, archetyp)
      mitglieder.push(nsc)
    }
    
    // Generiere Gruppennamen wenn nicht vorgegeben
    if (!gruppenName) {
      gruppenName = this.generateGruppenName(art, archetyp || mitglieder[0].archetyp)
    }
    
    return {
      name: gruppenName,
      art,
      stufe,
      anzahl,
      mitglieder,
      gruppenbeschreibung: this.generateGruppenBeschreibung(art, archetyp || mitglieder[0].archetyp)
    }
  }
  
  // Generiere Gruppennamen
  static generateGruppenName(art: NSCArt, archetyp?: NSCArchetyp): string {
    const präfixe = {
      körperlich: ['Die Eisernen', 'Die Blutigen', 'Die Wilden', 'Die Starken'],
      geistig: ['Die Schlauen', 'Die Listigen', 'Die Weisen', 'Die Gelehrten'],
      mystisch: ['Die Arkanen', 'Die Verborgenen', 'Die Mystischen', 'Die Verhexten']
    }
    
    const suffix = archetyp ? archetyp.name + 'n' : 'Schergen'
    const präfix = präfixe[art][Math.floor(Math.random() * präfixe[art].length)]
    
    return `${präfix} ${suffix}`
  }
  
  // Generiere Gruppenbeschreibung
  static generateGruppenBeschreibung(art: NSCArt, archetyp?: NSCArchetyp): string {
    const beschreibungen = {
      körperlich: 'Eine kampferprobte Gruppe, die ihre Stärke in Zahlen sucht.',
      geistig: 'Ein organisierter Trupp, der mit List und Taktik vorgeht.',
      mystisch: 'Eine mysteriöse Vereinigung mit unergründlichen Zielen.'
    }
    
    let beschreibung = beschreibungen[art]
    if (archetyp?.verhaltensTemplate) {
      beschreibung += ` ${archetyp.verhaltensTemplate}.`
    }
    
    return beschreibung
  }
  
  // Export als Kampfkarte
  static exportKampfkarte(nsc: NSC): string {
    const rüstungsSchutz = nsc.rüstung 
      ? rüstungsDatenbank[nsc.rüstung as keyof typeof rüstungsDatenbank]?.schutz || 0
      : 0
      
    return `
=== ${nsc.name || 'Unbenannter NSC'} ===
${nsc.archetyp?.name || 'NSC'} (Stufe ${nsc.stufe})

LP: ${nsc.lp}/${nsc.maxLp} | SP: ${nsc.sp}/${nsc.maxSp} | AP: ${nsc.ap}
Initiative: ${nsc.initiative}

Angriff: ${nsc.angriff} | Schaden: ${nsc.schaden}
Verteidigung: ${nsc.verteidigung} | Rüstung: ${rüstungsSchutz}

Attribute:
STR ${nsc.attribute.stärke} | GES ${nsc.attribute.geschick} | WIL ${nsc.attribute.willenskraft}
LOG ${nsc.attribute.logik} | MYS ${nsc.attribute.mystik}

Ausrüstung: ${nsc.waffen.join(', ')}
${nsc.persönlichkeit ? `Persönlichkeit: ${nsc.persönlichkeit}` : ''}
    `.trim()
  }
  
  // Export Gruppe als Kampfkarte
  static exportGruppeKampfkarte(gruppe: NSCGruppe): string {
    let karte = `=== ${gruppe.name} ===\n`
    karte += `${gruppe.anzahl}x ${gruppe.mitglieder[0].archetyp?.name || 'NSCs'} (Stufe ${gruppe.stufe})\n`
    karte += `${gruppe.gruppenbeschreibung || ''}\n\n`
    
    // Liste einzelne Mitglieder
    gruppe.mitglieder.forEach((nsc, index) => {
      karte += `--- ${nsc.name || `Mitglied ${index + 1}`} ---\n`
      karte += `LP: ${nsc.lp}/${nsc.maxLp} | SP: ${nsc.sp}/${nsc.maxSp} | Initiative: ${nsc.initiative}\n`
      karte += `Angriff: ${nsc.angriff} | Schaden: ${nsc.schaden}\n\n`
    })
    
    return karte.trim()
  }
}