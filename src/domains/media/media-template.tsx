'use client';

import { useCallback, useState, useRef, MouseEvent, TouchEvent, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Caption, LeftArrowFilledIcon, Text, Title } from '@vibepot/design-system';
import CachedMediaInfo from './media-info';

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
  initialTime?: number;
};

const UserMediaTemplate = ({
  likes,
  user,
  artist,
  date,
  shazam,
  description,
  initialTime = 0,
}: UserMediaTemplateProps) => {
  const [metadata, setMetadata] = useState<number>(0);
  const [time, setTime] = useState<number>(initialTime);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('');
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const verticalThreshold = 100;
  const currentPositionPercentage = useMemo(
    () => (metadata > 0 ? (time / metadata) * 100 : 0),
    [metadata, time]
  );

  const handleLoadedMetadata = useCallback((e: Event) => {
    const videoElement = e.target as HTMLVideoElement;
    if (videoElement.duration > 0) {
      setMetadata(videoElement.duration);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      if (video.duration > 0) {
        setMetadata(video.duration);
      }
      video.currentTime = initialTime;
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [handleLoadedMetadata, initialTime]);

  const captureThumbnail = useCallback((time: number) => {
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
  }, []);

  const updateTimeFromPosition = useCallback(
    (clientX: number) => {
      if (!timelineRef.current || !videoRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const position = clientX - rect.left;
      const percentage = Math.max(0, Math.min(position / rect.width, 1));
      const newTime = percentage * metadata;
      setTime(newTime);
      videoRef.current.currentTime = newTime;
      videoRef.current.pause();
      captureThumbnail(newTime);
    },
    [captureThumbnail, metadata]
  );

  const handleTimelineClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      updateTimeFromPosition(e.clientX);
    },
    [updateTimeFromPosition]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isDragging && timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const withinYThreshold =
          e.clientY >= rect.top - verticalThreshold && e.clientY <= rect.bottom + verticalThreshold;

        if (withinYThreshold) {
          updateTimeFromPosition(e.clientX);
        }
      }
    },
    [isDragging, updateTimeFromPosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
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
    },
    [isDragging, updateTimeFromPosition]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      updateTimeFromPosition(e.clientX);
    },
    [updateTimeFromPosition]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const touch = e.touches[0];
      updateTimeFromPosition(touch.clientX);
    },
    [updateTimeFromPosition]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  const formatTime = useCallback((seconds: number) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }, []);

  return (
    <div className="relative w-full h-[100svh] bg-primary">
      <video
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
      />

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between z-10">
        <div className="flex items-center justify-between p-4">
          <button className="p-2 bg-gray-800 bg-opacity-50 rounded-full absolute top-[10px]">
            <LeftArrowFilledIcon />
          </button>
          <div className="text-center text-white w-full mt-20">
            <Title variant="h5">{artist}</Title>
            <Caption className="text-sm">{date}</Caption>
          </div>
          <div className="w-8" />
        </div>

        <div>
          <CachedMediaInfo user={user} description={description} shazam={shazam} likes={likes} />

          <div className="p-20 pt-8 flex flex-col w-full gap-12">
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
                <div
                  className="bg-white w-[10px] h-[20px] rounded-xs absolute cursor-pointer"
                  style={{ left: `calc(${currentPositionPercentage}%)` }}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
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
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <Text variant="small" className="text-grey-200" weight="bold">
                {formatTime(time)}
              </Text>
              <Text variant="small" weight="bold">
                {formatTime(metadata)}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="vintage-effect" />
    </div>
  );
};

export default UserMediaTemplate;
