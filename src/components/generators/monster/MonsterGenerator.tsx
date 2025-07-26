import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useMonsterStore } from '@/store/monsterStore'
import { MonsterService } from '@/lib/generators/monsterService'

// Step Components
import { StepAge } from './steps/StepAge'
import { StepStrength } from './steps/StepStrength'
import { StepWeakness } from './steps/StepWeakness'
import { StepAbilities } from './steps/StepAbilities'
import { StepSpecialAction } from './steps/StepSpecialAction'
import { StepProperties } from './steps/StepProperties'
import { MonsterDisplay } from './MonsterDisplay'

const STEPS = [
  { id: 'age', title: 'Alter', component: StepAge },
  { id: 'strength', title: 'Stärke', component: StepStrength },
  { id: 'weakness', title: 'Schwäche', component: StepWeakness },
  { id: 'abilities', title: 'Fähigkeiten', component: StepAbilities },
  { id: 'special', title: 'Spezial-Aktion', component: StepSpecialAction },
  { id: 'properties', title: 'Eigenschaften', component: StepProperties },
  { id: 'final', title: 'Fertig', component: MonsterDisplay }
]

export function MonsterGenerator() {
  const { generatorState, updateGeneratorState, resetGenerator, setCurrentMonster } = useMonsterStore()

  // Generiere Monster wenn alle Schritte abgeschlossen sind
  useEffect(() => {
    if (generatorState.currentStep === STEPS.length - 1 && 
        generatorState.age && 
        generatorState.strengthAttribute && 
        generatorState.weaknessAttribute &&
        generatorState.strengthRoll !== undefined &&
        generatorState.weaknessRoll !== undefined) {
      
      const monster = MonsterService.createMonster(
        generatorState.age,
        generatorState.strengthAttribute,
        generatorState.weaknessAttribute,
        generatorState.strengthRoll,
        generatorState.weaknessRoll,
        generatorState.abilities,
        generatorState.properties
      )
      
      setCurrentMonster(monster)
    }
  }, [generatorState, setCurrentMonster])

  const handleNext = () => {
    if (generatorState.currentStep < STEPS.length - 1) {
      updateGeneratorState({ currentStep: generatorState.currentStep + 1 })
    }
  }

  const handleBack = () => {
    if (generatorState.currentStep > 0) {
      updateGeneratorState({ currentStep: generatorState.currentStep - 1 })
    }
  }

  const handleReset = () => {
    resetGenerator()
    setCurrentMonster(null)
  }

  const CurrentStepComponent = STEPS[generatorState.currentStep].component
  const canProceed = () => {
    switch (generatorState.currentStep) {
      case 0: return !!generatorState.age
      case 1: return !!generatorState.strengthAttribute && generatorState.strengthRoll !== undefined
      case 2: return !!generatorState.weaknessAttribute && generatorState.weaknessRoll !== undefined
      case 3: return generatorState.abilities.length > 0
      case 4: return true // Spezial-Aktion ist automatisch
      case 5: return generatorState.properties.length === 2
      default: return true
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Neu starten
        </Button>
        
        <div className="flex items-center gap-2">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${index === generatorState.currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : index < generatorState.currentStep
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'}
              `}>
                {index + 1}
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-12 h-0.5 mx-1 ${
                  index < generatorState.currentStep ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 font-medieval">
          Schritt {generatorState.currentStep + 1}: {STEPS[generatorState.currentStep].title}
        </h2>
        
        <CurrentStepComponent />
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={generatorState.currentStep === 0}
          variant="outline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Zurück
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={generatorState.currentStep === STEPS.length - 1 || !canProceed()}
        >
          Weiter
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}