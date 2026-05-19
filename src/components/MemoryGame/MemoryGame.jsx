import { useState, useEffect, useCallback, useRef } from 'react';
import Card from './Card';
import { shuffle } from '../../utils/shuffle';
import './MemoryGame.css';

const BEST_SCORE_KEY = '520-memory-best';

function getBestScore() {
  try {
    const saved = localStorage.getItem(BEST_SCORE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveBestScore(moves, time) {
  const prev = getBestScore();
  if (!prev || moves < prev.moves || (moves === prev.moves && time < prev.time)) {
    const score = { moves, time };
    try {
      localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(score));
    } catch {}
    return score;
  }
  return prev;
}

export default function MemoryGame({ cards: cardDefs }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState('idle');
  const [time, setTime] = useState(0);
  const [bestScore, setBestScore] = useState(getBestScore);
  const lockRef = useRef(false);
  const timerRef = useRef(null);

  const initGame = useCallback(() => {
    const pairs = cardDefs.flatMap((card) => [
      { ...card, uid: `${card.pairId}-a` },
      { ...card, uid: `${card.pairId}-b` },
    ]);
    setCards(shuffle(pairs));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setTime(0);
    setGameStatus('idle');
    lockRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, [cardDefs]);

  useEffect(() => {
    initGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initGame]);

  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);

  const handleCardClick = useCallback((uid) => {
    if (lockRef.current) return;
    if (matched.has(uid)) return;
    if (flipped.includes(uid)) return;

    if (gameStatus === 'idle') {
      setGameStatus('playing');
    }

    const newFlipped = [...flipped, uid];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      lockRef.current = true;
      setMoves((m) => m + 1);

      const [first, second] = newFlipped;
      const card1 = cards.find((c) => c.uid === first);
      const card2 = cards.find((c) => c.uid === second);

      if (card1 && card2 && card1.pairId === card2.pairId) {
        setMatched((prev) => {
          const next = new Set(prev);
          next.add(first);
          next.add(second);
          if (next.size === cards.length) {
            setGameStatus('won');
            if (timerRef.current) clearInterval(timerRef.current);
            const newBest = saveBestScore(moves + 1, time);
            setBestScore(newBest);
          }
          return next;
        });
        setFlipped([]);
        lockRef.current = false;
      } else {
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 800);
      }
    }
  }, [flipped, matched, gameStatus, cards, moves, time]);

  const isFlipped = (uid) => flipped.includes(uid) || matched.has(uid);

  return (
    <div className="memory-game">
      <div className="memory-stats">
        <div className="memory-stat">
          <span className="memory-stat-label">步数</span>
          <span className="memory-stat-value">{moves}</span>
        </div>
        <div className="memory-stat">
          <span className="memory-stat-label">时间</span>
          <span className="memory-stat-value">{time}s</span>
        </div>
        {bestScore && (
          <div className="memory-stat memory-stat--best">
            <span className="memory-stat-label">最佳</span>
            <span className="memory-stat-value">{bestScore.moves}步 / {bestScore.time}s</span>
          </div>
        )}
      </div>

      <div className="memory-board">
        {cards.map((card) => (
          <Card
            key={card.uid}
            content={card.content}
            type={card.type}
            isFlipped={isFlipped(card.uid)}
            isMatched={matched.has(card.uid)}
            onClick={() => handleCardClick(card.uid)}
          />
        ))}
      </div>

      {gameStatus === 'won' && (
        <div className="memory-win-overlay">
          <div className="memory-win-card">
            <div className="memory-win-hearts">
              {Array.from({ length: 20 }, (_, i) => (
                <span
                  key={i}
                  className="memory-win-heart"
                  style={{
                    '--tx': `${(Math.random() - 0.5) * 200}px`,
                    '--ty': `${(Math.random() - 0.5) * 200}px`,
                    animationDelay: `${Math.random() * 0.3}s`,
                  }}
                >
                  ❤️
                </span>
              ))}
            </div>
            <h3 className="memory-win-title">太棒了！ 🎉</h3>
            <p className="memory-win-text">
              你用了 <strong>{moves} 步</strong> / <strong>{time} 秒</strong> 完成了游戏
            </p>
            {bestScore && (
              <p className="memory-win-best">
                最佳成绩：{bestScore.moves} 步 / {bestScore.time} 秒
              </p>
            )}
            <button className="memory-win-btn" onClick={initGame}>
              再玩一次
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
