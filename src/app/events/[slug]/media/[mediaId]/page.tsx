'use client';

import {
  Caption,
  DownloadIcon,
  HeartIcon,
  LeftArrowFilledIcon,
  ShareIcon,
  Text,
  Title,
} from '@vibepot/design-system';
import Image from 'next/image';
import { useState } from 'react';

export default function Media({}) {
  const [metadata, setMetadata] = useState(0);
  const [time, currentTime] = useState(0);

  // Helper function to format the time in HH:MM:SS
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  // Calculate timeline segments
  const currentPositionPercentage = time;

  return (
    <div className="relative w-full h-screen bg-primary">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/example.mp4"
        autoPlay
        loop
        muted
        onTimeUpdate={(e) => {
          currentTime(e.currentTarget.currentTime);
        }}
        onLoadedMetadata={(e) => {
          setMetadata(e.currentTarget.duration);
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-between z-10">
        <div className="flex items-center justify-between p-4">
          <button className="p-2 bg-gray-800 bg-opacity-50 rounded-full absolute top-[10px]">
            <LeftArrowFilledIcon />
          </button>
          <div className="text-center text-white w-full mt-20">
            <Title variant="h5">Monolink</Title>
            <Caption className="text-sm">24 AUG</Caption>
          </div>
          <div className="w-8" />
        </div>

        <div className="">
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
                    />
                  </div>
                  <Title variant="h6">Silvia Saspor</Title>
                </div>
                <div className="text-white text-xs flex space-x-2">
                  <Text variant="medium">
                    Lorem ipsum dolor sit amet, consetur adipiscing elit, sed do eiusm View more...
                  </Text>
                </div>
              </div>
              <div className="text-white text-xs flex space-x-2">
                <Text variant="small" className="text-grey-200">
                  Name of song / Remix, what (2024)
                </Text>
              </div>
            </div>

            <div className="flex flex-col gap-32 w-fit">
              <div className="flex flex-col items-center gap-6">
                <HeartIcon size={22} />
                <Text variant="medium">23</Text>
              </div>
              <ShareIcon size={20} />
              <DownloadIcon size={22} />
            </div>
          </div>
          <div className="p-20 pt-8 flex flex-col w-full gap-12">
            <div className="flex flex-row w-full gap-2">
              <div
                className=" bg-grey-900 w-[500px] h-[20px] rounded-xs relative"
                data-index="video-timeline"
              >
                <div
                  className="bg-white w-[10px] h-[20px] rounded-xs absolute"
                  data-index="current-time-index"
                  style={{ left: `calc(${currentPositionPercentage}%)` }} // Adjust the position of the marker
                />
              </div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
            </div>

            <div className="flex flex-row justify-between">
              <Text variant="small" className="text-grey-200" weight="bold">
                8.20PM
              </Text>
              <Text variant="small" weight="bold">
                9.59:29 PM
              </Text>
              <Text variant="small" className="text-grey-200" weight="bold">
                9.59 PM
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="vintage-bottom-effect" />
    </div>
  );
}
