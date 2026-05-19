import { useState } from 'react';
import './PhotoWall.css';

export default function PhotoWall({ photos, onPhotoClick }) {
  return (
    <div className="photo-wall">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
      ))}
    </div>
  );
}

function PhotoCard({ photo, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const hasImage = photo.src && !error;

  return (
    <div className="photo-card" onClick={onClick}>
      <div className="photo-card-inner">
        {hasImage ? (
          <>
            {!loaded && (
              <div className="photo-placeholder" style={{ background: photo.placeholderColor || '#fce4ec' }}>
                <span>📷</span>
              </div>
            )}
            <img
              src={photo.src}
              alt={photo.caption}
              className={`photo-img${loaded ? ' photo-img--loaded' : ''}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              style={{ display: loaded ? 'block' : 'none' }}
            />
          </>
        ) : (
          <div className="photo-placeholder" style={{ background: photo.placeholderColor || '#fce4ec' }}>
            <span className="photo-placeholder-icon">🖼️</span>
            <span className="photo-placeholder-text">添加照片</span>
          </div>
        )}
        {photo.caption && (
          <div className="photo-caption">
            <p>{photo.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
