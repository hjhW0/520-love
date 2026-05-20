import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import MusicPage from './pages/MusicPage';
import GamePage from './pages/GamePage';
import LoveLetterPage from './pages/LoveLetterPage';
import { AudioProvider } from './context/AudioContext';
import { APP_PASSWORD } from './config/content';
import './App.css';

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === APP_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="password-gate">
      <div className="password-card">
        <div className="password-heart">❤️</div>
        <h1 className="password-title">欢迎来到我们的回忆</h1>
        <p className="password-hint">请输入密码解锁这份心意</p>
        <form onSubmit={handleSubmit} className="password-form">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="输入密码..."
            className={`password-input${error ? ' password-input--error' : ''}`}
            autoFocus
          />
          <button type="submit" className="password-btn">
            解锁 ❤️
          </button>
        </form>
        {error && <p className="password-error">密码不对哦，再试一次吧</p>}
      </div>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(!APP_PASSWORD);
  const location = useLocation();

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <AudioProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={<PageWrapper key={location.pathname}><HomePage /></PageWrapper>}
          />
          <Route
            path="gallery"
            element={<PageWrapper key={location.pathname}><GalleryPage /></PageWrapper>}
          />
          <Route
            path="music"
            element={<PageWrapper key={location.pathname}><MusicPage /></PageWrapper>}
          />
          <Route
            path="game"
            element={<PageWrapper key={location.pathname}><GamePage /></PageWrapper>}
          />
          <Route
            path="letter"
            element={<PageWrapper key={location.pathname}><LoveLetterPage /></PageWrapper>}
          />
        </Route>
      </Routes>
    </AudioProvider>
  );
}

function PageWrapper({ children }) {
  return <div className="page-enter">{children}</div>;
}
