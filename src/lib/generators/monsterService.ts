import type { 
  Monster, 
  MonsterAge, 
  MonsterAttribute,
  MonsterAbility,
  MonsterProperty,
  MonsterSpecialAction
} from '@/types/monster'
import { DiceService } from '@/lib/dice/diceService'
import { 
  getAbilityTableByAttribute
} from '@/data/tables/monsterTables'

export class MonsterService {
  // Berechne LP basierend auf Alter und Stärke
  static calculateLP(age: MonsterAge, strength: number): number {
    // WAIDH-Regel: LP = Basis-LP + STR-Wert
    // Bei Weltenbestie: LP = Basis-LP + (STR-Wert × 2)
    if (age.id === 'weltenbestie') {
      return age.baseLP + (strength * 2)
    }
    // Bei allen anderen Monstern: LP = Basis-LP + STR-Wert
    return age.baseLP + strength
  }

  // Berechne SP basierend auf Alter und Willenskraft
  static calculateSP(age: MonsterAge, willpower: number): number {
    // WAIDH-Regel: SP = Basis-SP + (WIL-Wert × Multiplikator)
    // Multiplikator: 3 für Jung bis Alt, 6 für Altehrwürdig/Weltenbestie
    return age.baseSP + (willpower * age.spMultiplier)
  }

  // Berechne Initiative
  static calculateInitiative(dexterity: number, logic: number, currentLP: number, maxLP: number): number {
    const base = 1 + dexterity + logic
    const missingLP = maxLP - currentLP
    
    // WAIDH-Regel: -1 pro fehlendem LP, aber maximal begrenzt
    let penalty = -missingLP
    
    // Maximale Mali nach Monster-Größe:
    // Altehrwürdig/Weltenbestie: max -15
    // Andere Monster: normale Mali ohne spezielle Begrenzung
    if (maxLP >= 55) {
      // Altehrwürdig (55+10=65 LP) oder Weltenbestie (100+15*2=130 LP)
      penalty = Math.max(-15, penalty)
    }
    
    return Math.max(1, base + penalty)
  }

  // Berechne Angriff/Verteidigung
  static calculateAttackDefense(age: MonsterAge, dexterity: number): string {
    let diceCount = 3
    // WAIDH-Regel: Altehrwürdig und Weltenbestie haben beide 4W6
    if (age.id === 'altehrwuerdig' || age.id === 'weltenbestie') {
      diceCount = 4
    }
    
    const modifier = dexterity * 2
    return `${diceCount}W6${modifier >= 0 ? '+' : ''}${modifier}`
  }

  // Verteile Fähigkeiten basierend auf Alter und Stärke/Schwäche
  static distributeAbilities(
    age: MonsterAge,
    _attributes: Record<MonsterAttribute['type'], number>,
    strengthAttr: MonsterAttribute['type'],
    weaknessAttr: MonsterAttribute['type']
  ): Record<MonsterAttribute['type'], number> {
    const distribution: Record<MonsterAttribute['type'], number> = {
      stärke: 0,
      geschick: 0,
      willenskraft: 0,
      logik: 0,
      mystik: 0
    }

    // Bestimme basierend auf Alter
    switch (age.id) {
      case 'jung':
      case '2jung':
        // Junge Monster: 1 Fähigkeit für gestärkte Attribute
        distribution[strengthAttr] = 1
        break
        
      case 'erwachsen':
        // Erwachsene Monster: 1 Fähigkeit für nicht geschwächte Attribute
        Object.keys(distribution).forEach(attr => {
          if (attr !== weaknessAttr) {
            distribution[attr as MonsterAttribute['type']] = 1
          }
        })
        break
        
      case 'alt':
        // Alte Monster: 2 für nicht geschwächte, 1 für geschwächte
        Object.keys(distribution).forEach(attr => {
          if (attr === weaknessAttr) {
            distribution[attr as MonsterAttribute['type']] = 1
          } else {
            distribution[attr as MonsterAttribute['type']] = 2
          }
        })
        break
        
      case 'altehrwuerdig':
        // Altehrwürdige: 3 für gestärkte, 1 für alle anderen
        Object.keys(distribution).forEach(attr => {
          if (attr === strengthAttr) {
            distribution[attr as MonsterAttribute['type']] = 3
          } else {
            distribution[attr as MonsterAttribute['type']] = 1
          }
        })
        break
        
      case 'weltenbestie':
        // Weltenbestien: 3 für jedes Attribut
        Object.keys(distribution).forEach(attr => {
          distribution[attr as MonsterAttribute['type']] = 3
        })
        break
    }

    return distribution
  }

  // Würfle Fähigkeiten für ein Attribut
  static rollAbilitiesForAttribute(
    attribute: MonsterAttribute['type'], 
    count: number,
    existingAbilities: MonsterAbility[] = []
  ): MonsterAbility[] {
    const table = getAbilityTableByAttribute(attribute)
    if (!table || count === 0) return []

    const abilities: MonsterAbility[] = []
    const usedIds = new Set(existingAbilities.map(a => a.id))

    for (let i = 0; i < count; i++) {
      let attempts = 0
      let ability: MonsterAbility | null = null

      // Versuche eine noch nicht gewählte Fähigkeit zu würfeln
      while (attempts < 20 && !ability) {
        const result = DiceService.rollOnTable(table)
        if (!usedIds.has(result.value.id)) {
          ability = result.value
          usedIds.add(ability.id)
        }
        attempts++
      }

      // Fallback: Nimm die erste noch nicht gewählte Fähigkeit
      if (!ability) {
        const available = table.entries
          .map(e => e.value)
          .find(a => !usedIds.has(a.id))
        if (available) {
          ability = available
          usedIds.add(ability.id)
        }
      }

      if (ability) {
        abilities.push(ability)
      }
    }

    return abilities
  }

