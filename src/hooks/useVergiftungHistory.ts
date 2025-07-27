import { useState, useCallback } from 'react'
import type { VergiftungWurf } from '@/types/vergiftung'

const MAX_HISTORY_SIZE = 15

export function useVergiftungHistory() {
  const [history, setHistory] = useState<VergiftungWurf[]>([])
  
  const addWurf = useCallback((wurf: VergiftungWurf) => {
    setHistory(prev => {
      const updated = [wurf, ...prev]
      
      // Begrenze History-Größe
      if (updated.length > MAX_HISTORY_SIZE) {
        return updated.slice(0, MAX_HISTORY_SIZE)
      }
      
      return updated
    })
  }, [])
  
  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])
  
  return {
    history,
    addWurf,
    clearHistory
  }
}