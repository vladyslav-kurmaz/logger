// import { LogEntry } from './types';

// export async function fetchLogs(type?: string) {
//   const url = type ? `/api/logs?type=${type}` : '/api/logs';
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch logs');
//   }
//   return response.json();
// }

// export async function createLog(entry: LogEntry) {
//   const response = await fetch('/api/logs', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(entry),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to create log');
//   }
//   return response.json();
// }

// export async function clearLogs() {
//   const response = await fetch('/api/logs', { method: 'DELETE' });
//   if (!response.ok) {
//     throw new Error('Failed to clear logs');
//   }
//   return response.json();
// }

import { LogEntry } from './types';

export async function fetchLogs(type?: string) {
  const url = type ? `/api/logs?type=${type}` : '/api/logs';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch logs');
  }
  return response.json();
}

export async function createLog(entry: LogEntry) {
  const response = await fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!response.ok) {
    throw new Error('Failed to create log');
  }
  return response.json();
}

export async function clearLogs() {
  const response = await fetch('/api/logs', { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to clear logs');
  }
  return response.json();
}
