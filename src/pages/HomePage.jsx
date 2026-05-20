import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts/FloatingHearts';
import Countdown from '../components/Countdown/Countdown';
import { COUPLE_INFO } from '../config/content';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <FloatingHearts />
      <div className="home-content">
        <p className="home-date">2026.05.20</p>
        <h1 className="home-title">
          Happy 520
          <br />
          <span className="home-name">{COUPLE_INFO.partner1}</span>
        </h1>
        <p className="home-subtitle">用这个小小的应用，装满我们所有的回忆</p>

        <Countdown startDate={COUPLE_INFO.startDate} />

        <div className="home-actions">
          <button
            className="home-btn home-btn--primary"
            onClick={() => navigate('/gallery')}
          >
            看看我们的回忆 ❤️
          </button>
          <button
            className="home-btn home-btn--music"
            id="start-music-btn"
            onClick={() => navigate('/music')}
          >
            开启音乐 🎵
          </button>
        </div>
      </div>
    </div>
  );
}
