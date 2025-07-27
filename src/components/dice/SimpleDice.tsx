import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SimpleDiceProps {
  value: number
  isRolling: boolean
  delay?: number
}

export function SimpleDice({ value, isRolling, delay = 0 }: SimpleDiceProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ 
        scale: 1,
        rotate: isRolling ? 720 : 0
      }}
      transition={{
        delay,
        duration: isRolling ? 1 : 0.3,
        ease: "easeOut"
      }}
      className={cn(
        "w-16 h-16 rounded-lg flex items-center justify-center",
        "bg-gradient-to-br from-steel-400 to-steel-600",
        "shadow-lg text-white font-bold text-2xl",
        "border-2 border-steel-700",
        isRolling && "animate-pulse"
      )}
    >
      {!isRolling && value}
    </motion.div>
  )
}