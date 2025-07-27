import { useState, useCallback } from 'react'
import type { NSC } from '@/types/nsc'

const MAX_HISTORY_SIZE = 20

export function useNSCHistory() {
  const [history, setHistory] = useState<NSC[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  
  const addNSC = useCallback((nsc: NSC) => {
    setHistory(prev => {
      // Wenn wir mitten in der History sind, schneide alles nach dem aktuellen Index ab
      const newHistory = currentIndex < prev.length - 1 
        ? prev.slice(0, currentIndex + 1)
        : prev
      
      // Füge neuen NSC hinzu
      const updated = [...newHistory, nsc]
      
      // Begrenze History-Größe
      if (updated.length > MAX_HISTORY_SIZE) {
        return updated.slice(updated.length - MAX_HISTORY_SIZE)
      }
      
      return updated
    })
    
    // Setze Index auf das neue Element
    setCurrentIndex(prev => {
      const newLength = history.length + 1
      return Math.min(prev + 1, newLength - 1)
    })
  }, [currentIndex, history.length])
  
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])
  
  const goToNext = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }, [currentIndex, history.length])
  
  const deleteCurrent = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < history.length) {
      setHistory(prev => {
        const newHistory = [...prev]
        newHistory.splice(currentIndex, 1)
        return newHistory
      })
      
      // Passe Index an
      if (history.length === 1) {
        // Letzes Element gelöscht
        setCurrentIndex(-1)
      } else if (currentIndex >= history.length - 1) {
        // Am Ende der Liste
        setCurrentIndex(currentIndex - 1)
      }
      // Sonst bleibt Index gleich (zeigt auf nächstes Element)
    }
  }, [currentIndex, history.length])
  
  const clearHistory = useCallback(() => {
    setHistory([])
    setCurrentIndex(-1)
  }, [])
  
  return {
    history,
    historyLength: history.length,
    currentIndex,
    currentNSC: currentIndex >= 0 ? history[currentIndex] : null,
    canGoPrevious: currentIndex > 0,
    canGoNext: currentIndex < history.length - 1,
    addNSC,
    goToPrevious,
    goToNext,
    deleteCurrent,
    clearHistory
  }
}