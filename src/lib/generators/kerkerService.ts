import type {
  KerkerElementar,
  KerkerTheme,
  GuardLevel,
  KerkerEnvironment,
  Chamber,
  ChamberProtection,
  ChamberTreasure,
  Guard,
  Trap,
  CoreSpellContent
} from '@/types/kerker'
import { DiceService } from '@/lib/dice/diceService'
import { generateTrapForTheme } from '@/data/tables/kerkerTables'

export class KerkerService {
  // Erstelle Wächter basierend auf Level und Anzahl
  static createGuards(
    count: number,
    level: 'low' | 'medium' | 'high',
    guardLevels: GuardLevel,
    theme: KerkerTheme
  ): Guard[] {
    const guards: Guard[] = []
    
    // Bestimme Level-Bereich basierend auf Kategorie
    let minLevel: number, maxLevel: number
    switch (level) {
      case 'low':
        minLevel = guardLevels.minLevel
        maxLevel = Math.floor(guardLevels.minLevel + (guardLevels.maxLevel - guardLevels.minLevel) * 0.33)
        break
      case 'medium':
        minLevel = Math.floor(guardLevels.minLevel + (guardLevels.maxLevel - guardLevels.minLevel) * 0.33)
        maxLevel = Math.floor(guardLevels.minLevel + (guardLevels.maxLevel - guardLevels.minLevel) * 0.66)
        break
      case 'high':
        minLevel = Math.floor(guardLevels.minLevel + (guardLevels.maxLevel - guardLevels.minLevel) * 0.66)
        maxLevel = guardLevels.maxLevel
        break
    }

    for (let i = 0; i < count; i++) {
      const guardLevel = DiceService.rollBetween(minLevel, maxLevel)
      guards.push({
        id: `guard-${Date.now()}-${i}`,
        level: guardLevel,
        type: `${theme.name}-Wächter`,
        hp: 10 + guardLevel,
        sp: 15 + (guardLevel * 3),
        initiative: 3 + guardLevel,
        ap: guardLevel <= 7 ? 6 : 7
      })
    }

    return guards
  }

  // Berechne Wächter-Anzahl basierend auf Protection-Typ
  static calculateGuardCount(protection: ChamberProtection, subRoll?: number): number {
    if (!subRoll) {
      // Führe Sub-Würfe basierend auf Protection-ID durch
      switch (protection.id) {
        case 'few-high':
          return Math.max(0, DiceService.roll('1d6').total - 3)
        case 'low-hidden-trap':
          return Math.max(1, DiceService.roll('1d6').total - 2)
        case 'low-obvious-traps':
          return Math.max(1, DiceService.roll('1d6').total - 3)
        case 'many-low':
          return Math.max(2, DiceService.roll('1d6').total + 1)
        case 'few-medium':
          return Math.max(1, DiceService.roll('1d6').total - 3)
        case 'boss':
          return DiceService.roll('1d2').total
        default:
          return protection.guardCount
      }
    }
    
    // Verwende übergebenen Sub-Roll
    switch (protection.id) {
      case 'few-high':
        return Math.max(0, subRoll - 3)
      case 'low-hidden-trap':
        return Math.max(1, subRoll - 2)
      case 'low-obvious-traps':
        return Math.max(1, subRoll - 3)
      case 'many-low':
        return Math.max(2, subRoll + 1)
      case 'few-medium':
        return Math.max(1, subRoll - 3)
      case 'boss':
        return Math.min(2, Math.max(1, subRoll)) // 1d2
      default:
        return protection.guardCount
    }
  }

  // Generiere Fallen basierend auf Protection und Theme
  static generateTraps(
    protection: ChamberProtection,
    theme: KerkerTheme
  ): Trap[] {
    const traps: Trap[] = []
    
    for (let i = 0; i < protection.trapCount; i++) {
      const difficulty = protection.trapVisibility === 'hidden' ? 'hard' : 'easy'
      const trap = generateTrapForTheme(theme, difficulty)
      traps.push({
        ...trap,
        id: `${trap.id}-${Date.now()}-${i}`
      })
    }
    
    return traps
  }

  // Berechne Schatz-Wert wenn nötig
  static calculateTreasureValue(treasure: ChamberTreasure, subRoll?: number): number | undefined {
    if (treasure.id === 'coins') {
      return subRoll || DiceService.roll('5d6').total
    }
    return treasure.value
  }

