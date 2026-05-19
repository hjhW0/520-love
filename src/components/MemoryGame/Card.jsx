import './Card.css';

export default function Card({ content, type, isFlipped, isMatched, onClick }) {
  return (
    <div
      className={`card${isFlipped ? ' card--flipped' : ''}${isMatched ? ' card--matched' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <span className="card-front-icon">?</span>
        </div>
        <div className="card-back">
          {type === 'image' ? (
            <img src={content} alt="" className="card-image" />
          ) : (
            <span className="card-emoji">{content}</span>
          )}
        </div>
      </div>
    </div>
  );
}
