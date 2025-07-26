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
    // Bei Weltenbestie wird nur der STR-Bonus verdoppelt, nicht der gesamte STR-Wert
    if (age.id === 'weltenbestie') {
      const strBonus = strength - age.baseAttributes
      return age.baseLP + (strBonus * 2)
    }
    // Bei anderen Monstern wird der STR-Bonus normal addiert
    const strBonus = strength - age.baseAttributes
    return age.baseLP + strBonus
  }

  // Berechne SP basierend auf Alter und Willenskraft
  static calculateSP(age: MonsterAge, willpower: number): number {
    // SP-Formel verwendet nur den WIL-Bonus, nicht den gesamten WIL-Wert
    const wilBonus = willpower - age.baseAttributes
    return age.baseSP + (wilBonus * age.spMultiplier)
  }

  // Berechne Initiative
  static calculateInitiative(dexterity: number, logic: number, currentLP: number, maxLP: number): number {
    const base = 1 + dexterity + logic
    const lpPercent = currentLP / maxLP
    
    // Mali basierend auf verlorenen LP (max -15 für große Monster)
    let penalty = 0
    if (lpPercent < 0.75) penalty = -1
    if (lpPercent < 0.5) penalty = -3
    if (lpPercent < 0.25) penalty = -5
    
    // Große Monster haben höhere Mali-Grenzen
    if (maxLP >= 100 && lpPercent < 0.25) penalty = -15
    else if (maxLP >= 55 && lpPercent < 0.25) penalty = -10
    
    return Math.max(1, base + penalty)
  }

  // Berechne Angriff/Verteidigung
  static calculateAttackDefense(age: MonsterAge, dexterity: number): string {
    let diceCount = 3
    if (age.id === 'altehrwuerdig') diceCount = 4
    if (age.id === 'weltenbestie') diceCount = 5
    
    const modifier = dexterity * 2
    return `${diceCount}W6${modifier >= 0 ? '+' : ''}${modifier}`
  }

  // Verteile Fähigkeiten basierend auf Attributwerten
  static distributeAbilities(attributes: Record<MonsterAttribute['type'], number>): Record<MonsterAttribute['type'], number> {
    const distribution: Record<MonsterAttribute['type'], number> = {
      stärke: 0,
      geschick: 0,
      willenskraft: 0,
      logik: 0,
      mystik: 0
    }

    // Sortiere Attribute nach Wert (höchste zuerst)
    const sorted = Object.entries(attributes)
      .sort(([, a], [, b]) => b - a)

    // Verteile Fähigkeiten: 3, 2, 1, 1, 0
    const counts = [3, 2, 1, 1, 0]
    sorted.forEach(([attr, ], index) => {
      distribution[attr as MonsterAttribute['type']] = counts[index] || 0
    })

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
        name: 'Zerschmettern',
        attribute: 'stärke',
        cost: 5,
        effect: 'Mächtiger Flächenangriff gegen alle Gegner in Reichweite',
        exhaustion: true
      },
      geschick: {
        name: 'Blitzangriff',
        attribute: 'geschick',
        cost: 5,
        effect: 'Drei schnelle Angriffe in einer Runde',
        exhaustion: true
      },
      willenskraft: {
        name: 'Furchteinflößendes Brüllen',
        attribute: 'willenskraft',
        cost: 5,
        effect: 'Alle Gegner müssen Willenskraft-Probe bestehen oder fliehen',
        exhaustion: true
      },
      logik: {
        name: 'Taktischer Rückzug',
        attribute: 'logik',
        cost: 5,
        effect: 'Zieht sich zurück und erhält +4 auf Verteidigung für 2 Runden',
        exhaustion: true
      },
      mystik: {
        name: 'Mana-Explosion',
        attribute: 'mystik',
        cost: 5,
        effect: 'Entlädt Mana in einer Explosion (3W6 Schaden)',
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
    description?: string
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