'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { ActivitySquare } from 'lucide-react';

export function Header() {
  return (
    <Box textAlign="center" mb={8}>
      <Box display="flex" justifyContent="center" alignItems="center" gap={3} mb={4}>
        <ActivitySquare className="w-10 h-10 text-primary" />
        <Heading as="h1" size="2xl">
          Logging Module
        </Heading>
      </Box>
      <Text fontSize="lg" color="muted.600">
        Track user actions and errors with detailed context
      </Text>
    </Box>
  );
}