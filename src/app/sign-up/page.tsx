'use client';

import { QueryClientProvider } from 'react-query';
import queryClient from '../query-client.util';
import SignUp from '@vibepot/domains/auth/sign-up';

export default function SignInPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  );
}
