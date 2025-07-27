import { useState } from 'react'
import { X, Plus, Trash2, Shield, Sparkles, Package, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Chamber, Guard, Trap } from '@/types/kerker'

interface ChamberEditorProps {
  chamber: Chamber
  onSave: (chamber: Chamber) => void
  onClose: () => void
}

export function ChamberEditor({ chamber, onSave, onClose }: ChamberEditorProps) {
  const [editedChamber, setEditedChamber] = useState<Chamber>({ ...chamber })
  const [editingGuard, setEditingGuard] = useState<number | null>(null)
  const [editingTrap, setEditingTrap] = useState<number | null>(null)

  const handleGuardChange = (index: number, field: keyof Guard, value: any) => {
    const newGuards = [...editedChamber.guards]
    newGuards[index] = { ...newGuards[index], [field]: value }
    setEditedChamber({ ...editedChamber, guards: newGuards })
  }

  const handleAddGuard = () => {
    const newGuard: Guard = {
      id: `guard-custom-${Date.now()}`,
      level: 1,
      type: 'Wächter',
      hp: 11,
      sp: 18,
      initiative: 4,
      ap: 6
    }
    setEditedChamber({ 
      ...editedChamber, 
      guards: [...editedChamber.guards, newGuard] 
    })
  }

  const handleRemoveGuard = (index: number) => {
    const newGuards = editedChamber.guards.filter((_, i) => i !== index)
    setEditedChamber({ ...editedChamber, guards: newGuards })
  }

  const handleTrapChange = (index: number, field: keyof Trap, value: any) => {
    const newTraps = [...editedChamber.traps]
    newTraps[index] = { ...newTraps[index], [field]: value }
    setEditedChamber({ ...editedChamber, traps: newTraps })
  }

  const handleAddTrap = () => {
    const newTrap: Trap = {
      id: `trap-custom-${Date.now()}`,
      name: 'Neue Falle',
      theme: editedChamber.protection.id,
      trigger: 'Unbekannt',
      effect: '2W6 Schaden',
      difficulty: 15
    }
    setEditedChamber({ 
      ...editedChamber, 
      traps: [...editedChamber.traps, newTrap] 
    })
  }

  const handleRemoveTrap = (index: number) => {
    const newTraps = editedChamber.traps.filter((_, i) => i !== index)
    setEditedChamber({ ...editedChamber, traps: newTraps })
  }

  const handleSave = () => {
    onSave(editedChamber)
    onClose()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Kammer {chamber.number} {chamber.isCore && '(Kernzauber)'}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wächter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Wächter ({editedChamber.guards.length})
            </h3>
            <Button size="sm" onClick={handleAddGuard}>
              <Plus className="w-4 h-4 mr-1" />
              Wächter
            </Button>
          </div>
          
          <div className="space-y-2">
            {editedChamber.guards.map((guard, index) => (
              <div key={guard.id} className="p-3 bg-muted rounded-lg">
                {editingGuard === index ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Typ</Label>
                        <Input
                          value={guard.type}
                          onChange={(e) => handleGuardChange(index, 'type', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Stufe</Label>
                        <Input
                          type="number"
                          value={guard.level}
                          onChange={(e) => handleGuardChange(index, 'level', parseInt(e.target.value))}
                          min={1}
                          max={10}
                        />
                      </div>
                      <div>
                        <Label>LP</Label>
                        <Input
                          type="number"
                          value={guard.hp}
                          onChange={(e) => handleGuardChange(index, 'hp', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>SP</Label>
                        <Input
                          type="number"
                          value={guard.sp}
                          onChange={(e) => handleGuardChange(index, 'sp', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingGuard(null)}>
                        Fertig
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{guard.type} (Stufe {guard.level})</p>
                      <p className="text-sm text-muted-foreground">
                        LP: {guard.hp}, SP: {guard.sp}, Initiative: {guard.initiative}, AP: {guard.ap}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingGuard(index)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveGuard(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fallen */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Fallen ({editedChamber.traps.length})
            </h3>
            <Button size="sm" onClick={handleAddTrap}>
              <Plus className="w-4 h-4 mr-1" />
              Falle
            </Button>
          </div>
          
          <div className="space-y-2">
            {editedChamber.traps.map((trap, index) => (
              <div key={trap.id} className="p-3 bg-muted rounded-lg">
                {editingTrap === index ? (
                  <div className="space-y-2">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={trap.name}
                        onChange={(e) => handleTrapChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Auslöser</Label>
                        <Input
                          value={trap.trigger}
                          onChange={(e) => handleTrapChange(index, 'trigger', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Schwierigkeit</Label>
                        <Input
                          type="number"
                          value={trap.difficulty}
                          onChange={(e) => handleTrapChange(index, 'difficulty', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Effekt</Label>
                      <Textarea
                        value={trap.effect}
                        onChange={(e) => handleTrapChange(index, 'effect', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingTrap(null)}>
                        Fertig
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{trap.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {trap.effect} (SW {trap.difficulty})
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingTrap(index)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveTrap(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Schatz */}
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
            <Package className="w-5 h-5" />
            Schatz
          </h3>
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium">{editedChamber.treasure.name}</p>
            {editedChamber.treasure.value && (
              <p className="text-sm text-muted-foreground">Wert: {editedChamber.treasure.value} Taler</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {editedChamber.treasure.description}
            </p>
          </div>
        </div>

        {/* Notizen */}
        <div>
          <Label>Notizen</Label>
          <Textarea
            value={editedChamber.notes || ''}
            onChange={(e) => setEditedChamber({ ...editedChamber, notes: e.target.value })}
            placeholder="Zusätzliche Anmerkungen zur Kammer..."
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button onClick={handleSave}>
            Speichern
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}