import { useAuthenticator } from '@aws-amplify/ui-react';

import 'aws-amplify/auth/enable-oauth-listener';
import { useSearchParams } from 'next/navigation';

function AuthGoogleCallback() {
  const params = useSearchParams();
  const user = useAuthenticator();
  console.log('user', user);
  console.log('params', params.get('code'));

  return null;
}

export default AuthGoogleCallback;
