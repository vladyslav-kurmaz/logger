
'use client'

import { createContext, useContext, ReactNode, useMemo } from 'react'
import { LoggerContextType, LogEntry } from './types'
import { createLog, clearLogs as clearAllLogs } from './api'
import { getUserActions, clearUserActions } from './userActions'

type LogActionType = 'error' | 'action' | 'api' | 'event' | 'navigation'

const LoggerContext = createContext<LoggerContextType | undefined>(undefined)

export function LoggerProvider({ children }: { children: ReactNode }) {
  const contextValue = useMemo(
    () => ({
      log: async (entry: LogEntry) => {
        try {
          if (entry.type === 'error') {
            const actions = getUserActions()
            entry.metadata = {
              ...entry.metadata,
              previousActions: actions.map((action) => ({
                timestamp: action.timestamp,
                action: action.action,
                path: action.path
              }))
            }
            clearUserActions()
          }

          await createLog(entry)
        } catch (error) {
          console.error('Failed to log entry:', error)
        }
      },

      clearLogs: async () => {
        try {
          await clearAllLogs()
          clearUserActions()
        } catch (error) {
          console.error('Failed to clear logs:', error)
        }
      },

      getUserActions
    }),
    []
  )

  return (
    <LoggerContext.Provider value={contextValue}>
      {children}
    </LoggerContext.Provider>
  )
}

export function useLogger() {
  const context = useContext(LoggerContext)
  if (!context) {
    throw new Error('useLogger must be used within a LoggerProvider')
  }
  return context
}
