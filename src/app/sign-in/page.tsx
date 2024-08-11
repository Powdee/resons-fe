'use client';

import SignIn from '@vibepot/domains/auth/sign-in';
import { QueryClientProvider } from 'react-query';
import queryClient from '../query-client.util';
import { Authenticator } from '@aws-amplify/ui-react';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <Suspense>
      <Authenticator.Provider>
        <QueryClientProvider client={queryClient}>
          <SignIn />
        </QueryClientProvider>
      </Authenticator.Provider>
    </Suspense>
  );
}
