// 'use client'

// import React from 'react'
// // import { getUserActions } from '@/lib/logger/userActions'
// import { formatPreviousActions } from '@/lib/logger/messageFormatter'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { AlertCircle, RefreshCcw, Clock } from 'lucide-react'

// interface Props {
//   children: React.ReactNode
// }

// interface State {
//   hasError: boolean
//   error?: Error
//   // userActions: Array<{ timestamp: Date; action: string; path: string }>
// }

// export class ErrorBoundary extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props)
//     this.state = { hasError: false }
//   }

//   static getDerivedStateFromError(error: Error): State {
//     // const userActions = getUserActions()
//     return { hasError: true, error }
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     // const userActions = getUserActions()
//     fetch('/api/logs', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         type: 'error',
//         message: `Application Error: ${error.message}`,
//         metadata: {
//           stack: error.stack,
//           componentStack: errorInfo.componentStack,
//           // previousActions: userActions,
//           type: 'react-error'
//         }
//       })
//     }).catch(console.error)
//   }

//   render() {
//     if (this.state.hasError) {
//       // const formattedActions = formatPreviousActions(this.stat)

//       return (
//         <div className='min-h-screen bg-background flex items-center justify-center p-4'>
//           <Card className='max-w-md w-full p-6'>
//             <div className='flex items-center gap-2 text-destructive mb-4'>
//               <AlertCircle className='w-6 h-6' />
//               <h2 className='text-2xl font-bold'>Application Error</h2>
//             </div>

//             <p className='text-muted-foreground mb-6'>
//               We apologize for the inconvenience. An unexpected error has
//               occurred and has been logged for investigation.
//             </p>
//             {/* 
//             {formattedActions.length > 0 && (
//               <div className='mb-6 space-y-3'>
//                 <h3 className='text-lg font-semibold flex items-center gap-2'>
//                   <Clock className='w-5 h-5' />
//                   Recent Activity
//                 </h3>
//                 <ul className='space-y-2 bg-muted p-3 rounded-lg'>
//                   {formattedActions.map((action, index) => (
//                     <li
//                       key={index}
//                       className='text-sm text-muted-foreground flex items-center gap-2'
//                     >
//                       <span className='w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-[10px]'>
//                         {index + 1}
//                       </span>
//                       {action.formattedMessage}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )} */}

//             <Button
//               onClick={() => window.location.reload()}
//               className='w-full'
//               variant='default'
//             >
//               <RefreshCcw className='w-4 h-4 mr-2' />
//               Refresh Page
//             </Button>
//           </Card>
//         </div>
//       )
//     }

//     return this.props.children
//   }
// }


'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, RefreshCcw, Clock } from 'lucide-react';

const MAX_ACTIONS = 3;
let userActions: Array<{ timestamp: Date; action: string; path: string }> = [];


export const trackUserAction = (action: string, path: string) => {
  userActions.unshift({ timestamp: new Date(), action, path });
  if (userActions.length > MAX_ACTIONS) {
    userActions = userActions.slice(0, MAX_ACTIONS);
  }
};

export const getUserActions = () => [...userActions];
export const clearUserActions = () => {
  userActions = [];
};

const formatTimestamp = (timestamp: Date) => timestamp.toLocaleString();

const formatPreviousActions = (actions: Array<{ timestamp: Date; action: string; path: string }>) =>
  actions.map((action) => ({
    formattedMessage: `${formatTimestamp(action.timestamp)}: ${action.action} on ${action.path}`,
  }));

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  userActions: Array<{ timestamp: Date; action: string; path: string }>;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, userActions: [] };
  }

  static getDerivedStateFromError(error: Error): State {
    const userActions = getUserActions();
    return { hasError: true, error, userActions };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const userActions = getUserActions();

    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'error',
        message: `Application Error: ${error.message}`,
        metadata: {
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          previousActions: userActions.map(({ timestamp, action, path }) => ({
            timestamp,
            action,
            path,
          })),
          type: 'react-error',
        },
      }),
    }).catch(console.error);

    clearUserActions();
  }

  render() {
    if (this.state.hasError) {
      const formattedActions = formatPreviousActions(this.state.userActions);

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6">
            <div className="flex items-center gap-2 text-destructive mb-4">
              <AlertCircle className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Application Error</h2>
            </div>

            <p className="text-muted-foreground mb-6">
              We apologize for the inconvenience. An unexpected error has occurred and has been logged for investigation.
            </p>

            {formattedActions.length > 0 && (
              <div className="mb-6 space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </h3>
                <ul className="space-y-2 bg-muted p-3 rounded-lg">
                  {formattedActions.map((action, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">
                        {index + 1}
                      </span>
                      {action.formattedMessage}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button onClick={() => window.location.reload()} className="w-full" variant="default">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export const useUserActionTracker = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target) {
        trackUserAction('Click', window.location.pathname);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
