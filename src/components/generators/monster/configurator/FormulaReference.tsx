import { Calculator, Heart, Shield, Zap, Brain } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FormulaReference() {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Alle Berechnungsformeln für Monster-Werte. Diese Formeln bestimmen, wie sich die 
          Attribute auf die finalen Kampfwerte auswirken.
        </p>
      </div>

      {/* LP-Berechnung */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Lebenspunkte (LP)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="font-mono text-sm bg-muted p-3 rounded">
            LP = Basis-LP + (STR × Multiplikator)
          </div>
          
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Basis-LP nach Alter:</h4>
            <ul className="space-y-1">
              <li>• Jung: 20 LP</li>
              <li>• Erwachsen: 25 LP</li>
              <li>• Alt: 35 LP</li>
              <li>• Altehrwürdig: 55 LP</li>
              <li>• Weltenbestie: 100 LP</li>
            </ul>
          </div>

          <div className="text-sm">
            <h4 className="font-semibold">STR-Multiplikator:</h4>
            <ul className="space-y-1">
              <li>• Normal: ×1</li>
              <li>• Altehrwürdig: ×2</li>
              <li>• Weltenbestie: ×2</li>
            </ul>
          </div>

          <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded text-sm text-blue-900 dark:text-blue-200">
            <strong>Beispiel:</strong> Altes Monster mit STR +3 = 35 + 3 = 38 LP
          </div>
        </CardContent>
      </Card>

      {/* SP-Berechnung */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            Stresspunkte (SP)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="font-mono text-sm bg-muted p-3 rounded">
            SP = Basis-SP + (WIL × SP-Multiplikator)
          </div>
          
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Basis-SP nach Alter:</h4>
            <ul className="space-y-1">
              <li>• Jung: 30 SP</li>
              <li>• Erwachsen: 40 SP</li>
              <li>• Alt: 55 SP</li>
              <li>• Altehrwürdig: 75 SP</li>
              <li>• Weltenbestie: 180 SP</li>
            </ul>
          </div>

          <div className="text-sm">
            <h4 className="font-semibold">SP-Multiplikator:</h4>
            <ul className="space-y-1">
              <li>• Jung/Erwachsen/Alt: ×3</li>
              <li>• Altehrwürdig/Weltenbestie: ×6</li>
            </ul>
          </div>

          <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded text-sm text-blue-900 dark:text-blue-200">
            <strong>Beispiel:</strong> Erwachsenes Monster mit WIL +2 = 40 + (2×3) = 46 SP
          </div>
        </CardContent>
      </Card>

      {/* Initiative */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Initiative
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="font-mono text-sm bg-muted p-3 rounded">
            Initiative = 1 + GES + LOG + LP-Mali
          </div>
          
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">LP-Mali (basierend auf % verbleibender LP):</h4>
            <ul className="space-y-1">
              <li>• 75-100% LP: 0 Mali</li>
              <li>• 50-74% LP: -1 Mali</li>
              <li>• 25-49% LP: -3 Mali</li>
              <li>• 0-24% LP: -5 Mali (normal) / -10 (ab 55 max LP) / -15 (ab 100 max LP)</li>
            </ul>
          </div>

          <div className="p-3 bg-purple-50/50 dark:bg-purple-900/10 rounded text-sm text-purple-900 dark:text-purple-200">
            <strong>Beispiel:</strong> GES +2, LOG 0, volle LP = 1 + 2 + 0 = 3 Initiative
          </div>
        </CardContent>
      </Card>

      {/* Angriff/Verteidigung */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Angriff & Verteidigung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="font-mono text-sm bg-muted p-3 rounded">
            Angriff/Verteidigung = XW6 + (GES × 2)
          </div>
          
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Würfelanzahl (X):</h4>
            <ul className="space-y-1">
              <li>• Normal: 3W6</li>
              <li>• Altehrwürdig: 4W6</li>
              <li>• Weltenbestie: 4W6</li>
            </ul>
          </div>

          <div className="p-3 bg-green-50/50 dark:bg-green-900/10 rounded text-sm text-green-900 dark:text-green-200">
            <strong>Beispiel:</strong> Erwachsenes Monster mit GES +2 = 3W6+4
          </div>
        </CardContent>
      </Card>

      {/* Fähigkeiten-Verteilung */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-orange-500" />
            Fähigkeiten-Verteilung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <p className="mb-2">
              Monster erhalten insgesamt 7 Fähigkeiten, verteilt nach Attributstärke:
            </p>
            <ul className="space-y-1">
              <li>• Höchstes Attribut: 3 Fähigkeiten</li>
              <li>• Zweithöchstes: 2 Fähigkeiten</li>
              <li>• Dritt- und Vierthöchstes: je 1 Fähigkeit</li>
              <li>• Niedrigstes: 0 Fähigkeiten</li>
            </ul>
          </div>

          <div className="p-3 bg-orange-50/50 dark:bg-orange-900/10 rounded text-sm text-orange-900 dark:text-orange-200">
            <strong>Beispiel:</strong> STR +4, GES +0, WIL +0, LOG -3, MYS +0
            <br />→ STR: 3 Fähigkeiten, GES/WIL/MYS: je 1-2, LOG: 0
          </div>
        </CardContent>
      </Card>

      {/* X/Y-Werte */}
      <Card>
        <CardHeader>
          <CardTitle>X/Y-Werte nach Alter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">X-Wert (Stärke-Bonus):</h4>
              <ul className="space-y-1">
                <li>• Jung: +1</li>
                <li>• Erwachsen: +2</li>
                <li>• Alt: +3</li>
                <li>• Altehrwürdig: +4</li>
                <li>• Weltenbestie: +5</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Y-Wert (Schwäche-Malus):</h4>
              <ul className="space-y-1">
                <li>• Jung: -1</li>
                <li>• Erwachsen: -2</li>
                <li>• Alt: -3</li>
                <li>• Altehrwürdig: -4</li>
                <li>• Weltenbestie: -5</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}