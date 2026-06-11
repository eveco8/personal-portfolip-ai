import { useState } from 'react';
import './Puzzle.css';

export default function Puzzle({ cluesFound, onSolved }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState(false);

  const cluesList = Array.from(cluesFound).map(id => {
    const CLUE_MAP = {
      CLUE_001: 'Subject pushed a commit at 2:47 AM titled "fix: production is on fire."',
      CLUE_002: 'Additional classified skills found in the dossier.',
      CLUE_003: 'Project evidence confirms full-stack proficiency.',
      CLUE_004: 'Second project confirms she builds for people, not résumés.',
      CLUE_005: '"Always the last one in the lab..."',
      CLUE_006: 'Career timeline confirms she has been building since day one.',
    };
    return { id, text: CLUE_MAP[id] || 'Evidence collected.' };
  });

  function handleSubmit(e) {
    e.preventDefault();
    const normalized = answer.trim().toLowerCase();
    if (normalized === 'evelin cobos' || normalized === 'evelincobos') {
      onSolved();
    } else {
      setAttempts(a => a + 1);
      setError('Incorrect. Review your evidence and try again, Detective.');
      setAnswer('');
      if (attempts >= 1) setHint(true);
    }
  }

  return (
    <section className="puzzle" id="puzzle">
      <div className="tape">◆ SECTION C — CASE RESOLUTION ◆ DETECTIVE CHALLENGE ◆ IDENTIFY THE SUBJECT ◆</div>

      <div className="puzzle__inner">
        <div className="puzzle__title-row">
          <h2 className="puzzle__title">CASE RESOLUTION</h2>
          <span className="stamp stamp--red" style={{ fontSize: '0.8rem' }}>PENDING</span>
        </div>
        <p className="puzzle__subtitle">CASE FILE SECTION C — SUBJECT IDENTIFICATION CHALLENGE</p>

        <div className="puzzle__briefing paper">
          <div className="briefing__header">
            <span className="case-number">DETECTIVE BUREAU — FINAL ASSESSMENT</span>
          </div>

          <div className="briefing__body">
            <p className="briefing__lead">
              You have gathered sufficient evidence. The investigation is nearly complete.
            </p>
            <p className="briefing__text">
              Review the clues below. A pattern emerges — one name runs through every file,
              every commit, every witness statement. <strong>Who is the missing engineer?</strong>
            </p>
          </div>

          {/* Clue evidence summary */}
          <div className="puzzle__clues">
            <h3 className="puzzle__clues-label">YOUR COLLECTED EVIDENCE:</h3>
            <div className="puzzle__clue-list">
              {cluesList.map(clue => (
                <div key={clue.id} className="puzzle__clue-item">
                  <span className="puzzle__clue-id">{clue.id.replace('_', ' #')}</span>
                  <span className="puzzle__clue-text">{clue.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Answer form */}
          <form className="puzzle__form" onSubmit={handleSubmit}>
            <label className="puzzle__form-label" htmlFor="suspect-name">
              ENTER SUSPECT'S FULL NAME:
            </label>
            {hint && (
              <p className="puzzle__hint">
                Hint: First name starts with 'E'. Last name starts with 'C'. Check the missing person bulletin.
              </p>
            )}
            <div className="puzzle__input-row">
              <input
                id="suspect-name"
                type="text"
                className="puzzle__input"
                value={answer}
                onChange={e => { setAnswer(e.target.value); setError(''); }}
                placeholder="First Last"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="submit" className="btn btn--red puzzle__submit">
                ▶ File Report
              </button>
            </div>
            {error && <p className="puzzle__error">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
