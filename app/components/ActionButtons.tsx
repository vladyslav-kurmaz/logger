'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { AlertCircle, ClipboardList, Zap } from 'lucide-react';

interface ActionButtonsProps {
  onTestAction: () => void;
  onTestError: () => void;
}

export function ActionButtons({ onTestAction, onTestError }: ActionButtonsProps) {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          className="flex items-center gap-2"
          data-action="test-action"
          onClick={onTestAction}
        >
          <Zap className="w-4 h-4" />
          Test Action Log
        </Button>
        
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          data-action="test-error"
          onClick={onTestError}
        >
          <AlertCircle className="w-4 h-4" />
          Test Error Log
        </Button>
        
        <Button
          variant="outline"
          className="flex items-center gap-2"
          asChild
        >
          <Link href="/logs" data-action="view-logs">
            <ClipboardList className="w-4 h-4" />
            View Logs
          </Link>
        </Button>
      </div>
    </Card>
  );
}