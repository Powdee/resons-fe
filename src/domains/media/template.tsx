'use client';

import { motion } from 'framer-motion';
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
import { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';

type UserMediaTemplateProps = {
  artist: string;
  shazam: {
    title: string;
    link: string;
  };
  likes: number;
  user: {
    avatar: string;
    name: string;
  };
  date: string;
  description: string;
};

export default function UserMediaTemplate({
  likes,
  user,
  artist,
  date,
  shazam,
  description,
}: UserMediaTemplateProps) {
  const [metadata, setMetadata] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('');
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const verticalThreshold = 100;
  const currentPositionPercentage = metadata > 0 ? (time / metadata) * 100 : 0;

  const handleLoadedMetadata = (e: Event) => {
    const videoElement = e.target as HTMLVideoElement;
    if (videoElement.duration > 0) {
      setMetadata(videoElement.duration);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      if (video.duration > 0) {
        setMetadata(video.duration);
      }
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const updateTimeFromPosition = (clientX: number) => {
    if (!timelineRef.current || !videoRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(position / rect.width, 1));
    const newTime = percentage * metadata;
    setTime(newTime);
    videoRef.current.currentTime = newTime;
    videoRef.current.pause();
    captureThumbnail(newTime);
  };

  const captureThumbnail = (time: number) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      video.currentTime = time;
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnail = canvas.toDataURL('image/png');
      setThumbnailSrc(thumbnail);
    }
  };

  const handleTimelineClick = (e: MouseEvent<HTMLDivElement>) => {
    updateTimeFromPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const withinYThreshold =
        e.clientY >= rect.top - verticalThreshold && e.clientY <= rect.bottom + verticalThreshold;

      if (withinYThreshold) {
        updateTimeFromPosition(e.clientX);
      }
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isDragging && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const withinYThreshold =
        touch.clientY >= rect.top - verticalThreshold &&
        touch.clientY <= rect.bottom + verticalThreshold;

      if (withinYThreshold) {
        updateTimeFromPosition(touch.clientX);
      }
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateTimeFromPosition(e.clientX);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    updateTimeFromPosition(touch.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleTouchEnd = () => setIsDragging(false);

  return (
    <>
      <div className="relative w-full h-[100svh] bg-primary">
        <motion.video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/example1.mp4"
          autoPlay
          loop
          muted
          preload="metadata"
          playsInline
          onTimeUpdate={(e) => {
            if (!isDragging) setTime(e.currentTarget.currentTime);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <motion.div
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-between z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="flex items-center justify-between p-4">
            <motion.button
              className="p-2 bg-gray-800 bg-opacity-50 rounded-full absolute top-[10px]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LeftArrowFilledIcon />
            </motion.button>
            <div className="text-center text-white w-full mt-20">
              <Title variant="h5">{artist}</Title>
              <Caption className="text-sm">{date}</Caption>
            </div>
            <div className="w-8" />
          </motion.div>

          <div>
            <motion.div
              className="flex justify-between items-end p-20 gap-14"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
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

              <motion.div className="flex flex-col gap-32 w-fit">
                <motion.div
                  className="flex flex-col items-center gap-6"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HeartIcon size={22} />
                  <Text variant="medium">{likes}</Text>
                </motion.div>
                <ShareIcon size={20} />
                <DownloadIcon size={22} />
              </motion.div>
            </motion.div>

            <motion.div
              className="p-20 pt-8 flex flex-col w-full gap-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-row w-full gap-2">
                <div
                  ref={timelineRef}
                  className="bg-grey-900 w-[500px] h-[20px] rounded-xs relative cursor-pointer"
                  onClick={handleTimelineClick}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchMove={handleTouchMove}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <motion.div
                    className="bg-white w-[10px] h-[20px] rounded-xs absolute cursor-pointer"
                    style={{ left: `calc(${currentPositionPercentage}%)` }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    whileHover={{ scale: 1.2 }}
                    whileDrag={{ scale: 1.3 }}
                  >
                    {isDragging && (
                      <div className="w-[96px] h-[148px] rounded-m border-2 bottom-0 bg-grey-900 border-grey-900 absolute -translate-y-[60px] -translate-x-[48px]">
                        <Image
                          objectFit="contain"
                          width={96}
                          height={148}
                          src={thumbnailSrc}
                          alt="video thumbnail"
                          className="rounded-m"
                        />
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-row justify-between">
                <Text variant="small" className="text-grey-200" weight="bold">
                  {new Date(time * 1000).toISOString().substr(11, 8)}
                </Text>
                <Text variant="small" weight="bold">
                  {new Date(metadata * 1000).toISOString().substr(11, 8)}
                </Text>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className="vintage-effect" />
      </div>
      {/* <div data-index="preview-video" className="relative w-full h-[100svh] bg-primary"></div> */}
    </>
  );
}
