import { Caption, Carousel, CarouselContent, CarouselItem } from '@vibepot/design-system';
import EventCard from '../common/components/events/card/event.card';

const events = [
  {
    id: 1,
    name: 'Fred again',
    attendees: {
      total: 213,
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
    },
    date: {
      day: '12',
      month: 'Dec',
    },
    bgUrl: '/fred.png',
  },
];

const UpcomingEvents = () => {
  return (
    <div className="flex flex-col gap-16">
      <Caption className="text-grey-400 uppercase">Upcoming concerts</Caption>
      <Carousel>
        <CarouselContent className="flex gap-6">
          {events.map((event) => (
            <CarouselItem key={event.id} className="basis-[230px] relative">
              <EventCard {...event} url={`events/${event.id}`} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default UpcomingEvents;
