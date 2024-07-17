import Image from "next/image";
import Link from "next/link";

const concerts = [
  {
    name: "Fred again",
    attendees: 1000,
    date: {
      day: "12",
      month: "Dec",
    },
    bgUrl: "/fred.png",
  },
  {
    name: "Fred again vol2",
    attendees: 1000,
    date: {
      day: "12",
      month: "Dec",
    },
    bgUrl: "/fred.png",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="mt-20">
      <h3 className="text-[#B4B5B7] uppercase mb-4 font-bold">
        Upcoming concerts
      </h3>

      <div className="flex gap-4">
        {concerts.map((concert) => (
          <Link
            key={concert.name}
            className="relative cursor-pointer"
            href={`events/${concert.name}`}
          >
            <Image
              className="rounded-[16px] hover:scale-150"
              width={220}
              height={270}
              alt={concert.name}
              src={concert.bgUrl}
            />

            <div className="absolute top-0 left-0 z-0 w-full h-full">
              <div className="p-3 flex justify-between h-full flex-col">
                <div className="p-2 bg-input w-[43px] h-[46px] rounded-[16px] flex gap-0 flex-col items-center">
                  <span className="text-[#B4B5B7] uppercase font-bold text-xs">
                    {concert.date.day}
                  </span>
                  <span className="text-[#B4B5B7] uppercase font-bold text-xs">
                    {concert.date.month}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-white uppercase font-bold text-sm">
                    {concert.name}
                  </span>
                  <span className="text-[#B4B5B7] font-bold text-xs">
                    {concert.attendees} + attendees
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
