import { Text } from '@vibepot/design-system';

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
    <div className="p-6 bg-grey-800 rounded-s flex gap-8 items-center w-fit">
      <div className="bg-grey-200 h-[24px] w-[24px] rounded-s" />
      <Text variant="medium" className="text-white">
        {name}
      </Text>
    </div>
  );
};

export default HashTagPill;
export type { HashTagPillProps };
