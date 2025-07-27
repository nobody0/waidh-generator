import { useState, useEffect } from 'react'
import { Sparkles, RefreshCw, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMonsterStore } from '@/store/monsterStore'
import { MonsterService } from '@/lib/generators/monsterService'
import { MONSTER_ATTRIBUTES, ATTRIBUTE_SHORT } from '@/types/monster'
import type { MonsterAbility, MonsterAttribute } from '@/types/monster'

export function StepAbilities() {
  const { generatorState, updateGeneratorState } = useMonsterStore()
  const [abilityDistribution, setAbilityDistribution] = useState<Record<MonsterAttribute['type'], number>>({
    stärke: 0,
    geschick: 0,
    willenskraft: 0,
    logik: 0,
    mystik: 0
  })
  const [showDetails, setShowDetails] = useState<string | null>(null)

  // Berechne Attributwerte und Fähigkeiten-Verteilung
  useEffect(() => {
    if (generatorState.strengthAttribute && generatorState.weaknessAttribute && 
        generatorState.strengthRoll !== undefined && generatorState.weaknessRoll !== undefined) {
      
      // Basis-Attribute
      const attributes: Record<MonsterAttribute['type'], number> = {
        stärke: 0,
        geschick: 0,
        willenskraft: 0,
        logik: 0,
        mystik: 0
      }
      
      // Wende Stärke und Schwäche an
      attributes[generatorState.strengthAttribute] = generatorState.strengthRoll
      attributes[generatorState.weaknessAttribute] = -generatorState.weaknessRoll
      
      // Berechne Fähigkeiten-Verteilung
      if (generatorState.age) {
        const distribution = MonsterService.distributeAbilities(
          generatorState.age,
          attributes,
          generatorState.strengthAttribute,
          generatorState.weaknessAttribute
        )
        setAbilityDistribution(distribution)
        
        // Generiere Fähigkeiten wenn noch keine vorhanden
        if (generatorState.abilities.length === 0) {
          generateAbilities(distribution)
        }
      }
    }
  }, [generatorState.strengthAttribute, generatorState.weaknessAttribute, 
      generatorState.strengthRoll, generatorState.weaknessRoll, generatorState.age, generatorState.abilities.length])

  const generateAbilities = (distribution: Record<MonsterAttribute['type'], number>) => {
    const abilities: MonsterAbility[] = []
    
    MONSTER_ATTRIBUTES.forEach(attr => {
      const count = distribution[attr]
      if (count > 0) {
        const attrAbilities = MonsterService.rollAbilitiesForAttribute(attr, count, abilities)
        abilities.push(...attrAbilities)
      }
    })
    
    updateGeneratorState({ abilities })
  }

  const regenerateAbilities = () => {
    generateAbilities(abilityDistribution)
  }

  const regenerateAttributeAbilities = (attribute: MonsterAttribute['type']) => {
    const count = abilityDistribution[attribute]
    if (count === 0) return
    
    // Entferne alte Fähigkeiten dieses Attributs
    const otherAbilities = generatorState.abilities.filter(a => a.attribute !== attribute)
    
    // Generiere neue Fähigkeiten für dieses Attribut
    const newAbilities = MonsterService.rollAbilitiesForAttribute(attribute, count, otherAbilities)
    
    updateGeneratorState({ 
      abilities: [...otherAbilities, ...newAbilities]
    })
  }

  const getAttributeValue = (attr: MonsterAttribute['type']): number => {
    if (attr === generatorState.strengthAttribute) return generatorState.strengthRoll || 0
    if (attr === generatorState.weaknessAttribute) return -(generatorState.weaknessRoll || 0)
    return 0
  }

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Die Anzahl der Fähigkeiten pro Attribut wird automatisch basierend auf den Attributwerten berechnet.
          Das Monster erhält insgesamt 7 Fähigkeiten, verteilt nach Attributstärke.
        </p>
      </div>

      {/* Attribut-Übersicht */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {MONSTER_ATTRIBUTES.map(attr => {
          const value = getAttributeValue(attr)
          const abilities = abilityDistribution[attr]
          return (
            <div 
              key={attr}
              className={`p-3 rounded-lg border text-center ${
                value > 0 ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                value < 0 ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                'bg-muted border-border'
              }`}
            >
              <div className="font-bold text-sm">{ATTRIBUTE_SHORT[attr]}</div>
              <div className={`text-lg font-mono ${
                value > 0 ? 'text-green-600 dark:text-green-400' :
                value < 0 ? 'text-red-600 dark:text-red-400' :
                'text-muted-foreground'
              }`}>
                {value >= 0 ? '+' : ''}{value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {abilities} {abilities === 1 ? 'Fähigkeit' : 'Fähigkeiten'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Fähigkeiten nach Attribut */}
      <div className="space-y-4">
        {MONSTER_ATTRIBUTES.map(attr => {
          const attrAbilities = generatorState.abilities.filter(a => a.attribute === attr)
          if (abilityDistribution[attr] === 0) return null
          
          return (
            <div key={attr} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold capitalize flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {attr} ({abilityDistribution[attr]} {abilityDistribution[attr] === 1 ? 'Fähigkeit' : 'Fähigkeiten'})
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => regenerateAttributeAbilities(attr)}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {attrAbilities.map(ability => (
                  <div 
                    key={ability.id}
                    className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => setShowDetails(showDetails === ability.id ? null : ability.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{ability.name}</h4>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </div>
                    {showDetails === ability.id && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>{ability.description}</p>
                        {ability.effect && (
                          <p className="mt-1 font-medium">Effekt: {ability.effect}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Aktionen */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={regenerateAbilities}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Alle Fähigkeiten neu würfeln
        </Button>
      </div>

      {/* Zusammenfassung */}
      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <p className="text-sm font-medium mb-2">Fähigkeiten-Übersicht:</p>
        <p className="text-sm text-muted-foreground">
          Das Monster hat insgesamt {generatorState.abilities.length} Fähigkeiten erhalten.
          Die Verteilung basiert auf den Attributwerten, wobei stärkere Attribute mehr Fähigkeiten erhalten.
        </p>
      </div>
    </div>
  )
}