import { useState, useCallback } from 'react'
import type { SchicksalWurf } from '@/types/schicksal'

const MAX_HISTORY_SIZE = 10

export function useSchicksalHistory() {
  const [history, setHistory] = useState<SchicksalWurf[]>([])
  
  const addWurf = useCallback((wurf: SchicksalWurf) => {
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