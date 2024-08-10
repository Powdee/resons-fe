'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import { QueryClientProvider } from 'react-query';
import queryClient from '../query-client.util';
import SignUp from '@vibepot/domains/auth/sign-up';

export default function SignInPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        <SignUp />
      </Authenticator.Provider>
    </QueryClientProvider>
  );
}
