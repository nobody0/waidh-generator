import { Dices } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DiceResultEditorProps {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function DiceResultEditor({ 
  value, 
  min, 
  max, 
  onChange,
  disabled = false
}: DiceResultEditorProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className="inline-flex items-center gap-1 ml-auto">
      <Dices className="w-3 h-3 text-muted-foreground" />
      <div className="flex items-center">
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
          onClick={handleDecrease}
          disabled={disabled || value <= min}
        >
          -
        </Button>
        <span className="w-6 text-center text-xs font-medium">{value}</span>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
          onClick={handleIncrease}
          disabled={disabled || value >= max}
        >
          +
        </Button>
      </div>
    </div>
  )
}