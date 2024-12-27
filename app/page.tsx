'use client';

import { Container } from '@chakra-ui/react';
import { useLogger } from '@/lib/logger/context';
import { useEffect } from 'react';

import { Header } from './components/Header';
import { ActionButtons } from './components/ActionButtons';
import { ErrorDemo } from './components/ErrorDemo';

export default function Home() {
  const { log } = useLogger();

  const handleTestError = () => {
    throw new Error('Test error triggered by user');
  };

  const handleTestAction = () => {
    log({
      type: 'action',
      message: 'Test action clicked',
      metadata: {
        timestamp: new Date().toISOString(),
        description: 'User initiated a test action from the home page'
      },
    });
  };

  return (
    <Container maxW="container.lg" py={10}>
      <Header />
      <div className="space-y-8">
        <ActionButtons 
          onTestAction={handleTestAction}
          onTestError={handleTestError}
        />
        <ErrorDemo onTriggerError={handleTestError} />
      </div>
    </Container>
  );
}