import { FreeDiceRoller } from '@/components/dice/FreeDiceRoller'
import { DiceHistory } from '@/components/dice/DiceHistory'
import { QuickDiceBar } from '@/components/dice/QuickDiceBar'

export default function DicePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-medieval">Würfel</h1>
        <p className="text-muted-foreground">
          Freies Würfeln mit beliebiger Anzahl und Top-Pick-Funktionen
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FreeDiceRoller />
        <DiceHistory />
      </div>
      
      <QuickDiceBar />
    </div>
  )
}