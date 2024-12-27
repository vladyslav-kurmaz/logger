export interface LogEntry {
    type: 'action' | 'error';
    message: string;
    metadata?: Record<string, any>;
  }
  
  export const createLog = async (entry: LogEntry) => {
    try {

      console.log('Log entry:', entry);
    } catch (error) {
      console.error('Failed to log entry:', error);
    }
  };