  // Erstelle eine Kammer
  static createChamber(
    number: number,
    protection: ChamberProtection,
    treasure: ChamberTreasure,
    guardLevels: GuardLevel,
    theme: KerkerTheme,
    guardCount?: number,
    treasureValue?: number
  ): Chamber {
    const actualGuardCount = guardCount ?? this.calculateGuardCount(protection)
    const guards = this.createGuards(actualGuardCount, protection.guardLevel, guardLevels, theme)
    const traps = this.generateTraps(protection, theme)
    
    return {
      id: `chamber-${Date.now()}-${number}`,
      number,
      protection,
      treasure: {
        ...treasure,
        value: treasureValue ?? this.calculateTreasureValue(treasure)
      },
      guards,
      traps,
      isCore: false
    }
  }

  // Erstelle Kernzauber-Kammer
  static createCoreSpellChamber(
    number: number,
    coreSpellContent: CoreSpellContent,
    guardLevels: GuardLevel,
    theme: KerkerTheme
  ): Chamber {
    // Kernzauber-Kammer hat immer starke Wächter
    const guardCount = 2 + Math.floor(Math.random() * 2) // 2-3 Wächter
    const guards = this.createGuards(guardCount, 'high', guardLevels, theme)
    
    // Kernzauber-Kammer kann zusätzliche Fallen haben
    const trap = generateTrapForTheme(theme, 'hard')
    
    return {
      id: `chamber-core-${Date.now()}`,
      number,
      protection: {
        id: 'core-protection',
        name: 'Kernzauber-Schutz',
        guardCount,
        guardLevel: 'high',
        trapCount: 1,
        trapVisibility: 'hidden'
      },
      treasure: {
        id: 'core-treasure',
        name: coreSpellContent.name,
        description: coreSpellContent.description
      },
      guards,
      traps: [trap],
      isCore: true,
      notes: coreSpellContent.special
    }
  }

  // Berechne Regenerationszeit basierend auf Anzahl der Kammern
  static calculateRegenerationTime(chamberCount: number): number {
    // Basis: 1 Stunde pro Kammer
    return chamberCount
  }

  // Erstelle kompletten Kerker
  static createKerker(
    chamberCount: number,
    theme: KerkerTheme,
    guardLevels: GuardLevel,
    environment: KerkerEnvironment,
    chambers: Chamber[],
    coreSpellContent?: CoreSpellContent
  ): KerkerElementar {
    // Füge Kernzauber-Kammer hinzu wenn vorhanden
    const allChambers = [...chambers]
    if (coreSpellContent) {
      const coreSpellChamber = this.createCoreSpellChamber(
        chamberCount,
        coreSpellContent,
        guardLevels,
        theme
      )
      allChambers.push(coreSpellChamber)
    }

    return {
      chamberCount,
      theme,
      guardLevels,
      environment,
      chambers: allChambers,
      coreSpellContent,
      regenerationTime: this.calculateRegenerationTime(chamberCount),
      createdAt: new Date()
    }
  }

  // Exportiere Kerker für verschiedene Zwecke
  static exportForGM(kerker: KerkerElementar): string {
    let output = `# ${kerker.name || 'Kerker-Elementar'}\n\n`
    output += `**Thema:** ${kerker.theme.name}\n`
    output += `**Umgebung:** ${kerker.environment.name}\n`
    output += `**Kammern:** ${kerker.chamberCount}\n`
    output += `**Wächter-Stufen:** ${kerker.guardLevels.name}\n`
    output += `**Regeneration:** ${kerker.regenerationTime} Stunden\n\n`
    
    output += `## Kammern\n\n`
    
    kerker.chambers.forEach(chamber => {
      output += `### Kammer ${chamber.number}${chamber.isCore ? ' (Kernzauber)' : ''}\n`
      output += `**Wächter:** ${chamber.guards.length}x ${chamber.guards[0]?.type || 'Keine'} `
      if (chamber.guards.length > 0) {
        output += `(Stufe ${chamber.guards.map(g => g.level).join(', ')})\n`
      } else {
        output += '\n'
      }
      
      if (chamber.traps.length > 0) {
        output += `**Fallen:**\n`
        chamber.traps.forEach(trap => {
          output += `- ${trap.name}: ${trap.effect} (Entdecken SW ${trap.difficulty})\n`
        })
      }
      
      output += `**Schatz:** ${chamber.treasure.name}`
      if (chamber.treasure.value) {
        output += ` (${chamber.treasure.value} Taler)`
      }
      output += '\n'
      
      if (chamber.notes) {
        output += `**Besonderheit:** ${chamber.notes}\n`
      }
      
      output += '\n'
    })
    
    return output
  }

  static exportForPlayers(kerker: KerkerElementar): string {
    let output = `# ${kerker.name || 'Unbekannter Kerker'}\n\n`
    output += `Ein mysteriöser Ort mit ${kerker.chamberCount} Kammern.\n`
    output += `Die Umgebung: ${kerker.environment.description}\n\n`
    output += `Atmosphäre: ${kerker.theme.atmosphere}\n`
    
    return output
  }
}