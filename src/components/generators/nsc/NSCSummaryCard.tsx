import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Copy, Swords, Shield, Heart, Zap, Brain } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { NSC } from '@/types/nsc'
import { NSCService } from '@/lib/generators/nscService'
import { ATTRIBUTE_SHORT } from '@/types/monster'

interface NSCSummaryCardProps {
  nsc: NSC
}

export function NSCSummaryCard({ nsc }: NSCSummaryCardProps) {
  const handleExport = () => {
    const kampfkarte = NSCService.exportKampfkarte(nsc)
    const blob = new Blob([kampfkarte], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${nsc.name || 'NSC'}_kampfkarte.txt`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const handleCopy = () => {
    const kampfkarte = NSCService.exportKampfkarte(nsc)
    navigator.clipboard.writeText(kampfkarte)
  }
  
  const getArtColor = (art: string) => {
    switch (art) {
      case 'körperlich': return 'text-red-600 dark:text-red-400'
      case 'geistig': return 'text-blue-600 dark:text-blue-400'
      case 'mystisch': return 'text-purple-600 dark:text-purple-400'
      default: return ''
    }
  }
  
  return (
    <TooltipProvider>
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-medieval">
            {nsc.name || 'Unbenannter NSC'}
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className={`font-medium ${getArtColor(nsc.art)}`}>
            {nsc.archetyp?.name || 'NSC'}
          </span>
          <span>•</span>
          <span>Stufe {nsc.stufe}</span>
          <span>•</span>
          <span className="capitalize">{nsc.art}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basis-Werte */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Lebenspunkte</span>
                  </div>
                  <div className="text-2xl font-bold">{nsc.lp}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-mono">10 + {nsc.stufe} (Stufe)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Ausdauerpunkte</span>
                  </div>
                  <div className="text-2xl font-bold">{nsc.sp}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-mono">15 + ({nsc.stufe} × 3)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Kampfwerte */}
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <Swords className="w-4 h-4" />
            Kampfwerte
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initiative:</span>
                  <span className="font-mono">{nsc.initiative}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-mono">3 + {nsc.stufe} (Stufe)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AP:</span>
                  <span className="font-mono">{nsc.ap}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{nsc.stufe <= 7 ? 'Stufe 1-7: 6 AP' : 'Stufe 8-10: 7 AP'}</p>
              </TooltipContent>
            </Tooltip>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Angriff:</span>
              <span className="font-mono">{nsc.angriff}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Verteidigung:</span>
              <span className="font-mono">{nsc.verteidigung}</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-muted-foreground">Schaden:</span>
              <span className="font-mono">{nsc.schaden}</span>
            </div>
          </div>
        </div>
        
        {/* Attribute */}
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Attribute
          </h3>
          <div className="grid grid-cols-5 gap-2 text-center">
            {Object.entries(nsc.attribute).map(([attr, value]) => (
              <div key={attr} className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase">
                  {ATTRIBUTE_SHORT[attr as keyof typeof ATTRIBUTE_SHORT]}
                </div>
                <div className={`text-lg font-bold ${
                  value > nsc.stufe ? 'text-green-600 dark:text-green-400' :
                  value < nsc.stufe ? 'text-red-600 dark:text-red-400' : ''
                }`}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ausrüstung */}
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Ausrüstung
          </h3>
          <div className="text-sm space-y-1">
            <div>
              <span className="text-muted-foreground">Waffen:</span>{' '}
              {nsc.waffen.join(', ')}
            </div>
            {nsc.rüstung && (
              <div>
                <span className="text-muted-foreground">Rüstung:</span>{' '}
                {nsc.rüstung}
              </div>
            )}
            {nsc.ausrüstung.length > 0 && (
              <div>
                <span className="text-muted-foreground">Sonstiges:</span>{' '}
                {nsc.ausrüstung.join(', ')}
              </div>
            )}
          </div>
        </div>
        
        {/* Persönlichkeit */}
        {nsc.persönlichkeit && (
          <div className="space-y-2">
            <h3 className="font-medium">Persönlichkeit</h3>
            <p className="text-sm text-muted-foreground italic">
              {nsc.persönlichkeit}
            </p>
          </div>
        )}
        
        {/* Archetyp-Beschreibung */}
        {nsc.archetyp?.verhaltensTemplate && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Verhalten:</span>{' '}
              {nsc.archetyp.verhaltensTemplate}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
    </TooltipProvider>
  )
}