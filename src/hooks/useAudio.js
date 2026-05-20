import { useState, useRef, useCallback, useEffect } from 'react';

export function useAudio(playlist) {
  const audioRef = useRef(null);
  const isSeekingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem('520-music-volume');
      return saved !== null ? parseFloat(saved) : 0.7;
    } catch {
      return 0.7;
    }
  });
  const [playBlocked, setPlayBlocked] = useState(false);

  const currentTrack = playlist[currentIndex] || null;

  // create Audio instance once (never destroyed by navigation)
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume;

    const onTimeUpdate = () => {
      if (isSeekingRef.current) return;
      setCurrentTime(audio.currentTime);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      if (currentIndex < playlist.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setCurrentIndex(0);
      }
    };
    const onError = () => {
      setIsPlaying(false);
      setPlayBlocked(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      // keep audio alive across page navigation
    };
  }, []);

  // load track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.pause();
    audio.src = currentTrack.src;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
        setPlayBlocked(true);
      });
    }
  }, [currentIndex]);

  // sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    try {
      localStorage.setItem('520-music-volume', String(volume));
    } catch {}
  }, [volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.play().then(() => {
      setIsPlaying(true);
      setPlayBlocked(false);
    }).catch(() => {
      setPlayBlocked(true);
    });
  }, [currentTrack]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    isSeekingRef.current = true;
    audio.currentTime = time;
    setCurrentTime(time);
    setTimeout(() => {
      isSeekingRef.current = false;
    }, 100);
  }, []);

  const next = useCallback(() => {
    if (playlist.length === 0) return;
    setCurrentIndex((i) => (i + 1) % playlist.length);
  }, [playlist.length]);

  const prev = useCallback(() => {
    if (playlist.length === 0) return;
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  return {
    currentTrack,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    playBlocked,
    isSeekingRef,
    setVolume,
    play,
    pause,
    toggle,
    seek,
    next,
    prev,
  };
}
