import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Activity, Brain, Sparkles, Heart, Clock } from 'lucide-react'
import type { VergiftungEffekt, SpezialRegel } from '@/types/vergiftung'
import { SPEZIAL_REGEL_BESCHREIBUNG } from '@/types/vergiftung'

interface VergiftungEffectCardProps {
  effekt: VergiftungEffekt
  würfel: number[]
  summe: number
  spezialRegeln: SpezialRegel[]
}

export function VergiftungEffectCard({ 
  effekt, 
  würfel, 
  summe, 
  spezialRegeln 
}: VergiftungEffectCardProps) {
  const getEffektColor = () => {
    if (summe <= 5) return 'text-red-600 dark:text-red-400'
    if (summe <= 10) return 'text-orange-600 dark:text-orange-400'
    if (summe <= 15) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-green-600 dark:text-green-400'
  }
  
  const getEffektIcon = () => {
    if (effekt.id === 'immunreaktion') return <Sparkles className="w-6 h-6" />
    if (effekt.id === 'blutung') return <Heart className="w-6 h-6" />
    if (effekt.id.includes('stress') || effekt.id.includes('angst')) return <Brain className="w-6 h-6" />
    if (summe <= 5) return <AlertTriangle className="w-6 h-6" />
    return <Activity className="w-6 h-6" />
  }
  
  const hasActiveSpezialRegeln = spezialRegeln.some(regel => regel !== 'keine')
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medieval">Vergiftungs-Effekt</CardTitle>
          <div className="flex items-center gap-4">
            {/* Würfel-Anzeige */}
            <div className="flex gap-2">
              {würfel.map((wert, index) => (
                <div 
                  key={index}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg font-bold"
                >
                  {wert}
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getEffektColor()}`}>
                {summe}
              </div>
              <div className="text-xs text-muted-foreground">Summe</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Haupteffekt */}
        <div className={`p-4 rounded-lg bg-muted text-center space-y-2 ${getEffektColor()}`}>
          <div className="flex justify-center">
            {getEffektIcon()}
          </div>
          <h3 className="text-2xl font-bold">
            {effekt.name}
          </h3>
          <p className="text-sm opacity-90">
            {effekt.beschreibung}
          </p>
        </div>
        
        {/* Dauer */}
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">
            <span className="font-medium">Dauer:</span> {effekt.dauer}
          </span>
        </div>
        
        {/* Spezial-Effekte */}
        {effekt.spezialEffekte && effekt.spezialEffekte.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Spezial-Effekte:</h4>
            <ul className="space-y-1">
              {effekt.spezialEffekte.map((spezial, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  <span>{spezial}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Aktive Spezialregeln */}
        {hasActiveSpezialRegeln && (
          <div className="border-t pt-3">
            <h4 className="font-medium text-sm mb-2">Aktive Spezialregeln:</h4>
            <div className="space-y-2">
              {spezialRegeln.filter(regel => regel !== 'keine').map(regel => (
                <div key={regel} className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-sm">
                  <span className="font-medium capitalize">{regel}:</span>{' '}
                  {SPEZIAL_REGEL_BESCHREIBUNG[regel]}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Immun-Spezialfall */}
        {effekt.id === 'immunreaktion' && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm text-green-800 dark:text-green-200">
              🎉 Glück gehabt! Der Körper wehrt das Gift erfolgreich ab.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}