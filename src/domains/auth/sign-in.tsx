'use client';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { AuthUser } from 'aws-amplify/auth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

function SignIn({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      redirect('/');
    }
  }, [user]);

  return null;
}

export default withAuthenticator(SignIn);
