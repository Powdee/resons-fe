import { Text } from '@vibepot/design-system';
import 'aws-amplify/auth/enable-oauth-listener';
import { Hub } from 'aws-amplify/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AuthGoogleCallback() {
  const router = useRouter();
  const params = useSearchParams();

  const code = params.get('code') as string;

  useEffect(() => {
    const listener = Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          console.log('user signed in');
          break;
        case 'signInWithRedirect':
          router.refresh();
          router.push('/');
          break;
        case 'signInWithRedirect_failure':
          router.push('/sign-in');
          break;
        default:
          break;
      }
    });

    return () => listener();
  }, [router, code]);

  return (
    <Text variant="large" className="text-white">
      Loading...
    </Text>
  );
}

export default AuthGoogleCallback;
