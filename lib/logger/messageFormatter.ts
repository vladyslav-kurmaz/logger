// 'use client';

// import { format } from 'date-fns';

// // Enhanced action descriptions with more context
// const actionDescriptions: Record<string, (metadata: any) => string> = {
//   'test-action': () => 'clicked the "Test Action" button to verify logging functionality',
//   'test-error': () => 'triggered a test error to verify error handling',
//   'view-logs': () => 'accessed the logs page to view application activity',
//   'clear-logs': () => 'cleared all application logs from the system',
//   'default': (metadata) => `performed action "${metadata?.action || 'unknown'}"`,
// };

// // Enhanced error descriptions with more context
// const errorDescriptions: Record<string, (error: string, metadata: any) => string> = {
//   'unhandled-error': (error, metadata) => 
//     `An unexpected error occurred while ${getContextualAction(metadata)}: ${error}`,
//   'unhandled-rejection': (error, metadata) => 
//     `A promise was rejected while ${getContextualAction(metadata)}: ${error}`,
//   'react-error': (error, metadata) => 
//     `A React component error occurred while ${getContextualAction(metadata)}: ${error}`,
//   'default': (error, metadata) => 
//     `An error occurred while ${getContextualAction(metadata)}: ${error}`,
// };

// function getContextualAction(metadata: any): string {
//   const path = metadata?.path || 'unknown';
//   const action = metadata?.action || 'performing an action';
  
//   if (path === '/') return `on the home page while ${action}`;
//   return `on the ${path.replace('/', '').replace(/-/g, ' ')} page while ${action}`;
// }

// export const formatActionMessage = (action: string, metadata?: Record<string, any>) => {
//   const getDescription = actionDescriptions[action] || actionDescriptions.default;
//   return `User ${getDescription(metadata)}`;
// };

// export const formatErrorMessage = (error: string, metadata?: Record<string, any>) => {
//   const errorType = metadata?.type || 'default';
//   const getDescription = errorDescriptions[errorType] || errorDescriptions.default;
//   return getDescription(error, metadata);
// };

// export const formatPreviousActions = (actions: Array<{ timestamp: Date; action: string; path: string }>) => {
//   return actions.map(action => ({
//     ...action,
//     formattedMessage: `${format(new Date(action.timestamp), 'HH:mm:ss')} - ${formatActionMessage(action.action, { path: action.path })}`
//   }));
// };

'use client';

import { format } from 'date-fns';

// Enhanced action descriptions with more context
const actionDescriptions: Record<string, (metadata: any) => string> = {
  'test-action': () => 'clicked the "Test Action" button to verify logging functionality',
  'test-error': () => 'triggered a test error to verify error handling',
  'view-logs': () => 'accessed the logs page to view application activity',
  'clear-logs': () => 'cleared all application logs from the system',
  'default': (metadata) => `performed action "${metadata?.action || 'unknown'}"`,
};

// Enhanced error descriptions with more context
const errorDescriptions: Record<string, (error: string, metadata: any) => string> = {
  'unhandled-error': (error, metadata) => 
    `An unexpected error occurred while ${getContextualAction(metadata)}: ${error}`,
  'unhandled-rejection': (error, metadata) => 
    `A promise was rejected while ${getContextualAction(metadata)}: ${error}`,
  'react-error': (error, metadata) => 
    `A React component error occurred while ${getContextualAction(metadata)}: ${error}`,
  'default': (error, metadata) => 
    `An error occurred while ${getContextualAction(metadata)}: ${error}`,
};

// Enhanced navigation descriptions with more context
const navigationDescriptions: Record<string, (metadata: any) => string> = {
  'default': (metadata) => `navigated to ${metadata?.path || 'unknown page'}`,
};

function getContextualAction(metadata: any): string {
  const path = metadata?.path || 'unknown';
  const action = metadata?.action || 'performing an action';
  
  if (path === '/') return `on the home page while ${action}`;
  return `on the ${path.replace('/', '').replace(/-/g, ' ')} page while ${action}`;
}

export const formatActionMessage = (action: string, metadata?: Record<string, any>) => {
  const getDescription = actionDescriptions[action] || actionDescriptions.default;
  return `User ${getDescription(metadata)}`;
};

export const formatErrorMessage = (error: string, metadata?: Record<string, any>) => {
  const errorType = metadata?.type || 'default';
  const getDescription = errorDescriptions[errorType] || errorDescriptions.default;
  return getDescription(error, metadata);
};

// New function for formatting navigation messages
export const formatNavigationMessage = (metadata?: Record<string, any>) => {
  const getDescription = navigationDescriptions['default'];
  return `User ${getDescription(metadata)}`;
};

export const formatPreviousActions = (actions: Array<{ timestamp: Date; action: string; path: string }>) => {
  return actions.map(action => ({
    ...action,
    formattedMessage: `${format(new Date(action.timestamp), 'HH:mm:ss')} - ${formatActionMessage(action.action, { path: action.path })}`
  }));
};
