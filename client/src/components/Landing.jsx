import { useState, useEffect } from 'react';
import './Landing.css';

export default function Landing({ onBeginInvestigation, onClueFound, cluesFound }) {
  const [caseFileOpen, setCaseFileOpen] = useState(false);
  const [clue1Collected, setClue1Collected] = useState(false);
  const [showSiren, setShowSiren] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSiren(false), 2000);
    return () => clearTimeout(t);
  }, []);

  function handleOpenCase() {
    setCaseFileOpen(true);
    if (!clue1Collected && !cluesFound.has('CLUE_001')) {
      setClue1Collected(true);
      onClueFound({
        id: 'CLUE_001',
        label: 'CLUE #001',
        text: 'Subject was last seen at 2:47 AM, pushing a commit titled "fix: production is on fire." A cold cup of coffee sat beside the keyboard.',
      });
    }
  }

  return (
    <section className="landing" id="landing">
      {showSiren && <div className="siren-overlay" aria-hidden="true" />}

      <div className="tape tape--top">
        ◆ CRIME SCENE — DO NOT CROSS ◆ CRIME SCENE — DO NOT CROSS ◆ CRIME SCENE — DO NOT CROSS ◆ CRIME SCENE — DO NOT CROSS ◆
      </div>

      <div className="landing__inner">
        <div className="landing__badge">
          <div className="badge">
            <div className="badge__star">★</div>
            <div className="badge__text">
              <span>DETECTIVE</span>
              <span>DIVISION</span>
            </div>
          </div>
        </div>

        <div className="landing__headline">
          <p className="landing__case-label">CASE FILE NO. 2024-EC-0001</p>
          <h1 className="landing__title">MISSING<br />PERSON</h1>
          <p className="landing__subtitle">A BRILLIANT ENGINEER HAS GONE MISSING</p>
        </div>

        <div className="landing__bulletin paper">
          <div className="bulletin__header">
            <span className="stamp stamp--red" style={{ transform: 'rotate(-5deg)' }}>URGENT</span>
            <div className="bulletin__meta">
              <p className="case-number">METROPOLITAN DETECTIVE BUREAU</p>
              <p className="case-number">CASE OPENED: [DATE REDACTED]</p>
            </div>
          </div>

          <div className="bulletin__photo-row">
            <div className="bulletin__photo">
              <div className="photo-placeholder">
                <span>SUBJECT</span>
                <span>PHOTO</span>
                <span>ON FILE</span>
              </div>
              <p className="bulletin__photo-caption">COBOS, Evelin — Primary Person of Interest</p>
            </div>
            <div className="bulletin__details">
              <h2 className="bulletin__name">EVELIN COBOS</h2>
              <p className="bulletin__alias">A.K.A. "THE ENGINEER"</p>
              <div className="bulletin__fields">
                <div className="bulletin__field">
                  <span className="field-label">OCCUPATION</span>
                  <span className="field-value">Software Engineer</span>
                </div>
                <div className="bulletin__field">
                  <span className="field-label">LAST KNOWN LOCATION</span>
                  <span className="field-value">[CITY, STATE — REDACTED]</span>
                </div>
                <div className="bulletin__field">
                  <span className="field-label">LAST SEEN</span>
                  <span className="field-value">Debugging a production incident</span>
                </div>
                <div className="bulletin__field">
                  <span className="field-label">STATUS</span>
                  <span className="field-value field-value--red">MISSING — WHEREABOUTS UNKNOWN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bulletin__description">
            <p>
              The subject, known only to colleagues as an obsessive problem-solver,
              vanished without a trace. She left behind a trail of <strong>commits, projects,
              and unanswered Slack messages.</strong> Witnesses report she was last seen
              muttering something about "clean code" before disappearing into the night.
            </p>
            <p style={{ marginTop: '8px' }}>
              <em>You have been assigned to this case. The evidence is scattered.
              Find the clues. Piece together her story.</em>
            </p>
          </div>

          {!caseFileOpen ? (
            <button className="btn btn--red bulletin__cta" onClick={handleOpenCase}>
              ▶ Open Case File
            </button>
          ) : (
            <div className="bulletin__clue-reveal">
              <div className="clue-card">
                <span className="clue-card__label">CLUE #001 — COLLECTED</span>
                <p className="clue-card__text">
                  "Subject was last seen at 2:47 AM, pushing a commit titled
                  <em> 'fix: production is on fire.'</em> A cold cup of coffee sat beside the keyboard."
                </p>
              </div>
              <button className="btn btn--yellow bulletin__begin" onClick={onBeginInvestigation}>
                ▼ Begin Investigation
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="tape tape--bottom">
        ◆ CRIME SCENE — DO NOT CROSS ◆ CRIME SCENE — DO NOT CROSS ◆ CRIME SCENE — DO NOT CROSS ◆ CRIME SCENE — DO NOT CROSS ◆
      </div>
    </section>
  );
}