  // Bestimme Spezial-Aktion basierend auf Stärke-Attribut
  static getSpecialAction(strengthAttribute: MonsterAttribute['type']): MonsterSpecialAction {
    const specialActions: Record<MonsterAttribute['type'], MonsterSpecialAction> = {
      stärke: {
        name: 'Gnadenloser Angriff',
        attribute: 'stärke',
        cost: 5,
        effect: 'Würfle Angriff mit +5. Bei Treffer: Schaden × 2. Ziel muss STR-Probe schaffen oder wird 5m weggeschleudert und liegt am Boden.',
        exhaustion: true
      },
      geschick: {
        name: 'Ausweichmanöver',
        attribute: 'geschick',
        cost: 5,
        effect: 'Nach Aktivierung für 3 Runden: Alle gegnerischen Angriffe -5. Monster kann trotzdem normal angreifen.',
        exhaustion: true
      },
      willenskraft: {
        name: 'Eisernen Willen',
        attribute: 'willenskraft',
        cost: 5,
        effect: 'Sofort: Heilt 30 SP. Für 3 Runden: Immun gegen mentale Effekte, geistigen Stress und Furcht.',
        exhaustion: true
      },
      logik: {
        name: 'Kaltblütiger Mord',
        attribute: 'logik',
        cost: 5,
        effect: 'Nächster Angriff: Automatischer Treffer mit Schaden × 3. Kann nur gegen Ziel mit ≤50% LP eingesetzt werden.',
        exhaustion: true
      },
      mystik: {
        name: 'Magie durchdringen',
        attribute: 'mystik',
        cost: 5,
        effect: 'Für 5 Runden: Ignoriert magische Verteidigung. Angriffe treffen trotz Schildzaubern, Schutzkreisen etc.',
        exhaustion: true
      }
    }

    return specialActions[strengthAttribute]
  }

  // Erstelle komplettes Monster
  static createMonster(
    age: MonsterAge,
    strengthAttr: MonsterAttribute['type'],
    weaknessAttr: MonsterAttribute['type'],
    strengthValue: number,
    weaknessValue: number,
    abilities: MonsterAbility[],
    properties: MonsterProperty[],
    name?: string,
    description?: string,
    diceRolls?: {
      age: number
      strength: number
      weakness: number
      properties: number[]
    }
  ): Monster {
    // Basis-Attribute (alle beim Alter-abhängigen Basiswert)
    const attributes: Record<MonsterAttribute['type'], number> = {
      stärke: age.baseAttributes,
      geschick: age.baseAttributes,
      willenskraft: age.baseAttributes,
      logik: age.baseAttributes,
      mystik: age.baseAttributes
    }

    // Wende Stärke und Schwäche an
    attributes[strengthAttr] += strengthValue
    attributes[weaknessAttr] -= weaknessValue

    // Berechne abgeleitete Werte
    const maxLp = this.calculateLP(age, attributes.stärke)
    const maxSp = this.calculateSP(age, attributes.willenskraft)
    const initiative = this.calculateInitiative(attributes.geschick, attributes.logik, maxLp, maxLp)
    const attackDefense = this.calculateAttackDefense(age, attributes.geschick)

    return {
      age,
      attributes,
      lp: maxLp,
      maxLp,
      sp: maxSp,
      maxSp,
      ap: age.baseAP,
      initiative,
      attack: attackDefense,
      defense: attackDefense,
      abilities,
      properties,
      specialAction: this.getSpecialAction(strengthAttr),
      diceRolls,
      name,
      description,
      createdAt: new Date()
    }
  }

  // Exportiere Monster als Text
  static exportAsText(monster: Monster): string {
    const lines: string[] = []
    
    lines.push(`=== ${monster.name || 'Unbenanntes Monster'} ===`)
    lines.push(`Alter: ${monster.age.name}`)
    if (monster.description) lines.push(`Beschreibung: ${monster.description}`)
    lines.push('')
    
    lines.push('ATTRIBUTE:')
    Object.entries(monster.attributes).forEach(([attr, value]) => {
      if (value !== 0) {
        lines.push(`${attr.charAt(0).toUpperCase() + attr.slice(1)}: ${value >= 0 ? '+' : ''}${value}`)
      }
    })
    lines.push('')
    
    lines.push('KAMPFWERTE:')
    lines.push(`LP: ${monster.lp}/${monster.maxLp}`)
    lines.push(`SP: ${monster.sp}/${monster.maxSp}`)
    lines.push(`AP: ${monster.ap}`)
    lines.push(`Initiative: ${monster.initiative}`)
    lines.push(`Angriff: ${monster.attack}`)
    lines.push(`Verteidigung: ${monster.defense}`)
    lines.push('')
    
    if (monster.abilities.length > 0) {
      lines.push('FÄHIGKEITEN:')
      monster.abilities.forEach(ability => {
        lines.push(`- ${ability.name} (${ability.attribute}): ${ability.effect}`)
      })
      lines.push('')
    }
    
    lines.push('SPEZIAL-AKTION:')
    lines.push(`${monster.specialAction.name} (${monster.specialAction.cost} AP)`)
    lines.push(`Effekt: ${monster.specialAction.effect}`)
    if (monster.specialAction.exhaustion) {
      lines.push('Verursacht ERSCHÖPFUNG')
    }
    lines.push('')
    
    if (monster.properties.length > 0) {
      lines.push('EIGENSCHAFTEN:')
      monster.properties.forEach(prop => {
        lines.push(`- ${prop.name}: ${prop.effect}`)
      })
    }
    
    return lines.join('\n')
  }

  // Exportiere Monster als JSON
  static exportAsJSON(monster: Monster): string {
    return JSON.stringify(monster, null, 2)
  }
}