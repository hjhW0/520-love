import { useState, useEffect, useCallback, useMemo } from 'react';
import { LOVE_LETTERS } from '../config/content';
import './LoveLetterPage.css';

export default function LoveLetterPage() {
  const [view, setView] = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [paragraphIndex, setParagraphIndex] = useState(0);

  const selectedLetter = useMemo(
    () => LOVE_LETTERS.find((l) => l.id === selectedId) ?? null,
    [selectedId],
  );

  const fullText = useMemo(
    () => selectedLetter?.paragraphs.join('\n\n') ?? '',
    [selectedLetter],
  );

  // reset typewriter when switching letters
  useEffect(() => {
    setDisplayedText('');
    setCharIndex(0);
    setSkipped(false);
    setParagraphIndex(0);
  }, [selectedId]);

  // typewriter tick
  useEffect(() => {
    if (view !== 'detail' || skipped || !selectedLetter) return;
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        setCharIndex((i) => i + 1);
        const newlines = (displayedText.match(/\n\n/g) || []).length;
        setParagraphIndex(Math.min(newlines + 1, selectedLetter.paragraphs.length));
      }, 45);
      return () => clearTimeout(timer);
    }
  }, [charIndex, fullText, skipped, view, selectedLetter, displayedText]);

  const visibleParagraphs = skipped
    ? selectedLetter?.paragraphs ?? []
    : (selectedLetter?.paragraphs ?? []).slice(0, paragraphIndex);

  const openDetail = useCallback((id) => {
    setSelectedId(id);
    setView('detail');
  }, []);

  const backToList = useCallback(() => {
    setView('list');
    setSelectedId(null);
  }, []);

  const skip = useCallback(() => {
    setSkipped(true);
    setDisplayedText(fullText);
    setParagraphIndex(selectedLetter?.paragraphs.length ?? 0);
  }, [fullText, selectedLetter]);

  // guard: invalid selectedId falls back to list
  useEffect(() => {
    if (view === 'detail' && !selectedLetter) {
      setView('list');
    }
  }, [view, selectedLetter]);

  // ---- list view (or fallback when detail data is missing) ----
  if (view === 'list' || !selectedLetter) {
    return (
      <div className="letter-page" key="list">
        <div className="letter-list-container">
          <div className="letter-list-header">
            <h2 className="letter-list-title">情书集</h2>
            <p className="letter-list-subtitle">共 {LOVE_LETTERS.length} 封信</p>
          </div>

          {LOVE_LETTERS.length === 0 ? (
            <p className="letter-empty">暂无情书 ✉️</p>
          ) : (
            <div className="letter-list">
              {LOVE_LETTERS.map((letter) => (
                <button
                  key={letter.id}
                  className="letter-card"
                  onClick={() => openDetail(letter.id)}
                >
                  <div className="letter-card-content">
                    <h3 className="letter-card-title">{letter.title}</h3>
                    {letter.date && (
                      <span className="letter-card-date">{letter.date}</span>
                    )}
                    <p className="letter-card-summary">
                      {letter.paragraphs[0]?.slice(0, 30)}
                      {(letter.paragraphs[0]?.length ?? 0) > 30 ? '...' : ''}
                    </p>
                  </div>
                  <span className="letter-card-arrow">›</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- detail view ----
  return (
    <div className="letter-page" key="detail">
      <div className="letter-container">
        <button className="letter-back-btn" onClick={backToList}>
          ‹ 返回情书集
        </button>

        <h2 className="letter-title">{selectedLetter.title}</h2>
        <div className="letter-divider">━━ ❤️ ━━</div>

        <div className="letter-body">
          {selectedLetter.paragraphs.map((para, i) => {
            const isVisible = i < visibleParagraphs.length;
            const isCurrent = i === visibleParagraphs.length - 1 && !skipped;

            return (
              <p
                key={i}
                className={`letter-para${isVisible ? ' letter-para--visible' : ''}${isCurrent ? ' letter-para--typing' : ''}`}
              >
                {isVisible
                  ? isCurrent
                    ? (displayedText.split('\n\n')[i] || '')
                    : para
                  : ''}
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
            {selectedLetter.signOff.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
