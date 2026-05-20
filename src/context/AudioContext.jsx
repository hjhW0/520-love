import { createContext, useContext } from 'react';
import { useAudio } from '../hooks/useAudio';
import { PLAYLIST } from '../config/content';

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const audio = useAudio(PLAYLIST);
  return <AudioCtx.Provider value={audio}>{children}</AudioCtx.Provider>;
}

export function useAudioContext() {
  return useContext(AudioCtx);
}
