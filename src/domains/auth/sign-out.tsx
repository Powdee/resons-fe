'use client';

import { Text } from '@vibepot/design-system';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const signout = async () => {
      await signOut();
      router.push('/sign-in');
      router.refresh();
    };

    signout();
  }, [router]);

  return (
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col">
      <Text variant="large">Logging you out ...</Text>
    </main>
  );
}
