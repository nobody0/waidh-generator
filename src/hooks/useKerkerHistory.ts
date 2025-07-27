import { useState, useEffect, useCallback, useRef } from 'react'
import type { KerkerElementar } from '@/types/kerker'

const STORAGE_KEY = 'waidh-kerker-history'
const MAX_HISTORY = 50

export function useKerkerHistory() {
  const [history, setHistory] = useState<KerkerElementar[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const lastAddedId = useRef<string>('')

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Convert date strings back to Date objects
        const kerkers = parsed.map((k: any) => ({
          ...k,
          createdAt: new Date(k.createdAt)
        }))
        setHistory(kerkers)
        if (kerkers.length > 0) {
          setCurrentIndex(kerkers.length - 1)
        }
      } catch (e) {
        console.error('Failed to load kerker history:', e)
      }
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [history])

  const addKerker = useCallback((kerker: KerkerElementar) => {
    // Prevent duplicate adds by checking creation time and theme
    const kerkerId = `${kerker.createdAt.getTime()}-${kerker.theme.id}-${kerker.chamberCount}`
    if (lastAddedId.current === kerkerId) {
      return
    }
    lastAddedId.current = kerkerId

    setHistory(prev => {
      const newHistory = [...prev, kerker]
      // Keep only the last MAX_HISTORY kerkers
      if (newHistory.length > MAX_HISTORY) {
        return newHistory.slice(-MAX_HISTORY)
      }
      return newHistory
    })
    setCurrentIndex(prev => prev + 1) // Point to the newly added kerker
  }, [])

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
      // Adjust current index
      if (currentIndex >= history.length - 1) {
        setCurrentIndex(Math.max(0, history.length - 2))
      }
    }
  }, [currentIndex, history.length])

  const clearHistory = useCallback(() => {
    setHistory([])
    setCurrentIndex(-1)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const currentKerker = currentIndex >= 0 && currentIndex < history.length 
    ? history[currentIndex] 
    : null

  return {
    history,
    currentKerker,
    currentIndex,
    historyLength: history.length,
    canGoPrevious: currentIndex > 0,
    canGoNext: currentIndex < history.length - 1,
    addKerker,
    goToPrevious,
    goToNext,
    deleteCurrent,
    clearHistory
  }
}