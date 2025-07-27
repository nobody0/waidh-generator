import { useState } from 'react'
import { RefreshCw, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MonsterService } from '@/lib/generators/monsterService'
import type { MonsterAbility, MonsterAge, MonsterAttribute } from '@/types/monster'

interface AbilityDiceEditorProps {
  abilities: MonsterAbility[]
  age: MonsterAge
  strengthAttr: MonsterAttribute['type']
  weaknessAttr: MonsterAttribute['type']
  onChange: (abilities: MonsterAbility[]) => void
}

export function AbilityDiceEditor({ 
  abilities, 
  age, 
  strengthAttr, 
  weaknessAttr, 
  onChange 
}: AbilityDiceEditorProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleRerollAll = () => {
    // Calculate base attributes for distribution
    const attributes: Record<MonsterAttribute['type'], number> = {
      stärke: age.baseAttributes,
      geschick: age.baseAttributes,
      willenskraft: age.baseAttributes,
      logik: age.baseAttributes,
      mystik: age.baseAttributes
    }
    
    attributes[strengthAttr] += age.xValue
    attributes[weaknessAttr] -= age.yValue

    // Get distribution based on age
    const distribution = MonsterService.distributeAbilities(
      age,
      attributes,
      strengthAttr,
      weaknessAttr
    )
    
    const newAbilities: MonsterAbility[] = []
    
    // Roll abilities for each attribute based on distribution
    Object.entries(distribution).forEach(([attr, count]) => {
      const attrAbilities = MonsterService.rollAbilitiesForAttribute(
        attr as MonsterAttribute['type'],
        count,
        newAbilities
      )
      newAbilities.push(...attrAbilities)
    })
    
    onChange(newAbilities)
  }

  const handleRerollAttribute = (attribute: MonsterAttribute['type']) => {
    // Get current abilities without this attribute
    const otherAbilities = abilities.filter(a => a.attribute !== attribute)
    
    // Calculate how many abilities this attribute should have
    const attributes: Record<MonsterAttribute['type'], number> = {
      stärke: age.baseAttributes,
      geschick: age.baseAttributes,
      willenskraft: age.baseAttributes,  
      logik: age.baseAttributes,
      mystik: age.baseAttributes
    }
    
    attributes[strengthAttr] += age.xValue
    attributes[weaknessAttr] -= age.yValue

    const distribution = MonsterService.distributeAbilities(
      age,
      attributes,
      strengthAttr,
      weaknessAttr
    )
    
    const count = distribution[attribute]
    
    // Roll new abilities for this attribute
    const newAttrAbilities = MonsterService.rollAbilitiesForAttribute(
      attribute,
      count,
      otherAbilities
    )
    
    // Combine with other abilities
    const newAbilities = [...otherAbilities, ...newAttrAbilities]
    onChange(newAbilities)
  }

  // Group abilities by attribute
  const groupedAbilities = abilities.reduce((acc, ability) => {
    if (!acc[ability.attribute]) {
      acc[ability.attribute] = []
    }
    acc[ability.attribute].push(ability)
    return acc
  }, {} as Record<string, MonsterAbility[]>)

  // Get expected counts
  const attributes: Record<MonsterAttribute['type'], number> = {
    stärke: age.baseAttributes,
    geschick: age.baseAttributes,
    willenskraft: age.baseAttributes,
    logik: age.baseAttributes,
    mystik: age.baseAttributes
  }
  
  attributes[strengthAttr] += age.xValue
  attributes[weaknessAttr] -= age.yValue

  const expectedDistribution = MonsterService.distributeAbilities(
    age,
    attributes,
    strengthAttr,
    weaknessAttr
  )

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs">
          {abilities.map((a, i) => (
            <span key={i}>
              <span className="font-medium">{a.name}</span>
              {i < abilities.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsEditing(!isEditing)}
          className="h-4 w-4 opacity-50 hover:opacity-100"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      </div>
      
      {isEditing && (
        <div className="mt-2 space-y-1 border-t pt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-muted-foreground">Einzeln neu würfeln:</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRerollAll}
              className="h-5 text-[10px] px-2"
            >
              Alle neu
            </Button>
          </div>
          {Object.entries(expectedDistribution).map(([attr, expectedCount]) => {
            const currentAbilities = groupedAbilities[attr] || []
            const currentCount = currentAbilities.length
            
            if (expectedCount === 0) return null
            
            return (
              <div key={attr} className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">
                  {attr} ({currentCount}/{expectedCount}):
                </span>
                <div className="flex items-center gap-1">
                  <span className="flex-1">
                    {currentAbilities.map(a => a.name).join(', ') || '-'}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRerollAttribute(attr as MonsterAttribute['type'])}
                    className="h-4 w-4"
                  >
                    <RefreshCw className="h-2 w-2" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}