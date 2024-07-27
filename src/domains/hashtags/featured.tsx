import { Caption } from '@vibepot/design-system';
import HashTagPill from '../components/hashtags/hashtag.pill';

const hashtags = [
  {
    id: 1,
    name: 'Eminem',
    count: 1000,
  },
  {
    id: 2,
    name: 'Drake',
    count: 2000,
  },
];

const FeaturedHashTags = () => {
  return (
    <div className="flex flex-col gap-16">
      <Caption className="text-grey-400 uppercase">Featured hashtags</Caption>

      <div className="flex gap-8">
        {hashtags.map((hashtag) => (
          <HashTagPill name={hashtag.name} key={hashtag.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHashTags;
