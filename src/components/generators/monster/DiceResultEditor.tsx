import { useState } from 'react'
import { Check, X, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface DiceResultEditorProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  className?: string
}

export function DiceResultEditor({ 
  value, 
  min = 1, 
  max = 6, 
  onChange,
  className 
}: DiceResultEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value.toString())

  const handleSave = () => {
    const newValue = parseInt(editValue, 10)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value.toString())
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          className="h-6 w-12 text-xs text-center p-1"
          autoFocus
        />
        <Button size="icon" variant="ghost" onClick={handleSave} className="h-5 w-5">
          <Check className="h-3 w-3" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleCancel} className="h-5 w-5">
          <X className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <span className="text-[10px] text-muted-foreground">
        (W:{value})
      </span>
      <Button 
        size="icon" 
        variant="ghost" 
        onClick={() => setIsEditing(true)}
        className="h-4 w-4 opacity-50 hover:opacity-100"
      >
        <Edit2 className="h-3 w-3" />
      </Button>
    </div>
  )
}