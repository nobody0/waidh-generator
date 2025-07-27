import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CriticalEffectProps {
  type: 'success' | 'failure'
  show: boolean
}

export function CriticalEffect({ type, show }: CriticalEffectProps) {
  if (!show) return null

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0.8, 1.5, 1.2]
      }}
      transition={{ duration: 1 }}
    >
      <div className={cn(
        "w-full h-full rounded-full",
        type === 'success' 
          ? "bg-aspect-heiler/30 shadow-[0_0_60px_20px_rgba(70,130,180,0.5)]"
          : "bg-rust-500/30 shadow-[0_0_60px_20px_rgba(139,69,19,0.5)]"
      )} />
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className={cn(
          "font-medieval text-4xl font-bold",
          type === 'success' ? "text-aspect-heiler" : "text-rust-500"
        )}>
          {type === 'success' ? 'Kritisch!' : 'Patzer!'}
        </span>
      </motion.div>
    </motion.div>
  )
}