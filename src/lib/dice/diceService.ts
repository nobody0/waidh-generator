import type { DiceType, DiceTable, DiceTableEntry, DiceRollResult, TableProbability, MultiDiceResult } from '@/types/dice'

export class DiceService {
  private static rollSingleDie(): number {
    return Math.floor(Math.random() * 6) + 1
  }

  static rollDice(diceType: DiceType, customFormula?: string): number {
    switch (diceType) {
      case '1d6':
        return this.rollSingleDie()
      case '2d6':
        return this.rollSingleDie() + this.rollSingleDie()
      case '3d6':
        return this.rollSingleDie() + this.rollSingleDie() + this.rollSingleDie()
      case 'custom':
        if (!customFormula) throw new Error('Custom formula required for custom dice type')
        return this.evaluateCustomFormula(customFormula)
      default:
        throw new Error(`Unknown dice type: ${diceType}`)
    }
  }

  static rollMultipleDice(diceType: DiceType): MultiDiceResult {
    const dice: number[] = []
    
    switch (diceType) {
      case '1d6':
        dice.push(this.rollSingleDie())
        break
      case '2d6':
        dice.push(this.rollSingleDie(), this.rollSingleDie())
        break
      case '3d6':
        dice.push(this.rollSingleDie(), this.rollSingleDie(), this.rollSingleDie())
        break
      default:
        throw new Error(`Cannot roll multiple dice for type: ${diceType}`)
    }
    
    return {
      dice,
      total: dice.reduce((sum, die) => sum + die, 0)
    }
  }

  private static evaluateCustomFormula(formula: string): number {
    // Simple parser for dice formulas like "2d6+3" or "1d20-2"
    const match = formula.match(/(\d+)d(\d+)([+-]\d+)?/)
    if (!match) throw new Error(`Invalid dice formula: ${formula}`)
    
    const [, count, sides, modifier] = match
    let total = 0
    
    for (let i = 0; i < parseInt(count); i++) {
      total += Math.floor(Math.random() * parseInt(sides)) + 1
    }
    
    if (modifier) {
      total += parseInt(modifier)
    }
    
    return Math.max(1, total)
  }

  // Convenience method for rolling custom dice formulas
  static roll(formula: string): MultiDiceResult {
    const total = this.evaluateCustomFormula(formula)
    // For simple formulas, we can't reconstruct individual dice
    // Just return the total
    return {
      dice: [total],
      total
    }
  }

  // Roll a number between min and max (inclusive)
  static rollBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static rollOnTable<T>(table: DiceTable<T>, fixedValue?: number): DiceRollResult<T> {
    const roll = fixedValue ?? this.rollDice(table.diceType, table.customFormula)
    
    const entry = this.findTableEntry(table.entries, roll)
    if (!entry) {
      throw new Error(`No entry found for roll ${roll} in table ${table.id}`)
    }

    const result: DiceRollResult<T> = {
      table,
      roll,
      entry,
      value: entry.value
    }

    // Handle sub-rolls if any
    if (entry.subRolls && entry.subRolls.length > 0) {
      result.subResults = entry.subRolls.map(subRoll => {
        const subValue = this.rollDice(subRoll.diceType, subRoll.customFormula)
        return {
          roll: subValue,
          value: subValue
        } as DiceRollResult<number>
      })
    }

    return result
  }

  private static findTableEntry<T>(entries: DiceTableEntry<T>[], roll: number): DiceTableEntry<T> | undefined {
    return entries.find(entry => {
      if (typeof entry.range === 'number') {
        return entry.range === roll
      } else {
        const [min, max] = entry.range
        return roll >= min && roll <= max
      }
    })
  }

  static rollMultiple<T>(
    count: number, 
    table: DiceTable<T>, 
    unique: boolean = false
  ): DiceRollResult<T>[] {
    const results: DiceRollResult<T>[] = []
    const usedValues = new Set<T>()

    for (let i = 0; i < count; i++) {
      let attempts = 0
      let result: DiceRollResult<T>

      do {
        result = this.rollOnTable(table)
        attempts++
        
        if (attempts > 100) {
          throw new Error('Could not generate enough unique values')
        }
      } while (unique && usedValues.has(result.value))

      if (unique) {
        usedValues.add(result.value)
      }
      
      results.push(result)
    }

    return results
  }

  static rollWithOverride<T>(
    table: DiceTable<T>, 
    fixedValue?: number
  ): DiceRollResult<T> {
    return this.rollOnTable(table, fixedValue)
  }

  static getResultForRoll<T>(table: DiceTable<T>, roll: number): DiceRollResult<T> {
    const entry = this.findTableEntry(table.entries, roll)
    if (!entry) {
      throw new Error(`No entry found for roll ${roll} in table ${table.id}`)
    }

    return {
      table,
      roll,
      entry,
      value: entry.value
    }
  }

  static getTableProbabilities<T>(table: DiceTable<T>): TableProbability<T>[] {
    const totalCombinations = this.getTotalCombinations(table.diceType)
    const probabilityMap = new Map<T, number>()
    const descriptionMap = new Map<T, string | undefined>()

    // Calculate probability for each possible roll
    for (let roll = 1; roll <= totalCombinations.max; roll++) {
      const entry = this.findTableEntry(table.entries, roll)
      if (entry) {
        const currentProb = probabilityMap.get(entry.value) || 0
        const rollProb = this.getRollProbability(table.diceType, roll)
        probabilityMap.set(entry.value, currentProb + rollProb)
        
        if (!descriptionMap.has(entry.value)) {
          descriptionMap.set(entry.value, entry.description)
        }
      }
    }

    // Convert to array and sort by probability
    return Array.from(probabilityMap.entries())
      .map(([value, probability]) => ({
        value,
        probability,
        description: descriptionMap.get(value)
      }))
      .sort((a, b) => b.probability - a.probability)
  }

  private static getTotalCombinations(diceType: DiceType): { min: number; max: number } {
    switch (diceType) {
      case '1d6':
        return { min: 1, max: 6 }
      case '2d6':
        return { min: 2, max: 12 }
      case '3d6':
        return { min: 3, max: 18 }
      default:
        throw new Error(`Cannot calculate combinations for ${diceType}`)
    }
  }

  private static getRollProbability(diceType: DiceType, roll: number): number {
    switch (diceType) {
      case '1d6':
        return 1 / 6
      case '2d6':
        // Probability distribution for 2d6
        const ways2d6 = [0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
        return ways2d6[roll] / 36
      case '3d6':
        // Probability distribution for 3d6
        const ways3d6 = [0, 0, 0, 1, 3, 6, 10, 15, 21, 25, 27, 27, 25, 21, 15, 10, 6, 3, 1]
        return ways3d6[roll] / 216
      default:
        throw new Error(`Cannot calculate probability for ${diceType}`)
    }
  }
}