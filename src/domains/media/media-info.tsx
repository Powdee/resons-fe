import React from 'react';
import Image from 'next/image';
import { Text, Title } from '@vibepot/design-system';
import { DownloadIcon, HeartIcon, ShareIcon } from 'lucide-react';

type CachedMediaInfoProps = {
  user: {
    avatar: string;
    name: string;
  };
  description: string;
  shazam: {
    title: string;
  };
  likes: number;
};

const CachedMediaInfo = React.memo(({ user, description, shazam, likes }: CachedMediaInfoProps) => (
  <div className="flex justify-between items-end p-20 gap-14">
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-12">
          <div className="flex flex-row items-center gap-2">
            <Image
              objectFit="none"
              className="border-2 h-[32px] border-grey-900 rounded-s first-of-type:ml-0 ml-[-16px]"
              src="/person.png"
              width={32}
              height={32}
              alt="person"
              loading="lazy"
            />
          </div>
          <Title variant="h6">{user.name}</Title>
        </div>
        <div className="text-white text-xs flex space-x-2">
          <Text variant="medium">{description}</Text>
        </div>
      </div>
      <div className="text-white text-xs flex space-x-2">
        <Text variant="small" className="text-grey-200">
          {shazam.title}
        </Text>
      </div>
    </div>
    <div className="flex flex-col gap-32 w-fit">
      <div className="flex flex-col items-center gap-6">
        <HeartIcon size={22} />
        <Text variant="medium">{likes}</Text>
      </div>
      <ShareIcon size={20} />
      <DownloadIcon size={22} />
    </div>
  </div>
));

CachedMediaInfo.displayName = 'CachedMediaInfo';

export default CachedMediaInfo;
