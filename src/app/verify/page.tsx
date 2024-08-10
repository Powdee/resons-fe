'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import { QueryClientProvider } from 'react-query';
import queryClient from '../query-client.util';
import VerifyUser from '@vibepot/domains/auth/verify';

export default function SignInPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        <VerifyUser />
      </Authenticator.Provider>
    </QueryClientProvider>
  );
}
