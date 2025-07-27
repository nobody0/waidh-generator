import { Pentagon } from '@/components/icons/Pentagon'
import { cn } from '@/lib/utils'

interface DiceFaceProps {
  number: number 
  position: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom'
}

const getDotPositions = (number: number) => {
  const positions: Record<number, Array<{x: number, y: number}>> = {
    1: [{x: 50, y: 50}],
    2: [{x: 25, y: 25}, {x: 75, y: 75}],
    3: [{x: 25, y: 25}, {x: 50, y: 50}, {x: 75, y: 75}],
    4: [{x: 25, y: 25}, {x: 75, y: 25}, {x: 25, y: 75}, {x: 75, y: 75}],
    5: [{x: 25, y: 25}, {x: 75, y: 25}, {x: 50, y: 50}, {x: 25, y: 75}, {x: 75, y: 75}],
    6: [{x: 25, y: 20}, {x: 75, y: 20}, {x: 25, y: 50}, {x: 75, y: 50}, {x: 25, y: 80}, {x: 75, y: 80}]
  }
  return positions[number] || []
}

export function DiceFace({ number, position }: DiceFaceProps) {
  const transforms = {
    front: 'translateZ(32px)',
    back: 'translateZ(-32px) rotateY(180deg)',
    left: 'translateX(-32px) rotateY(-90deg)',
    right: 'translateX(32px) rotateY(90deg)',
    top: 'translateY(-32px) rotateX(90deg)',
    bottom: 'translateY(32px) rotateX(-90deg)'
  }

  const dots = getDotPositions(number)

  return (
    <div
      className={cn(
        "dice-face absolute w-16 h-16",
        "bg-gradient-to-br from-steel-400 to-steel-600",
        "border border-steel-700/50",
        "flex items-center justify-center"
      )}
      style={{ transform: transforms[position] }}
    >
      <Pentagon className="absolute w-12 h-12 text-steel-500/20" />
      
      <div className="dice-dots relative w-full h-full p-2">
        {dots.map((pos, i) => (
          <div
            key={i}
            className="dice-dot absolute w-3 h-3 bg-steel-900 rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
            }}
          />
        ))}
      </div>
      
      <span className="absolute bottom-1 right-1 text-xs font-mono text-steel-700/50">
        {number}
      </span>
    </div>
  )
}