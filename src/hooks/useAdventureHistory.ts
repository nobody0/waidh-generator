import { useState, useEffect, useCallback, useRef } from 'react'
import type { AdventureQuest } from '@/types/adventure'

const STORAGE_KEY = 'waidh-adventure-history'
const MAX_HISTORY = 100

export function useAdventureHistory() {
  const [history, setHistory] = useState<AdventureQuest[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const lastAddedId = useRef<string>('')

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Convert date strings back to Date objects
        const questsWithDates = parsed.map((quest: any) => ({
          ...quest,
          createdAt: new Date(quest.createdAt)
        }))
        setHistory(questsWithDates)
        if (questsWithDates.length > 0) {
          setCurrentIndex(questsWithDates.length - 1)
        }
      } catch (e) {
        console.error('Failed to load adventure history:', e)
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

  const addQuest = useCallback((quest: AdventureQuest) => {
    // Prevent duplicate adds by checking creation time
    const questId = `${quest.createdAt.getTime()}-${quest.problem.id}-${quest.trigger.id}`
    if (lastAddedId.current === questId) {
      return
    }
    lastAddedId.current = questId

    setHistory(prev => {
      const newHistory = [...prev, quest]
      // Keep only the last MAX_HISTORY quests
      if (newHistory.length > MAX_HISTORY) {
        return newHistory.slice(-MAX_HISTORY)
      }
      return newHistory
    })
    setCurrentIndex(prev => prev + 1) // Point to the newly added quest
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

  const currentQuest = currentIndex >= 0 && currentIndex < history.length 
    ? history[currentIndex] 
    : null

  return {
    history,
    currentQuest,
    currentIndex,
    historyLength: history.length,
    canGoPrevious: currentIndex > 0,
    canGoNext: currentIndex < history.length - 1,
    addQuest,
    goToPrevious,
    goToNext,
    deleteCurrent,
    clearHistory
  }
}