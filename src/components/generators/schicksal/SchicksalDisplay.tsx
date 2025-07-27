import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, AlertTriangle, TrendingDown, Shuffle, Info, TrendingUp } from 'lucide-react'
import type { SchicksalResult } from '@/types/schicksal'

interface SchicksalDisplayProps {
  result: SchicksalResult
  wurf: number
  kontext?: string
  beispiele?: string[]
}

export function SchicksalDisplay({ result, wurf, kontext, beispiele }: SchicksalDisplayProps) {
  const getIcon = () => {
    switch (result.id) {
      case 'katastrophe': return <AlertTriangle className="w-8 h-8" />
      case 'desaster': return <TrendingDown className="w-8 h-8" />
      case 'krise': return <Info className="w-8 h-8" />
      case 'zufall': return <Shuffle className="w-8 h-8" />
      case 'zwischenfall': return <Info className="w-8 h-8" />
      case 'gluecksstraehne': return <TrendingUp className="w-8 h-8" />
      default: return <Sparkles className="w-8 h-8" />
    }
  }
  
  const getColorClass = () => {
    switch (result.id) {
      case 'katastrophe': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
      case 'desaster': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
      case 'krise': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
      case 'zufall': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
      case 'zwischenfall': return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
      case 'gluecksstraehne': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
      default: return ''
    }
  }
  
  const getBorderClass = () => {
    switch (result.id) {
      case 'katastrophe': return 'border-red-200 dark:border-red-800'
      case 'desaster': return 'border-orange-200 dark:border-orange-800'
      case 'krise': return 'border-yellow-200 dark:border-yellow-800'
      case 'zufall': return 'border-blue-200 dark:border-blue-800'
      case 'zwischenfall': return 'border-gray-200 dark:border-gray-800'
      case 'gluecksstraehne': return 'border-green-200 dark:border-green-800'
      default: return ''
    }
  }
  
  return (
    <Card className={`transition-all duration-500 ${getBorderClass()}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-medieval">Schicksalswurf</CardTitle>
          <div className={`p-3 rounded-full ${getColorClass()}`}>
            <div className="text-3xl font-bold">{wurf}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Ergebnis */}
        <div className={`p-6 rounded-lg text-center space-y-3 ${getColorClass()}`}>
          <div className="flex justify-center">
            {getIcon()}
          </div>
          <h2 className="text-3xl font-bold font-medieval">
            {result.name}
          </h2>
          <p className="text-lg font-medium">
            {result.beschreibung}
          </p>
        </div>
        
        {/* Detail-Beschreibung */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">Was bedeutet das?</h3>
          <p className="text-sm leading-relaxed">
            {result.detailBeschreibung}
          </p>
        </div>
        
        {/* Effekt */}
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Effekt:</span> {result.effekt}
          </p>
        </div>
        
        {/* Kontext */}
        {kontext && (
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">
              Kontext: {kontext}
            </h3>
          </div>
        )}
        
        {/* Beispiele */}
        {beispiele && beispiele.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">Mögliche Beispiele:</h3>
            <ul className="space-y-1">
              {beispiele.map((beispiel, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  <span>{beispiel}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}