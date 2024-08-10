import { Button, Input } from '@vibepot/design-system';
import UpcomingEvents from '@vibepot/domains/events/upcoming';
import FeaturedHashTags from '@vibepot/domains/hashtags/featured';
import Image from 'next/image';
import { AuthGetCurrentUserServer } from './amplify-server.util';

export default async function Home() {
  const user = await AuthGetCurrentUserServer();

  return (
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto">
      <div className="flex gap-40 flex-col">
        {user?.username}
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
