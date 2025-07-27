import { useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, DoorOpen, Star, Users, Sparkles, Package } from 'lucide-react'
import type { Chamber } from '@/types/kerker'

interface KerkerVisualizerProps {
  chambers: Chamber[]
  selectedChamber?: number
  onChamberSelect: (chamberNumber: number) => void
  onChamberReorder?: (chambers: Chamber[]) => void
}

export function KerkerVisualizer({ 
  chambers, 
  selectedChamber, 
  onChamberSelect,
  onChamberReorder 
}: KerkerVisualizerProps) {
  const [draggedChamber, setDraggedChamber] = useState<number | null>(null)
  const [dragOverChamber, setDragOverChamber] = useState<number | null>(null)

  const handleDragStart = useCallback((e: React.DragEvent, chamberNumber: number) => {
    setDraggedChamber(chamberNumber)
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, chamberNumber: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverChamber(chamberNumber)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOverChamber(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, targetNumber: number) => {
    e.preventDefault()
    
    if (draggedChamber !== null && draggedChamber !== targetNumber && onChamberReorder) {
      // Reorder chambers
      const newChambers = [...chambers]
      const draggedIndex = chambers.findIndex(c => c.number === draggedChamber)
      const targetIndex = chambers.findIndex(c => c.number === targetNumber)
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [removed] = newChambers.splice(draggedIndex, 1)
        newChambers.splice(targetIndex, 0, removed)
        
        // Update chamber numbers
        newChambers.forEach((chamber, index) => {
          chamber.number = index + 1
        })
        
        onChamberReorder(newChambers)
      }
    }
    
    setDraggedChamber(null)
    setDragOverChamber(null)
  }, [draggedChamber, chambers, onChamberReorder])

  const getChamberIcon = (chamber: Chamber) => {
    if (chamber.isCore) return <Star className="w-4 h-4 text-yellow-500" />
    if (chamber.guards.length > 2) return <Users className="w-4 h-4 text-red-500" />
    if (chamber.traps.length > 0) return <Sparkles className="w-4 h-4 text-purple-500" />
    return <Package className="w-4 h-4 text-blue-500" />
  }

  const getChamberColor = (chamber: Chamber) => {
    if (chamber.isCore) return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'
    if (selectedChamber === chamber.number) return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
    if (dragOverChamber === chamber.number) return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
    return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          {/* Eingang */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-16 h-16 rounded-lg bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700 flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </div>

          {/* Kammern */}
          {chambers.map((chamber, index) => (
            <div key={chamber.id} className="flex items-center gap-2 shrink-0">
              <div
                draggable={!chamber.isCore && onChamberReorder}
                onDragStart={(e) => handleDragStart(e, chamber.number)}
                onDragOver={(e) => handleDragOver(e, chamber.number)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, chamber.number)}
                className={`
                  relative w-24 h-24 rounded-lg border-2 p-2 cursor-pointer transition-all
                  ${getChamberColor(chamber)}
                  ${!chamber.isCore && onChamberReorder ? 'hover:shadow-lg' : ''}
                  ${draggedChamber === chamber.number ? 'opacity-50' : ''}
                `}
                onClick={() => onChamberSelect(chamber.number)}
              >
                {/* Kammer-Nummer */}
                <div className="absolute top-1 left-1 text-xs font-bold">
                  #{chamber.number}
                </div>

                {/* Kammer-Icon */}
                <div className="absolute top-1 right-1">
                  {getChamberIcon(chamber)}
                </div>

                {/* Kammer-Details */}
                <div className="mt-6 space-y-1">
                  <div className="flex items-center gap-1 text-xs">
                    <Users className="w-3 h-3" />
                    <span>{chamber.guards.length}</span>
                  </div>
                  {chamber.traps.length > 0 && (
                    <div className="flex items-center gap-1 text-xs">
                      <Sparkles className="w-3 h-3" />
                      <span>{chamber.traps.length}</span>
                    </div>
                  )}
                </div>

                {/* Kernzauber-Indikator */}
                {chamber.isCore && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs bg-yellow-200 dark:bg-yellow-800 px-2 py-0.5 rounded">
                    Kernzauber
                  </div>
                )}
              </div>

              {/* Verbindungspfeil (nicht nach letzter Kammer) */}
              {index < chambers.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-400" />
              )}
            </div>
          ))}
        </div>

        {/* Legende */}
        <div className="mt-6 pt-4 border-t flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Wächter</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Fallen</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span>Kernzauber</span>
          </div>
          {onChamberReorder && (
            <div className="ml-auto text-xs">
              Ziehe Kammern zum Umordnen
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}