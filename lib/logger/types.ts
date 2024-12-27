export type LogType = 'action' | 'error' | 'api' | 'event' | 'navigation';

export type LoggerContextType = {
  log: (entry: LogEntry) => Promise<void>;
  clearLogs: () => Promise<void>;
  getUserActions: () => { timestamp: Date; action: string; path: string; }[];
};


export interface UserAction {
  timestamp: Date;
  action: string;
  path: string;
}

export interface LogEntry {
  type: 'action' | 'error';
  message: string;
  metadata?: Record<string, any>;
}