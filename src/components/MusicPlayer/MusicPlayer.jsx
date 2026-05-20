import { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import './MusicPlayer.css';

function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function MusicPlayer({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  playBlocked,
  isSeekingRef,
  toggle,
  seek,
  setVolume,
  next,
  prev,
}) {
  const [sliderValue, setSliderValue] = useState(0);
  const isDragging = useRef(false);

  // sync currentTime to local slider when not dragging
  useEffect(() => {
    if (!isDragging.current) {
      setSliderValue(currentTime);
    }
  }, [currentTime]);

  if (!currentTrack) {
    return (
      <div className="music-player music-player--empty">
        <div className="music-empty-icon">🎵</div>
        <p className="music-empty-text">还没有添加音乐</p>
        <p className="music-empty-hint">将音乐文件放入 public/assets/music/ 文件夹</p>
      </div>
    );
  }

  const displayTime = isDragging.current ? sliderValue : currentTime;
  const progressPercent = duration > 0 ? (displayTime / duration) * 100 : 0;

  const handleSeekStart = () => {
    isDragging.current = true;
    isSeekingRef.current = true;
  };

  const handleSeekEnd = () => {
    isDragging.current = false;
    seek(sliderValue);
  };

  return (
    <div className="music-player">
      <div className={`music-cover${isPlaying ? ' music-cover--playing' : ''}`}>
        {currentTrack.cover ? (
          <img src={currentTrack.cover} alt={currentTrack.title} className="music-cover-img" />
        ) : (
          <div className="music-cover-placeholder">
            <span>🎵</span>
          </div>
        )}
      </div>

      <div className="music-info">
        <h3 className="music-title">{currentTrack.title}</h3>
        <p className="music-artist">{currentTrack.artist}</p>
      </div>

      <div className="music-progress-bar">
        <span className="music-time">{formatTime(displayTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={displayTime}
          onInput={(e) => {
            setSliderValue(Number(e.target.value));
          }}
          onMouseDown={handleSeekStart}
          onMouseUp={handleSeekEnd}
          onTouchStart={handleSeekStart}
          onTouchEnd={handleSeekEnd}
          className="music-progress"
          style={{ '--progress': `${progressPercent}%` }}
        />
        <span className="music-time">{formatTime(duration)}</span>
      </div>

      <div className="music-controls">
        <button className="music-ctrl-btn" onClick={prev} aria-label="上一首">
          <FiSkipBack size={22} />
        </button>
        <button className="music-ctrl-btn music-ctrl-btn--play" onClick={toggle} aria-label={isPlaying ? '暂停' : '播放'}>
          {isPlaying ? <FiPause size={28} /> : <FiPlay size={28} />}
        </button>
        <button className="music-ctrl-btn" onClick={next} aria-label="下一首">
          <FiSkipForward size={22} />
        </button>
      </div>

      {playBlocked && (
        <p className="music-blocked-hint">浏览器限制自动播放，请点击播放按钮 ▶️</p>
      )}

      <div className="music-volume">
        <span className="music-volume-label">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="music-volume-slider"
        />
      </div>
    </div>
  );
}
