'use client';

import { QueryClientProvider } from 'react-query';
import queryClient from '../query-client.util';
import VerifyUser from '@vibepot/domains/auth/verify';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <VerifyUser />
      </Suspense>
    </QueryClientProvider>
  );
}
