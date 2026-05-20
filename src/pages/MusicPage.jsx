import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import { useAudioContext } from '../context/AudioContext';
import './MusicPage.css';

export default function MusicPage() {
  const audio = useAudioContext();

  return (
    <div className="music-page">
      <div className="music-page-header">
        <h2 className="music-page-title">我们的歌</h2>
        <p className="music-page-sub">每一首都是专属的旋律</p>
      </div>
      <MusicPlayer {...audio} />
    </div>
  );
}
