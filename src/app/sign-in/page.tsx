'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import SignIn from '@vibepot/domains/auth/sign-in';
import { QueryClientProvider } from 'react-query';
import queryClient from '../query-client.util';

export default function SignInPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        <SignIn />
      </Authenticator.Provider>
    </QueryClientProvider>
  );
}
