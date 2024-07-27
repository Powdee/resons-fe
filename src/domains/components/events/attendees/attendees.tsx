import Text from '@vibepot/design-system/typography/text';
import Image from 'next/image';

type AttendeesProps = {
  attendees: { url: string; name: string }[];
  total: number;
  cutAt?: number;
};

const Attendees = ({ attendees, total, cutAt = 4 }: AttendeesProps) => {
  return (
    <div className="flex flex-row items-center bg-primary rounded-s w-fit">
      <div className="flex flex-row items-center gap-2">
        {attendees.slice(0, cutAt).map((attendee) => (
          <Image
            key={attendee.name}
            objectFit="none"
            className="border-2 h-[32px] border-grey-900 rounded-s first-of-type:ml-0 ml-[-16px]"
            src={attendee.url}
            width={32}
            height={32}
            alt={attendee.name}
          />
        ))}
      </div>

      <Text
        variant="small"
        weight="bold"
        className="text-white px-8 h-[32px] bg-primary border-2 border-grey-900 rounded-s ml-[-16px] flex items-center"
      >
        +{total} Attend
      </Text>
    </div>
  );
};

export default Attendees;
export type { AttendeesProps };
