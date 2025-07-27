import { useCallback, useRef, useEffect } from 'react'

export function useDiceSound() {
  const sounds = useRef<Record<string, HTMLAudioElement>>({})

  useEffect(() => {
    sounds.current = {
      roll: new Audio('/sounds/dice-roll.mp3'),
      land: new Audio('/sounds/dice-land.mp3'),
      critical: new Audio('/sounds/dice-critical.mp3')
    }

    Object.values(sounds.current).forEach(audio => {
      audio.volume = 0.3
    })
  }, [])

  const playDiceSound = useCallback((type: 'roll' | 'land' | 'critical' = 'roll') => {
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false'
    
    if (soundEnabled && sounds.current[type]) {
      const audio = sounds.current[type]
      audio.currentTime = 0
      audio.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [])

  return { playDiceSound }
}