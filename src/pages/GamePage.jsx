import MemoryGame from '../components/MemoryGame/MemoryGame';
import { GAME_CARDS } from '../config/content';
import './GamePage.css';

export default function GamePage() {
  return (
    <div className="game-page">
      <div className="game-header">
        <h2 className="game-title">记忆翻牌</h2>
        <p className="game-sub">翻到两个相同的卡片即可消除，试试你的记忆力吧！</p>
      </div>
      <MemoryGame cards={GAME_CARDS} />
    </div>
  );
}
