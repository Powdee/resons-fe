import { Button, Input, Text } from '@vibepot/design-system';
import UpcomingEvents from '@vibepot/domains/events/upcoming';
import FeaturedHashTags from '@vibepot/domains/hashtags/featured';
import Image from 'next/image';
import Link from 'next/link';
import { runWithAmplifyServerContext } from './amplify-server.util';
import { cookies } from 'next/headers';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth/server';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const getUser = async () => {
    'use server';

    const session = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchAuthSession(contextSpec, { forceRefresh: true }),
    });

    if (!session.tokens?.accessToken) return null;

    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchUserAttributes(contextSpec),
    });

    return currentUser;
  };

  const user = await getUser();

  return (
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto">
      {user?.email ? (
        <>
          <Text variant="medium">
            Logged in user: {user.email} {user?.email_verified ? 'Verified' : 'Non-Verified'}
          </Text>
          <Button variant="link" asChild size="sm">
            <Link href="/sign-out">Sign out</Link>
          </Button>
        </>
      ) : (
        <Button variant="link" asChild size="sm">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      )}

      <div className="flex gap-40 flex-col">
        <header className="flex items-center justify-center">
          <Image src="/vibepot_logo.svg" alt="logo" width={150} height={100} />
        </header>
        <div className="flex flex-col items-center justify-center gap-16">
          <form className="relative w-full">
            <div className="flex items-center gap-3">
              <Input required name="hashtag" id="hashtag" placeholder="Enter a hashtag here" />
            </div>
          </form>
          <Button variant="secondary">Join with QR</Button>
        </div>
        <div className="flex flex-col gap-32">
          <FeaturedHashTags />
          <UpcomingEvents />
        </div>
      </div>
    </main>
  );
}
