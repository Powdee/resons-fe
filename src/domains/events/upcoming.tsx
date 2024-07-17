import EventCard from '../components/events/event.card';

const events = [
  {
    id: 1,
    name: 'Fred again',
    attendees: 1000,
    date: {
      day: '12',
      month: 'Dec',
    },
    bgUrl: '/fred.png',
  },
];

const UpcomingEvents = () => {
  return (
    <div className="mt-8">
      <h3 className="text-[#B4B5B7] uppercase mb-4 text-xs font-bold">Upcoming concerts</h3>

      <div className="flex gap-4">
        {events.map((event) => (
          <EventCard key={event.id} {...event} url={`events/${event.id}`} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
