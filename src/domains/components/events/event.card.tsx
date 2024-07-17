import Image from 'next/image';
import Link from 'next/link';

type EventCardProps = {
  url: string;
  name: string;
  attendees: number;
  date: {
    day: string;
    month: string;
  };
  bgUrl: string;
};

const EventCard = ({ attendees, url, date, name, bgUrl }: EventCardProps) => {
  return (
    <div className="w-[217px] h-[210px]">
      <Link className="relative cursor-pointer" href={url}>
        <Image
          className="rounded-[16px] hover:scale-150 h-full"
          width={217}
          height={210}
          alt={name}
          src={bgUrl}
        />

        <div className="absolute top-0 left-0 z-0 w-full h-full">
          <div className="p-3 flex justify-between h-full flex-col">
            <div className="p-2 bg-input w-[43px] h-[46px] rounded-[16px] flex gap-0 flex-col items-center">
              <span className="text-[#B4B5B7] uppercase font-bold text-xs">{date.day}</span>
              <span className="text-[#B4B5B7] uppercase font-bold text-xs">{date.month}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-white font-bold text-sm">{name}</span>
              <span className="text-[#B4B5B7] font-bold text-xs">{attendees} + attendees</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
export type { EventCardProps };
