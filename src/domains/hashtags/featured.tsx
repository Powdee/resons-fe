const hashtags = [
  {
    name: "Eminem",
    count: 1000,
  },
  {
    name: "Drake",
    count: 2000,
  },
  {
    name: "Kanye West",
    count: 3000,
  },
];

const FeaturedHashTags = () => {
  return (
    <div className="mt-20">
      <h3 className="text-[#B4B5B7] uppercase mb-4 font-bold">
        Featured hashtags
      </h3>

      <div className="flex gap-2">
        {hashtags.map((hashtag) => (
          <div
            key={hashtag.name}
            className="py-2 px-3 bg-input rounded-[16px] flex gap-2 items-center"
          >
            <div className="bg-[#B4B5B7] h-[24px] w-[24px] rounded-[9px]" />
            <span className="text-[#B4B5B7] font-bold text-sm">
              {hashtag.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHashTags;
