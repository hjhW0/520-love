import { useState, useEffect, useRef, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import './Lightbox.css';

export default function Lightbox({ photos, currentIndex, isOpen, onClose, onPrev, onNext }) {
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    setLoaded(false);
  }, [currentIndex]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) onPrev();
      else onNext();
    }
    if (Math.abs(dy) > Math.abs(dx) && dy > 80) {
      onClose();
    }
  }, [onPrev, onNext, onClose]);

  if (!isOpen) return null;

  const photo = photos[currentIndex];
  if (!photo) return null;

  return (
    <div
      className="lightbox"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="关闭">
        <FiX size={28} />
      </button>

      <button className="lightbox-nav lightbox-nav--prev" onClick={onPrev} aria-label="上一张">
        <FiChevronLeft size={32} />
      </button>

      <button className="lightbox-nav lightbox-nav--next" onClick={onNext} aria-label="下一张">
        <FiChevronRight size={32} />
      </button>

      <div className="lightbox-content" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {!loaded && (
          <div className="lightbox-loader">
            <div className="lightbox-spinner" />
          </div>
        )}
        <img
          src={photo.src}
          alt={photo.caption}
          className={`lightbox-img${loaded ? ' lightbox-img--loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          draggable={false}
        />
        {photo.caption && loaded && (
          <div className="lightbox-caption">
            <p>{photo.caption}</p>
          </div>
        )}
      </div>

      <div className="lightbox-counter">
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
}
