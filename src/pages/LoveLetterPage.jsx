import { useState, useEffect, useRef, useCallback } from 'react';
import { LOVE_LETTER } from '../config/content';
import './LoveLetterPage.css';

export default function LoveLetterPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const containerRef = useRef(null);

  const fullText = LOVE_LETTER.paragraphs.join('\n\n');

  const skip = useCallback(() => {
    setSkipped(true);
    setDisplayedText(fullText);
    setParagraphIndex(LOVE_LETTER.paragraphs.length);
  }, [fullText]);

  useEffect(() => {
    if (skipped) return;
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        setCharIndex((i) => i + 1);

        const newlines = (displayedText.match(/\n\n/g) || []).length;
        setParagraphIndex(Math.min(newlines + 1, LOVE_LETTER.paragraphs.length));
      }, 45);
      return () => clearTimeout(timer);
    }
  }, [charIndex, fullText, skipped, displayedText]);

  const visibleParagraphs = skipped
    ? LOVE_LETTER.paragraphs
    : LOVE_LETTER.paragraphs.slice(0, paragraphIndex);

  return (
    <div className="letter-page">
      <div className="letter-container" ref={containerRef}>
        <h2 className="letter-title">{LOVE_LETTER.title}</h2>
        <div className="letter-divider">━━ ❤️ ━━</div>

        <div className="letter-body">
          {LOVE_LETTER.paragraphs.map((para, i) => {
            const isVisible = i < visibleParagraphs.length;
            const isCurrent = i === visibleParagraphs.length - 1 && !skipped;

            return (
              <p
                key={i}
                className={`letter-para${isVisible ? ' letter-para--visible' : ''}${isCurrent ? ' letter-para--typing' : ''}`}
              >
                {isVisible ? (isCurrent ? displayedText.split('\n\n')[i] || '' : para) : ''}
                {isCurrent && <span className="letter-cursor">|</span>}
              </p>
            );
          })}
        </div>

        {!skipped && charIndex < fullText.length && (
          <button className="letter-skip-btn" onClick={skip}>
            直接查看全文
          </button>
        )}

        {(skipped || charIndex >= fullText.length) && (
          <div className="letter-signoff">
            {LOVE_LETTER.signOff.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
