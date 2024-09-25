'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as TSwiper } from 'swiper/types';
import UserMediaTemplate from './media-template';

type Media = {
  id: string;
  artist: string;
  shazam: { title: string; link: string };
  likes: number;
  user: { avatar: string; name: string };
  date: string;
  description: string;
};

const getMediaList = (): Media[] => [
  {
    id: '1',
    artist: 'Jakub Hadziewicz',
    shazam: { title: 'Song 1 (feat. Artist)', link: 'link1' },
    likes: 120,
    user: { avatar: '/person.jpg', name: 'Erik Kurjakovićz' },
    date: '25 AUG',
    description: 'Description for media 1',
  },
  {
    id: '2',
    artist: 'Another Artist',
    shazam: { title: 'Song 2 (feat. Artist)', link: 'link2' },
    likes: 200,
    user: { avatar: '/person2.jpg', name: 'John Doe' },
    date: '10 SEP',
    description: 'Description for media 2',
  },
];

interface MediaSwiperProps {
  eventId: string;
  mediaId: string;
}

export default function MediaSwiper({ eventId, mediaId }: MediaSwiperProps) {
  const router = useRouter();

  const mediaList = useMemo(() => getMediaList(), []);

  const initialIndex = useMemo(() => {
    return mediaList.findIndex((media) => media.id === mediaId);
  }, [mediaList, mediaId]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleSwipe = useCallback((swiper: TSwiper) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleTransitionEnd = useCallback(
    (swiper: TSwiper) => {
      const newMediaId = mediaList[swiper.activeIndex]?.id;
      if (newMediaId && newMediaId !== mediaId) {
        router.replace(`/events/${eventId}/media/${newMediaId}`, { scroll: false });
      }
    },
    [eventId, mediaId, mediaList, router]
  );

  useEffect(() => {
    const currentIndex = mediaList.findIndex((media) => media.id === mediaId);
    if (currentIndex !== -1 && currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  }, [mediaId, mediaList, activeIndex]);

  return (
    <div className="media-container" style={{ height: '100vh', overflowY: 'auto' }}>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        effect="slide"
        onSlideChange={handleSwipe}
        className="h-full w-full"
        onTransitionEnd={handleTransitionEnd}
        initialSlide={initialIndex}
      >
        {mediaList.map((media) => (
          <SwiperSlide key={media.id}>
            <UserMediaTemplate
              artist={media.artist}
              shazam={media.shazam}
              likes={media.likes}
              user={media.user}
              date={media.date}
              description={media.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
