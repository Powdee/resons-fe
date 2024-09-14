'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useVirtualizer } from '@tanstack/react-virtual';
import UserMediaTemplate from '@vibepot/domains/media/template';

const mediaList = [
  {
    id: '0',
    artist: 'Jakub Hadziewicz',
    shazam: { title: 'Song 1 (feat. Artist)', link: 'link1' },
    likes: 120,
    user: { avatar: '/person.jpg', name: 'Erik Kurjakovićz' },
    date: '25 AUG',
    description: 'Description for media 1',
  },
  {
    id: '1',
    artist: 'Another Artist',
    shazam: { title: 'Song 2 (feat. Artist)', link: 'link2' },
    likes: 200,
    user: { avatar: '/person2.jpg', name: 'John Doe' },
    date: '10 SEP',
    description: 'Description for media 2',
  },
  {
    id: '2',
    artist: 'Another Artist 2',
    shazam: { title: 'Song 2 (feat. Artist)', link: 'link2' },
    likes: 200,
    user: { avatar: '/person2.jpg', name: 'John Doe' },
    date: '10 SEP',
    description: 'Description for media 2',
  },
  {
    id: '3',
    artist: 'Another Artist 3',
    shazam: { title: 'Song 2 (feat. Artist)', link: 'link2' },
    likes: 200,
    user: { avatar: '/person2.jpg', name: 'John Doe' },
    date: '10 SEP',
    description: 'Description for media 2',
  },
  // Add more media objects here...
];

interface MediaProps {
  params: {
    slug: string;
    mediaId: string;
  };
}

export default function Media({ params }: MediaProps) {
  const { slug: eventId, mediaId } = params;
  const [currentMediaIndex, setCurrentMediaIndex] = useState(mediaId);
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: mediaList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => window.innerHeight, // Estimate the size of each media item in px
    overscan: 2, // Number of items to load outside the viewport
  });

  // Update the currentMediaIndex as you scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = parentRef.current?.scrollTop || 0;
      const viewportItems = rowVirtualizer.getVirtualItems();
      if (viewportItems.length > 0) {
        // Find the first fully visible item (in view)
        const firstVisibleItem = viewportItems.find((item) => item.start >= scrollTop);
        if (firstVisibleItem && firstVisibleItem.index !== Number(currentMediaIndex)) {
          setCurrentMediaIndex(firstVisibleItem.index.toString()); // Update the current media index
          // router.push(firstVisibleItem.index.toString());
        }
      }
    };

    const scrollElement = parentRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentMediaIndex, router, rowVirtualizer]);

  const mediaAnimationVariants = {
    initial: { opacity: 0, y: 50 }, // Initial state before entering
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Animate to this state
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }, // Animate exit state
  };

  return (
    <div className="media-container" ref={parentRef} style={{ height: '100vh', overflowY: 'auto' }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        <AnimatePresence mode="sync">
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const media = mediaList[virtualRow.index];
            return (
              <motion.div
                key={media.id}
                style={{
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                variants={mediaAnimationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <UserMediaTemplate
                  artist={media.artist}
                  shazam={media.shazam}
                  likes={media.likes}
                  user={media.user}
                  date={media.date}
                  description={media.description}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
