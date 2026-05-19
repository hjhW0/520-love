import { useState, useEffect, useRef, useCallback } from 'react';
import './FloatingHearts.css';

const MAX_HEARTS = 15;
const HEARTS = ['❤️', '💕', '💗', '💖', '💘', '💝', '💓', '🩷'];

export default function FloatingHearts() {
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);

  const spawnHeart = useCallback(() => {
    const id = idRef.current++;
    const heart = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    const x = Math.random() * 100;
    const size = 16 + Math.random() * 24;
    const duration = 4 + Math.random() * 5;
    const delay = Math.random() * 2;
    const wobble = (Math.random() - 0.5) * 60;

    setParticles((prev) => {
      const next = [...prev, { id, heart, x, size, duration, delay, wobble }];
      if (next.length > MAX_HEARTS) {
        return next.slice(next.length - MAX_HEARTS);
      }
      return next;
    });

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, (duration + delay) * 1000 + 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnHeart, 400);
    return () => clearInterval(interval);
  }, [spawnHeart]);

  return (
    <div className="floating-hearts" aria-hidden="true">
      {particles.map(({ id, heart, x, size, duration, delay, wobble }) => (
        <span
          key={id}
          className="heart-particle"
          style={{
            left: `${x}%`,
            fontSize: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            '--wobble': `${wobble}px`,
          }}
        >
          {heart}
        </span>
      ))}
    </div>
  );
}
