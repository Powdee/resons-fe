import {
  Button,
  Calendar,
  Caption,
  Carousel,
  CarouselContent,
  CarouselItem,
  RightArrow,
  Text,
  Title,
} from '@vibepot/design-system';
import Attendees from '@vibepot/domains/components/events/attendees/attendees';
import Image from 'next/image';

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

export default function Event() {
  return (
    <main className="flex flex-col md:p-24 md:pt-0">
      <div className="w-full flex flex-col items-center justify-between gap-0 mb-[-150px] -z-10">
        <Image width={720} height={120} src="/event.png" alt="event" className="z-0 blur-[2px]" />
      </div>
      <section
        data-index="actions"
        className="w-full flex flex-col items-center justify-between gap-20"
      >
        <div className="w-[128px] h-[128px] bg-grey-200 rounded-full">
          {/* <Image width={240} height={240} src="/artist.png" alt="event" /> */}
        </div>
        <div>
          <Title variant="h2" className="text-white">
            Monolink
          </Title>
          <Caption className="text-grey-400 text-center">Solo artist</Caption>
        </div>
        <Attendees cutAt={6} attendees={attendees.people} total={attendees.total} />
        <div className="flex flex-row gap-8">
          <Button variant="secondary">Attend the event</Button>
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
              <Calendar />
              <div>
                <Caption className="font-bold text-grey-400 uppercase">Date</Caption>
                <Text variant="large" className="text-white">
                  9. - 10. 8. 2024
                </Text>
              </div>
            </div>
            <div className="flex flex-row gap-16 items-center">
              <Calendar />
              <div>
                <Caption className="font-bold text-grey-400 uppercase">Location</Caption>
                <Text variant="large" className="text-white">
                  O2 aréna, Praha
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div data-index="videos" className="flex flex-col gap-16">
          <div className="flex flex-row justify-between align-center">
            <Title variant="h5" className="text-white font-bold">
              From artist
            </Title>

            <Button variant="default" size="sm">
              <Text variant="button">All</Text>
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
                <Calendar />
                <Text variant="large" className="text-white font-bold">
                  More about artist
                </Text>
              </div>

              <RightArrow />
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

            <RightArrow />
          </div>
        </div>
      </section>
    </main>
  );
}
