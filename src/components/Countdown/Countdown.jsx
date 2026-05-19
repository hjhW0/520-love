import { useState, useEffect } from 'react';
import './Countdown.css';

export default function Countdown({ startDate }) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const start = new Date(startDate);
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
    };
    calculate();
    const interval = setInterval(calculate, 60000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="countdown">
      <p className="countdown-label">我们已经在一起</p>
      <div className="countdown-number">
        {String(days).split('').map((digit, i) => (
          <span key={i} className="countdown-digit" style={{ animationDelay: `${i * 0.1}s` }}>
            {digit}
          </span>
        ))}
        <span className="countdown-unit"> 天</span>
      </div>
      <p className="countdown-sub">每一天都是最美好的礼物</p>
    </div>
  );
}
