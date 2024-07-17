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
    <div className="mt-8">
      <h3 className="text-[#B4B5B7] uppercase mb-4 text-xs font-bold">Featured hashtags</h3>

      <div className="flex gap-2">
        {hashtags.map((hashtag) => (
          <HashTagPill name={hashtag.name} key={hashtag.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHashTags;
