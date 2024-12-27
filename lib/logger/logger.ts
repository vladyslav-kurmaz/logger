'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LogEntry } from './types'

export const createLog = async (entry: LogEntry) => {
  try {
    const response = await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    })

    if (!response.ok) {
      throw new Error('Failed to log entry')
    }
  } catch (error) {
    console.error('Failed to send log to API:', error)
  }
}

export const Logger = () => {
  const pathname = usePathname()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (target) {
        const logEntry: LogEntry = {
          type: 'action',
          message: `User clicked on ${target.tagName}`,
          metadata: {
            timestamp: new Date().toISOString(),
            tag: target.tagName,
            id: target.id || null,
            classList: target.className || null
          }
        }
        createLog(logEntry)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement

      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
      ) {
        const logEntry: LogEntry = {
          type: 'action',
          message: `User entered text in ${target.tagName}`,
          metadata: {
            timestamp: new Date().toISOString(),
            tag: target.tagName,
            id: target.id || null,
            classList: target.className || null,
            value: target.value || null
          }
        }
        createLog(logEntry)
      }
    }

    document.addEventListener('input', handleInput)

    return () => {
      document.removeEventListener('input', handleInput)
    }
  }, [])

  useEffect(() => {
    const handleChange = (event: Event) => {
      const target = event.target as HTMLSelectElement

      if (target && target.tagName === 'SELECT') {
        const logEntry: LogEntry = {
          type: 'action',
          message: `User selected value in ${target.tagName}`,
          metadata: {
            timestamp: new Date().toISOString(),
            tag: target.tagName,
            id: target.id || null,
            classList: target.className || null,
            value: target.value
          }
        }
        createLog(logEntry)
      }
    }

    document.addEventListener('change', handleChange)

    return () => {
      document.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    const handleFormSubmit = (event: Event) => {
      const target = event.target as HTMLFormElement

      if (target) {
        const formData = new FormData(target)
        const entries = Object.fromEntries(formData.entries())
        const emptyFields = Object.entries(entries).filter(
          ([_, value]) => !value
        )

        if (emptyFields.length > 0) {
          const logEntry: LogEntry = {
            type: 'error',
            message: `Form submitted with empty fields`,
            metadata: {
              timestamp: new Date().toISOString(),
              emptyFields: emptyFields.map(([field]) => field)
            }
          }
          createLog(logEntry)
        } else {
          const logEntry: LogEntry = {
            type: 'action',
            message: `Form submitted successfully`,
            metadata: {
              timestamp: new Date().toISOString(),
              formData: entries
            }
          }
          createLog(logEntry)
        }
      }
    }

    document.addEventListener('submit', handleFormSubmit)

    return () => {
      document.removeEventListener('submit', handleFormSubmit)
    }
  }, [])

  useEffect(() => {
    let previousPath = ''

    const logPageView = () => {
      if (pathname !== previousPath) {
        const logEntry: LogEntry = {
          type: 'action',
          message: `Page navigated to ${pathname}`,
          metadata: {
            timestamp: new Date().toISOString(),
            previousPath,
            currentPath: pathname
          }
        }
        createLog(logEntry)
        previousPath = pathname
      }
    }

    logPageView()
  }, [pathname])

  useEffect(() => {
    const handleError = (
      message: string | Event,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) => {
      const logEntry: LogEntry = {
        type: 'error',
        message: typeof message === 'string' ? message : 'Unknown error',
        metadata: {
          timestamp: new Date().toISOString(),
          source,
          lineno,
          colno,
          stack: error?.stack || null
        }
      }
      createLog(logEntry)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const logEntry: LogEntry = {
        type: 'error',
        message: 'Unhandled promise rejection',
        metadata: {
          timestamp: new Date().toISOString(),
          reason: event.reason
        }
      }
      createLog(logEntry)
    }

    window.onerror = handleError
    window.onunhandledrejection = handleUnhandledRejection

    return () => {
      window.onerror = null
      window.onunhandledrejection = null
    }
  }, [])

  return null
}
