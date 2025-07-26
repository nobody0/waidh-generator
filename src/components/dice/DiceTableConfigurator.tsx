import { useState } from 'react'
import { Download, Upload, Plus, Trash2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DiceTable, DiceTableEntry } from '@/types/dice'
import { cn } from '@/lib/utils'

interface DiceTableConfiguratorProps<T> {
  table: DiceTable<T>
  onSave?: (modifiedTable: DiceTable<T>) => void
  className?: string
}

export function DiceTableConfigurator<T>({ 
  table, 
  onSave,
  className 
}: DiceTableConfiguratorProps<T>) {
  const [editedTable, setEditedTable] = useState<DiceTable<T>>(JSON.parse(JSON.stringify(table)))
  const [hasChanges, setHasChanges] = useState(false)

  const updateEntry = (index: number, field: keyof DiceTableEntry<T>, value: any) => {
    const newTable = { ...editedTable }
    newTable.entries = [...newTable.entries]
    newTable.entries[index] = {
      ...newTable.entries[index],
      [field]: value
    }
    setEditedTable(newTable)
    setHasChanges(true)
  }

  const addEntry = () => {
    const newEntry: DiceTableEntry<T> = {
      range: editedTable.entries.length + 1,
      value: '' as T, // Dies müsste vom Nutzer definiert werden
      description: 'Neue Option'
    }
    setEditedTable({
      ...editedTable,
      entries: [...editedTable.entries, newEntry]
    })
    setHasChanges(true)
  }

  const removeEntry = (index: number) => {
    setEditedTable({
      ...editedTable,
      entries: editedTable.entries.filter((_, i) => i !== index)
    })
    setHasChanges(true)
  }

  const handleSave = () => {
    if (onSave) {
      onSave(editedTable)
      setHasChanges(false)
    }
  }

  const exportTable = () => {
    const dataStr = JSON.stringify(editedTable, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `${editedTable.id}-table.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedTable = JSON.parse(e.target?.result as string) as DiceTable<T>
        setEditedTable(importedTable)
        setHasChanges(true)
      } catch (error) {
        console.error('Fehler beim Importieren der Tabelle:', error)
      }
    }
    reader.readAsText(file)
  }

  const formatRange = (range: number | [number, number]): string => {
    if (typeof range === 'number') {
      return range.toString()
    }
    return `${range[0]}-${range[1]}`
  }

  const parseRange = (rangeStr: string): number | [number, number] => {
    if (rangeStr.includes('-')) {
      const [min, max] = rangeStr.split('-').map(n => parseInt(n.trim()))
      return [min, max]
    }
    return parseInt(rangeStr)
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-medieval">Tabelle Konfigurieren: {editedTable.name}</span>
          <div className="flex gap-2">
            <input
              type="file"
              accept=".json"
              onChange={importTable}
              style={{ display: 'none' }}
              id="import-input"
            />
            <label htmlFor="import-input">
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-1" />
                  Importieren
                </span>
              </Button>
            </label>
            <Button variant="outline" size="sm" onClick={exportTable}>
              <Download className="w-4 h-4 mr-1" />
              Exportieren
            </Button>
            {hasChanges && (
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                Speichern
              </Button>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Bearbeite die Tabellen-Einträge und speichere deine Änderungen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Tabellen-Name</label>
              <input
                type="text"
                value={editedTable.name}
                onChange={(e) => {
                  setEditedTable({ ...editedTable, name: e.target.value })
                  setHasChanges(true)
                }}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Würfeltyp</label>
              <select
                value={editedTable.diceType}
                onChange={(e) => {
                  setEditedTable({ ...editedTable, diceType: e.target.value as any })
                  setHasChanges(true)
                }}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="1d6">1W6</option>
                <option value="2d6">2W6</option>
                <option value="3d6">3W6</option>
                <option value="custom">Benutzerdefiniert</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editedTable.allowReroll || false}
                onChange={(e) => {
                  setEditedTable({ ...editedTable, allowReroll: e.target.checked })
                  setHasChanges(true)
                }}
              />
              <span className="text-sm">Neuwürfe erlauben</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editedTable.uniqueOnly || false}
                onChange={(e) => {
                  setEditedTable({ ...editedTable, uniqueOnly: e.target.checked })
                  setHasChanges(true)
                }}
              />
              <span className="text-sm">Nur einzigartige Werte</span>
            </label>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Tabellen-Einträge</h4>
              <Button variant="outline" size="sm" onClick={addEntry}>
                <Plus className="w-4 h-4 mr-1" />
                Eintrag hinzufügen
              </Button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 text-sm font-semibold border-b pb-2">
                <div className="col-span-2">Wurf</div>
                <div className="col-span-5">Wert</div>
                <div className="col-span-4">Beschreibung</div>
                <div className="col-span-1"></div>
              </div>

              {editedTable.entries.map((entry, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formatRange(entry.range)}
                      onChange={(e) => updateEntry(index, 'range', parseRange(e.target.value))}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={typeof entry.value === 'object' ? JSON.stringify(entry.value) : String(entry.value)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value)
                          updateEntry(index, 'value', parsed)
                        } catch {
                          updateEntry(index, 'value', e.target.value as T)
                        }
                      }}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={entry.description || ''}
                      onChange={(e) => updateEntry(index, 'description', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div className="col-span-1 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {hasChanges && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setEditedTable(JSON.parse(JSON.stringify(table)))
                  setHasChanges(false)
                }}
              >
                Änderungen verwerfen
              </Button>
              <Button onClick={handleSave}>
                Änderungen speichern
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}