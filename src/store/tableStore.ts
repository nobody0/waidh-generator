import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DiceTable } from '@/types/dice'

interface CustomTable {
  id: string
  table: DiceTable<any>
  lastModified: Date
}

interface TableStore {
  customTables: Map<string, CustomTable>
  addCustomTable: (table: DiceTable<any>) => void
  updateCustomTable: (tableId: string, table: DiceTable<any>) => void
  removeCustomTable: (tableId: string) => void
  getCustomTable: (tableId: string) => DiceTable<any> | undefined
  importTables: (tables: DiceTable<any>[]) => void
  exportTables: () => DiceTable<any>[]
  clearAllTables: () => void
}

export const useTableStore = create<TableStore>()(
  persist(
    (set, get) => ({
      customTables: new Map(),
      
      addCustomTable: (table) => {
        set((state) => {
          const newTables = new Map(state.customTables)
          newTables.set(table.id, {
            id: table.id,
            table,
            lastModified: new Date()
          })
          return { customTables: newTables }
        })
      },
      
      updateCustomTable: (tableId, table) => {
        set((state) => {
          const newTables = new Map(state.customTables)
          if (newTables.has(tableId)) {
            newTables.set(tableId, {
              id: tableId,
              table,
              lastModified: new Date()
            })
          }
          return { customTables: newTables }
        })
      },
      
      removeCustomTable: (tableId) => {
        set((state) => {
          const newTables = new Map(state.customTables)
          newTables.delete(tableId)
          return { customTables: newTables }
        })
      },
      
      getCustomTable: (tableId) => {
        const custom = get().customTables.get(tableId)
        return custom?.table
      },
      
      importTables: (tables) => {
        set((state) => {
          const newTables = new Map(state.customTables)
          tables.forEach(table => {
            newTables.set(table.id, {
              id: table.id,
              table,
              lastModified: new Date()
            })
          })
          return { customTables: newTables }
        })
      },
      
      exportTables: () => {
        return Array.from(get().customTables.values()).map(ct => ct.table)
      },
      
      clearAllTables: () => {
        set({ customTables: new Map() })
      }
    }),
    {
      name: 'waidh-custom-tables',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const { state } = JSON.parse(str)
          return {
            state: {
              ...state,
              customTables: new Map(state.customTables)
            }
          }
        },
        setItem: (name, value) => {
          const { state } = value as { state: TableStore }
          const serialized = {
            state: {
              ...state,
              customTables: Array.from(state.customTables.entries())
            }
          }
          localStorage.setItem(name, JSON.stringify(serialized))
        },
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
)