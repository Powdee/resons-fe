const hashtags = [
  {
    name: 'Eminem',
    count: 1000,
  },
  {
    name: 'Drake',
    count: 2000,
  },
  {
    name: 'Kanye West',
    count: 3000,
  },
];

type HashTagPillProps = {
  name: string;
};

const HashTagPill = ({ name }: HashTagPillProps) => {
  return (
    <div className="p-[6px] bg-input rounded-[8px] flex gap-[6px] items-center w-fit">
      <div className="bg-[#B4B5B7] h-[24px] w-[24px] rounded-[4px]" />
      <span className="text-white font-bold text-xs">{name}</span>
    </div>
  );
};

export default HashTagPill;
export type { HashTagPillProps };
