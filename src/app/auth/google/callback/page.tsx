'use client';

import { QueryClientProvider } from 'react-query';
import { Authenticator } from '@aws-amplify/ui-react';
import { Suspense } from 'react';
import queryClient from '@vibepot/app/query-client.util';
import AuthGoogleCallback from '@vibepot/domains/auth/providers/google';

export default function AuthGoogleCallbackPage() {
  return (
    <Suspense>
      <Authenticator.Provider>
        <QueryClientProvider client={queryClient}>
          <AuthGoogleCallback />
        </QueryClientProvider>
      </Authenticator.Provider>
    </Suspense>
  );
}
