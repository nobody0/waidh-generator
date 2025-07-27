import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import { DiceFace } from './DiceFace'
import { cn } from '@/lib/utils'

interface SingleDice3DProps {
  index: number
  trigger?: number
  onComplete: (result: number) => void
}

export function SingleDice3D({ index, trigger, onComplete }: SingleDice3DProps) {
  const [result, setResult] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const controls = useAnimation()
  
  const faces = {
    1: { rotateX: 0, rotateY: 0 },
    2: { rotateX: 0, rotateY: 180 },
    3: { rotateX: 0, rotateY: -90 },
    4: { rotateX: 0, rotateY: 90 },
    5: { rotateX: -90, rotateY: 0 },
    6: { rotateX: 90, rotateY: 0 }
  }

  useEffect(() => {
    if (trigger) {
      rollDice()
    }
  }, [trigger])

  const rollDice = async () => {
    setIsRolling(true)
    
    const finalResult = Math.floor(Math.random() * 6) + 1
    
    await controls.start({
      rotateX: [0, 720 + Math.random() * 360],
      rotateY: [0, 720 + Math.random() * 360],
      rotateZ: [0, 360 + Math.random() * 180],
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5 + index * 0.1,
        ease: [0.17, 0.67, 0.83, 0.67],
        times: [0, 0.5, 1]
      }
    })
    
    await controls.start({
      ...faces[finalResult as keyof typeof faces],
      rotateZ: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    })
    
    setResult(finalResult)
    setIsRolling(false)
    onComplete(finalResult)
  }

  return (
    <motion.div
      className="dice-3d-wrapper perspective-1000"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="dice-3d w-16 h-16 relative transform-style-3d"
        animate={controls}
        style={{ transformStyle: "preserve-3d" }}
      >
        <DiceFace number={1} position="front" />
        <DiceFace number={2} position="back" />
        <DiceFace number={3} position="left" />
        <DiceFace number={4} position="right" />
        <DiceFace number={5} position="top" />
        <DiceFace number={6} position="bottom" />
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="steel-shine" />
        </div>
      </motion.div>
      
      <motion.div 
        className="dice-shadow"
        animate={{
          scale: isRolling ? [1, 1.3, 1] : 1,
          opacity: isRolling ? [0.3, 0.1, 0.3] : 0.3
        }}
      />
    </motion.div>
  )
}