'use client';

import { Flex } from '@radix-ui/themes';
import { Button, Text } from '@vibepot/design-system';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  return (
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto flex gap-10 flex-col">
      <Text variant="large">Are you sure you want to sign out?</Text>
      <Button
        onClick={async () => {
          await signOut();
          router.push('/sign-in');
        }}
        variant="default"
        size="sm"
      >
        Yes
      </Button>
      <Button
        onClick={() => {
          router.push('/');
        }}
        variant="secondary"
        size="sm"
      >
        No
      </Button>
    </main>
  );
}
