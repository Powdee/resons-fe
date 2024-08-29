'use client';

import {
  Button,
  CalendarIcon,
  Caption,
  Carousel,
  CarouselContent,
  CarouselItem,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  LeftArrowFilledIcon,
  RightArrowIcon,
  Text,
  Title,
} from '@vibepot/design-system';
import Attendees from '@vibepot/domains/common/components/events/attendees/attendees';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const attendees = {
  people: [
    {
      url: '/person.png',
      name: 'John Doe1',
    },
    {
      url: '/person.png',
      name: 'John Doe2',
    },
    {
      url: '/person.png',
      name: 'John Doe2',
    },
    {
      url: '/person.png',
      name: 'John Doe3',
    },
    {
      url: '/person.png',
      name: 'John Doe4',
    },
    {
      url: '/person.png',
      name: 'John Doe5',
    },
  ],
  total: 233,
};

interface EventProps {
  params: {
    slug: string;
  };
}

const LineupDrawer = ({ eventId }: { eventId: string }) => {
  const params = useSearchParams();
  const router = useRouter();
  const currentQuery = params.get('drawer') as 'lineups' | undefined;
  const isOpen = currentQuery === 'lineups';

  return (
    <Drawer
    // onOpenChange={(isOpened) => {
    //   if (!isOpened) {
    //     router.push(`/events/${eventId}`);
    //   } else {
    //     router.push(`/events/${eventId}?drawer=lineups`);
    //   }
    // }}
    // open={isOpen}
    >
      <Button asChild variant="default" size="sm">
        <Text variant="button">
          <DrawerTrigger>All</DrawerTrigger>
        </Text>
      </Button>
      <DrawerContent className="min-h-[420px] gap-12 rounded-t-xl">
        {attendees.people.map((attendee, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-12">
              <div className="flex flex-row items-center gap-2">
                <Image
                  key="fred"
                  objectFit="none"
                  className="border-2 h-[40px] border-grey-900 rounded-s"
                  src="/person.png"
                  width={40}
                  height={40}
                  alt="fred"
                />
              </div>
              <Text variant="large" className="text-white">
                {attendee.name}
              </Text>
            </div>

            <Button size="sm" className="w-fit" variant="secondary">
              Follow
            </Button>
          </div>
        ))}
      </DrawerContent>
    </Drawer>
  );
};

export default function Event({ params }: EventProps) {
  const [attended, setAttended] = useState(false);
  const { slug: eventId } = params;

  return (
    <main className="flex flex-col md:p-24 md:pt-0">
      <div className="absolute left-0 top-[14px]">
        <LeftArrowFilledIcon />
      </div>
      <div className="w-full flex flex-col items-center justify-between gap-0 mb-[-150px] -z-10 min-h-[346px]">
        <Image width={720} height={120} src="/event.png" alt="event" className="z-0 blur-[2px]" />
      </div>
      <section
        data-index="actions"
        className="w-full flex flex-col items-center justify-between gap-20"
      >
        <div className="w-[128px] h-[128px] bg-grey-200 rounded-full" />
        <div className="text-center">
          <Title variant="h2" className="text-white">
            Monolink
          </Title>
          <Text variant="medium" className="text-grey-400">
            Solo artist
          </Text>
        </div>
        <Attendees cutAt={6} attendees={attendees.people} total={attendees.total} />
        <div className="flex flex-row gap-8">
          <Button
            onClick={() => setAttended((t) => !t)}
            variant={attended ? 'default' : 'secondary'}
          >
            {attended ? "I'll be there" : 'Attend the event'}
          </Button>
          <Button variant="default">Tickets</Button>
        </div>
      </section>
      <section className="flex flex-col gap-32 mt-32 mb-32 px-20">
        <div data-index="info">
          <Title variant="h5" className="text-white font-bold mb-16">
            General info
          </Title>
          <div className="flex flex-col gap-12">
            <div className="flex flex-row gap-16 items-center">
              <CalendarIcon />
              <div>
                <Caption className="font-bold text-grey-400 uppercase">Date</Caption>
                <Text variant="large" className="text-white">
                  9. - 10. 8. 2024
                </Text>
              </div>
            </div>
            <div className="flex flex-row gap-16 items-center">
              <CalendarIcon />
              <div>
                <Caption className="font-bold text-grey-400 uppercase">Location</Caption>
                <Text variant="large" className="text-white">
                  O2 aréna, Praha
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div data-index="lineup" className="flex flex-col gap-16">
          <div className="flex flex-row justify-between align-center">
            <Title variant="h5" className="text-white font-bold">
              Line-up
            </Title>

            <LineupDrawer eventId={eventId} />
          </div>
          <div className="flex items-center gap-12">
            <Attendees cutAt={2} totalText="" attendees={attendees.people} total={9} />
            <Text variant="large">Jamie XX, Metronomy, No name</Text>
          </div>
        </div>
        <div data-index="videos" className="flex flex-col gap-16">
          <div className="flex flex-row justify-between align-center">
            <Title variant="h5" className="text-white font-bold">
              From artist
            </Title>

            <Button variant="default" size="sm">
              <Link href={`/events/${eventId}/media`}>
                <Text variant="button">All</Text>
              </Link>
            </Button>
          </div>

          <Carousel>
            <CarouselContent className="flex gap-6">
              <CarouselItem className="basis-[105px] relative">
                <div className="w-[105px] h-[160px] bg-grey-200 rounded-m" />
              </CarouselItem>
              <CarouselItem className="basis-[105px] relative">
                <div className="w-[105px] h-[160px] bg-grey-200 rounded-m" />
              </CarouselItem>
              <CarouselItem className="basis-[105px] relative">
                <div className="w-[105px] h-[160px] bg-grey-200 rounded-m" />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        <div data-index="ticket" className="flex flex-col gap-16">
          <Title variant="h5" className="text-white font-bold">
            Tickets
          </Title>
          <div data-index="about" className="flex flex-col gap-16">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-16 items-center">
                <CalendarIcon />
                <Text variant="large" className="text-white font-bold">
                  More about artist
                </Text>
              </div>

              <RightArrowIcon />
            </div>
          </div>
        </div>
        <div data-index="about" className="flex flex-col gap-16">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-16 items-center">
              <div className="w-[36px] h-[36px] bg-grey-200 rounded-full" />
              <Text variant="large" className="text-white font-bold">
                More about artist
              </Text>
            </div>

            <RightArrowIcon />
          </div>
        </div>
      </section>
    </main>
  );
}
