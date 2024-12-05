export type ClientLog = {
  id: number;
  actionType: string;
  data: object;
  path: string;
  timestamp: string;
};

export type ErrorLog = {
  id: number;
  errorMessage: string;
  stackTrace: string | null;
  path: string;
  timestamp: string;
};

export type LogAction = {
  actionType: string;
  data?: object;
  path: string;
};