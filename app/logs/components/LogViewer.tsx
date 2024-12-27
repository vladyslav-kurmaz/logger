'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { AlertCircle, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LogViewerProps {
  logs: any[];
  onClearLogs: () => void;
}

export function LogViewer({ logs, onClearLogs }: LogViewerProps) {
  const actionLogs = logs.filter(log => log.type === 'action');
  const errorLogs = logs.filter(log => log.type === 'error');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Application Logs</CardTitle>
        <Button variant="destructive" onClick={onClearLogs}>Clear Logs</Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="actions">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="actions">
              Actions ({actionLogs.length})
            </TabsTrigger>
            <TabsTrigger value="errors">
              Errors ({errorLogs.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="actions">
            <LogList logs={actionLogs} type="action" />
          </TabsContent>
          <TabsContent value="errors">
            <LogList logs={errorLogs} type="error" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function LogList({ logs, type }: { logs: any[], type: 'action' | 'error' }) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {logs.map((log) => (
        <LogEntry key={log.id} log={log} type={type} />
      ))}
    </Accordion>
  );
}

function LogEntry({ log, type }: { log: any, type: 'action' | 'error' }) {
  const metadata = log.metadata ? JSON.parse(log.metadata) : {};
  const previousActions = metadata.previousActions || [];
  
  return (
    <AccordionItem value={log.id} className="border rounded-lg p-2">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-4 text-left">
          <Badge variant={type === 'error' ? 'destructive' : 'default'}>
            {type === 'error' ? <AlertCircle className="w-4 h-4 mr-1" /> : <Info className="w-4 h-4 mr-1" />}
            {type}
          </Badge>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
          </span>
          <span className="font-normal">{log.message}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-4">
          {type === 'error' && previousActions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Previous Actions:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {previousActions.map((action: any, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {format(new Date(action.timestamp), 'HH:mm:ss')} - {action.action}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="space-y-2">
            <h4 className="font-semibold">Details:</h4>
            <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}