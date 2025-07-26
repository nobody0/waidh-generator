import { useState, useEffect, useCallback, useRef } from 'react'
import type { Monster } from '@/types/monster'

const STORAGE_KEY = 'waidh-monster-history'
const MAX_HISTORY = 100

export function useMonsterHistory() {
  const [history, setHistory] = useState<Monster[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const lastAddedId = useRef<string>('')

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setHistory(parsed)
        if (parsed.length > 0) {
          setCurrentIndex(parsed.length - 1)
        }
      } catch (e) {
        console.error('Failed to load monster history:', e)
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

  const addMonster = useCallback((monster: Monster) => {
    // Prevent duplicate adds by checking creation time
    const monsterId = `${monster.createdAt.getTime()}-${monster.age.id}`
    if (lastAddedId.current === monsterId) {
      return
    }
    lastAddedId.current = monsterId

    setHistory(prev => {
      const newHistory = [...prev, monster]
      // Keep only the last MAX_HISTORY monsters
      if (newHistory.length > MAX_HISTORY) {
        return newHistory.slice(-MAX_HISTORY)
      }
      return newHistory
    })
    setCurrentIndex(prev => prev + 1) // Point to the newly added monster
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

  const currentMonster = currentIndex >= 0 && currentIndex < history.length 
    ? history[currentIndex] 
    : null

  return {
    history,
    currentMonster,
    currentIndex,
    historyLength: history.length,
    canGoPrevious: currentIndex > 0,
    canGoNext: currentIndex < history.length - 1,
    addMonster,
    goToPrevious,
    goToNext,
    deleteCurrent,
    clearHistory
  }
}