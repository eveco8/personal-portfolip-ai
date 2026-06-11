import { useState, useEffect, useRef } from 'react';
import './index.css';
import Landing from './components/Landing';
import ClueHUD from './components/ClueHUD';
import Dossier from './components/Dossier';
import EvidenceBoard from './components/EvidenceBoard';
import Puzzle from './components/Puzzle';
import Contact from './components/Contact';

const TOTAL_CLUES = 6;

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [cluesFound, setCluesFound] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [contactUnlocked, setContactUnlocked] = useState(false);
  const [showClueLog, setShowClueLog] = useState(false);
  const [collectedClues, setCollectedClues] = useState([]);
  const toastTimerRef = useRef(null);

  const puzzleReady = cluesFound.size >= TOTAL_CLUES;

  function handleClueFound(clue) {
    setCluesFound(prev => {
      if (prev.has(clue.id)) return prev;
      const next = new Set(prev);
      next.add(clue.id);
      return next;
    });
    setCollectedClues(prev => {
      if (prev.find(c => c.id === clue.id)) return prev;
      return [...prev, clue];
    });

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(clue);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }

  function handlePuzzleSolved() {
    setContactUnlocked(true);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }

  function handleBeginInvestigation() {
    setGameStarted(true);
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }

  useEffect(() => {
    return () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); };
  }, []);

  return (
    <>
      {/* LANDING */}
      <Landing
        onBeginInvestigation={handleBeginInvestigation}
        onClueFound={handleClueFound}
        cluesFound={cluesFound}
      />

      {/* MAIN INVESTIGATION CONTENT */}
      {gameStarted && (
        <>
          <div className="section-divider">
            <span>INVESTIGATION UNDERWAY — DETECTIVE ON SCENE</span>
          </div>

          {/* SECTION A: ABOUT */}
          <Dossier onClueFound={handleClueFound} cluesFound={cluesFound} />

          <div className="section-divider">
            <span>PROCEEDING TO EVIDENCE FILES</span>
          </div>

          {/* SECTION B: PROJECTS */}
          <EvidenceBoard onClueFound={handleClueFound} cluesFound={cluesFound} />

          <div className="section-divider">
            <span>{puzzleReady ? 'SUFFICIENT EVIDENCE COLLECTED — PROCEED TO RESOLUTION' : `${cluesFound.size} / ${TOTAL_CLUES} CLUES COLLECTED — CONTINUE INVESTIGATION`}</span>
          </div>

          {/* SECTION C: PUZZLE (always shown once game started, locks input until ready) */}
          {puzzleReady ? (
            <Puzzle cluesFound={cluesFound} onSolved={handlePuzzleSolved} />
          ) : (
            <div className="puzzle-teaser">
              <p className="puzzle-teaser__text">
                ⚑ Collect all {TOTAL_CLUES} clues to unlock the final challenge.
                <span className="puzzle-teaser__count">
                  ({cluesFound.size}/{TOTAL_CLUES} found)
                </span>
              </p>
            </div>
          )}

          <div className="section-divider">
            <span>{contactUnlocked ? 'DIRECT CHANNEL OPEN' : 'ACCESS RESTRICTED'}</span>
          </div>

          {/* SECTION D: CONTACT */}
          <Contact isUnlocked={contactUnlocked} />

          {/* FOOTER */}
          <footer className="site-footer">
            <div className="tape">
              ◆ END OF CASE FILE ◆ METROPOLITAN DETECTIVE BUREAU ◆ REF: EC-2024-0001 ◆
            </div>
            <p className="site-footer__credit">
              Case file designed &amp; built by Evelin Cobos &nbsp;·&nbsp; Built with React &amp; Node.js
            </p>
          </footer>
        </>
      )}

      {/* CLUE HUD */}
      <ClueHUD
        cluesFound={cluesFound}
        onShowClues={() => setShowClueLog(v => !v)}
      />

      {/* CLUE LOG MODAL */}
      {showClueLog && (
        <div className="clue-log-overlay" onClick={() => setShowClueLog(false)}>
          <div className="clue-log paper" onClick={e => e.stopPropagation()}>
            <div className="clue-log__header">
              <span className="case-number">DETECTIVE'S NOTEBOOK — EVIDENCE LOG</span>
              <button className="clue-log__close" onClick={() => setShowClueLog(false)}>✕</button>
            </div>
            {collectedClues.length === 0 ? (
              <p className="clue-log__empty">No clues collected yet. Begin your investigation.</p>
            ) : (
              <div className="clue-log__list">
                {collectedClues.map(clue => (
                  <div key={clue.id} className="clue-log__item">
                    <span className="clue-log__id">{clue.label}</span>
                    <p className="clue-log__text">{clue.text}</p>
                  </div>
                ))}
                {cluesFound.size < TOTAL_CLUES && (
                  <p className="clue-log__remaining">
                    {TOTAL_CLUES - cluesFound.size} more clue(s) remaining — keep investigating.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="clue-collected-toast">
          🔍 {toast.label} COLLECTED
        </div>
      )}
    </>
  );
}
