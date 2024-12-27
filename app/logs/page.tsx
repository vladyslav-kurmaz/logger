'use client';

import { Container } from '@chakra-ui/react';
import useSWR from 'swr';
import { fetchLogs, clearLogs } from '@/lib/logger/api';
import { LogViewer } from './components/LogViewer';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function LogsPage() {
  const { toast } = useToast();
  const { data: logs, mutate } = useSWR('/api/logs', fetchLogs, {
    refreshInterval: 5000,
  });

  const handleClearLogs = async () => {
    try {
      await clearLogs();
      await mutate();
      toast({
        title: "Success",
        description: "All logs have been cleared",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear logs",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Container maxW="container.xl" py={8}>
        <LogViewer logs={logs || []} onClearLogs={handleClearLogs} />
      </Container>
      <Toaster />
    </>
  );
}