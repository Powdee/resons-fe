import MediaSwiper from '@vibepot/domains/media/media-swiper';

export default function MediaPage({ params }: { params: { slug: string; mediaId: string } }) {
  const { slug: eventId, mediaId } = params;

  return <MediaSwiper eventId={eventId} mediaId={mediaId} />;
}
