import './ClueHUD.css';

const TOTAL_CLUES = 6;

export default function ClueHUD({ cluesFound, onShowClues }) {
  const count = cluesFound.size;
  const pct = (count / TOTAL_CLUES) * 100;

  return (
    <div className="clue-hud" onClick={onShowClues} title="View collected clues">
      <div className="clue-hud__icon">🔍</div>
      <div className="clue-hud__info">
        <span className="clue-hud__label">EVIDENCE COLLECTED</span>
        <div className="clue-hud__bar-wrap">
          <div className="clue-hud__bar" style={{ width: `${pct}%` }} />
        </div>
        <span className="clue-hud__count">
          {count} / {TOTAL_CLUES} CLUES
        </span>
      </div>
      {count >= TOTAL_CLUES && (
        <div className="clue-hud__ready">READY TO SOLVE ▶</div>
      )}
    </div>
  );
}
