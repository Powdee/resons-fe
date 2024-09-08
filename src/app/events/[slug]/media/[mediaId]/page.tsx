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
import { useState, useRef, MouseEvent, useEffect } from 'react';

export default function Media() {
  const [metadata, setMetadata] = useState<number>(0); // Video duration
  const [time, setTime] = useState<number>(0); // Current time
  const [isDragging, setIsDragging] = useState<boolean>(false); // Track dragging state
  const timelineRef = useRef<HTMLDivElement | null>(null); // Reference to the timeline element
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element

  // Calculate the current position in percentage for the progress marker
  const currentPositionPercentage = metadata > 0 ? (time / metadata) * 100 : 0;

  // Handle video metadata loading
  const handleLoadedMetadata = (e: Event) => {
    const videoElement = e.target as HTMLVideoElement;
    if (videoElement.duration > 0) {
      setMetadata(videoElement.duration); // Set the video duration when it's available
    }
  };

  // Ensure the video metadata is loaded after refresh
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Attach the event listener
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      // If the metadata is already available (in case of a fast load)
      if (video.duration > 0) {
        setMetadata(video.duration);
      }

      // Clean up the event listener on unmount
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  // Function to handle setting the time based on click or drag
  const updateTimeFromPosition = (clientX: number) => {
    if (!timelineRef.current || !videoRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect(); // Get the size of the timeline
    const position = clientX - rect.left; // Get the horizontal position
    const percentage = Math.max(0, Math.min(position / rect.width, 1)); // Keep percentage between 0 and 1
    const newTime = percentage * metadata; // Convert percentage to time
    setTime(newTime); // Update state with the new time
    videoRef.current.currentTime = newTime; // Set the video time
  };

  // Function to handle clicks on the timeline
  const handleTimelineClick = (e: MouseEvent<HTMLDivElement>) => {
    updateTimeFromPosition(e.clientX);
  };

  // Function to handle starting the drag (mouse down)
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateTimeFromPosition(e.clientX); // Set the time when drag starts
  };

  // Function to handle dragging the progress marker (mouse move)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateTimeFromPosition(e.clientX); // Update the time during drag
    }
  };

  // Function to handle stopping the drag (mouse up)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-screen bg-primary">
      <video
        ref={videoRef} // Reference the video element
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/example.mp4"
        autoPlay
        loop
        playsInline
        muted
        preload="metadata" // Ensure metadata is preloaded
        onTimeUpdate={(e) => {
          if (!isDragging) setTime(e.currentTarget.currentTime); // Only update time if not dragging
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
                ref={timelineRef}
                className={`bg-grey-900 w-full h-[20px] rounded-xs relative cursor-pointer`}
                onClick={handleTimelineClick} // Handle clicks on the timeline
                onMouseMove={handleMouseMove} // Handle dragging (mouse move)
                onMouseUp={handleMouseUp} // Stop dragging when the mouse is released
                onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the timeline area
              >
                <div
                  className="bg-white w-[5px] h-[20px] rounded-xs absolute cursor-pointer"
                  style={{ left: `calc(${currentPositionPercentage}%)` }} // Adjust the position of the marker
                  onMouseDown={handleMouseDown} // Start dragging
                  onMouseUp={handleMouseUp} // Stop dragging
                />
              </div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              {/* <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>
              <div className="border-grey-900 w-full h-[20px] border-2 rounded-xs"></div>  */}
            </div>

            <div className="flex flex-row justify-between">
              <Text variant="small" className="text-grey-200" weight="bold">
                {new Date(time * 1000).toISOString().substr(11, 8)} {/* Current time */}
              </Text>
              <Text variant="small" weight="bold">
                {new Date(metadata * 1000).toISOString().substr(11, 8)} {/* Video duration */}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="vintage-bottom-effect" />
    </div>
  );
}
