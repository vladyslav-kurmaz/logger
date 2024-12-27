'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { LoggerProvider } from '@/lib/logger/context'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Toaster } from '@/components/ui/toaster'

import { Logger } from '@/lib/logger/logger'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <LoggerProvider>
        <ErrorBoundary>
          <Logger />
          {children}
        </ErrorBoundary>
        <Toaster />
      </LoggerProvider>
    </ChakraProvider>
  )
}
