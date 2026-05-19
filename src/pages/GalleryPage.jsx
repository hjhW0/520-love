import { useState, useCallback } from 'react';
import PhotoWall from '../components/PhotoWall/PhotoWall';
import Lightbox from '../components/Lightbox/Lightbox';
import { PHOTOS } from '../config/content';
import { getPhotos } from '../utils/photos';
import './GalleryPage.css';

export default function GalleryPage() {
  const photos = getPhotos(PHOTOS);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((photo) => {
    const idx = photos.findIndex((p) => p.id === photo.id);
    setCurrentIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  }, [photos]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h2 className="gallery-title">我们的回忆</h2>
        <p className="gallery-sub">每一帧都是最珍贵的瞬间</p>
      </div>
      <PhotoWall photos={photos} onPhotoClick={openLightbox} />
      <Lightbox
        photos={photos}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
