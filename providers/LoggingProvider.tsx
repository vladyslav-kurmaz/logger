'use client';
import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LogAction } from '@/types';

type LoggingContextType = {
  logAction: (action: LogAction) => Promise<void>;
  logError: (error: Error, path: string) => Promise<void>;
};

const LoggingContext = createContext<LoggingContextType | undefined>(undefined);

export const useLogging = (): LoggingContextType => {
  const context = useContext(LoggingContext);
  if (!context) {
    throw new Error('useLogging must be used within a LoggingProvider');
  }
  return context;
};

export const LoggingProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const logAction = async ({ actionType, data, path }: LogAction) => {
    try {
      if (!path) {
        console.error('No path provided for logAction');
        return;
      }
      console.log(data);
      
      await fetch('/api/logs/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionType, data, path, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  };

  const logError = async (error: Error, path: string) => {
    try {
      if (!path) {
        console.error('No path provided for logError');
        return;
      }

      await fetch('/api/logs/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: error.message, stack: error.stack, path, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  };

  useEffect(() => {
    if (pathname) {
      logAction({
        actionType: 'PageView',
        data: { title: document.title, pathname },
        path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleGlobalError = (error: ErrorEvent) => {
      logError(new Error(error.message), window.location.pathname);
    };
    window.addEventListener('error', handleGlobalError);
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      logAction({
        actionType: 'Click',
        data: { target: element.tagName, text: element.textContent },
        path: window.location.pathname,
      });
    };

    const handleScroll = () => {
      logAction({
        actionType: 'Scroll',
        data: { scrollTop: window.scrollY },
        path: window.location.pathname,
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <LoggingContext.Provider value={{ logAction, logError }}>
      {children}
    </LoggingContext.Provider>
  );
};
