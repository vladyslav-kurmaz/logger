'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDemoProps {
  onTriggerError: () => void;
}

export function ErrorDemo({ onTriggerError }: ErrorDemoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Error Handling Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Test our error handling by triggering a sample error. The system will:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-sm text-muted-foreground">
          <li>Capture the error details</li>
          <li>Log the last 3 user actions</li>
          <li>Display a user-friendly error page</li>
        </ul>
        <Button 
          variant="destructive" 
          onClick={onTriggerError}
          data-action="test-error"
          className="w-full"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Trigger Test Error
        </Button>
      </CardContent>
    </Card>
  );
}