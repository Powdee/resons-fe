import Image from 'next/image';
import Link from 'next/link';
import Attendees from '../attendees/attendees';
import { Caption, Text, Title } from '@vibepot/design-system';

type EventCardProps = {
  url: string;
  name: string;
  attendees: {
    total: number;
    people: {
      url: string;
      name: string;
    }[];
  };
  date: {
    day: string;
    month: string;
  };
  bgUrl: string;
};

const EventCard = ({ attendees, url, date, name, bgUrl }: EventCardProps) => {
  return (
    <div className="w-[217px] h-[210px]">
      <Image
        className="rounded-l hover:scale-150 h-full object-cover"
        width={217}
        height={210}
        alt={name}
        src={bgUrl}
        quality={100}
      />

      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <div className="p-12 flex justify-between h-full flex-col">
          <div className="w-[50px] h-[50px] rounded-s flex flex-col items-center relative justify-center">
            <div className="absolute bg-white/20 left-0 top-0 blur-[0.1px] w-[50px] h-[50px] rounded-s" />
            <Text variant="large" className="text-white uppercase font-bold leading-[1.3]">
              {date.day}
            </Text>
            <Caption className="text-grey-300 uppercase font-bold">{date.month}</Caption>
          </div>

          <div className="flex flex-col gap-6">
            <Title variant="h5" className="text-white">
              {name}
            </Title>
            <Attendees attendees={attendees.people} total={attendees.total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
export type { EventCardProps };
