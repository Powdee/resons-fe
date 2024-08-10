'use client';

import SignIn from '@vibepot/domains/auth/sign-in';
import { QueryClientProvider } from 'react-query';
import queryClient from '../query-client.util';

export default function SignInPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignIn />
    </QueryClientProvider>
  );
}
