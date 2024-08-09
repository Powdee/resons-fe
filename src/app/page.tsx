import { Button, Input } from '@vibepot/design-system';
import UpcomingEvents from '@vibepot/domains/events/upcoming';
import FeaturedHashTags from '@vibepot/domains/hashtags/featured';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const HashtagSchema = z.object({
  hashtag: z.string(),
});

export default async function Home() {
  async function searchHashtag(formData: FormData) {
    'use server';

    const validatedFields = HashtagSchema.safeParse({
      hashtag: formData.get('hashtag'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please enter a valid hashtag',
      };
    }

    // fetch data on http://localhost:8080/events/hashtags
    // use hashtag as query parameter
    // get data
    const response = await fetch('http://localhost:8080/events/by-hashtag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpYmVwb3RAY29udGFjdC5jb20iLCJleHAiOjE3MTQ2MzU2MzN9.cUrSordMbX-RWvCog-ae_kh6eUHKNNn5HAdmpDN_axc',
      },
      body: JSON.stringify({ tag: validatedFields.data.hashtag }),
    });

    const data = await response.json();
    const eventId = `${data?.event?.event_id}`;

    redirect(`/events/${eventId}`);
  }

  return (
    <main className="px-16 py-40 overflow-hidden lg:max-w-screen-lg lg:my-0 lg:mx-auto">
      <div className="flex gap-40 flex-col">
        <header className="flex items-center justify-center">
          <Image src="/vibepot_logo.svg" alt="logo" width={150} height={100} />
        </header>
        <div className="flex flex-col items-center justify-center gap-16">
          <form action={searchHashtag} className="relative w-full">
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
