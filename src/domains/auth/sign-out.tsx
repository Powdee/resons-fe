'use client';

import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push('/sign-in');
      }}
      className="px-2 bg-white text-black"
    >
      Sign out
    </button>
  );
}
