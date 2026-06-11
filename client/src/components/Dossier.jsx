import { useState } from 'react';
import './Dossier.css';

const SKILLS = [
  { name: 'JavaScript', level: 'Expert', redacted: false },
  { name: 'HTML & CSS', level: 'Expert', redacted: false },
  { name: 'Node.js', level: 'Proficient', redacted: false },
  { name: 'PostgreSQL', level: 'Proficient', redacted: false },
  { name: '[CLASSIFIED SKILL]', level: '[CLASSIFIED]', redacted: true, clueId: 'CLUE_002', reveal: 'Responsive Design' },
  { name: 'React', level: 'Proficient', redacted: false },
  { name: 'Express', level: 'Proficient', redacted: false },
  { name: '[CLASSIFIED TOOL]', level: '[CLASSIFIED]', redacted: true, clueId: 'CLUE_002b', reveal: 'Git & GitHub' },
];

export default function Dossier({ onClueFound, cluesFound }) {
  const [revealedSkills, setRevealedSkills] = useState(new Set());
  const [educationOpen, setEducationOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);

  function handleRevealSkill(skill) {
    if (!skill.redacted || revealedSkills.has(skill.clueId)) return;
    setRevealedSkills(prev => new Set([...prev, skill.clueId]));
    if (!cluesFound.has('CLUE_002')) {
      onClueFound({
        id: 'CLUE_002',
        label: 'CLUE #002',
        text: `Evidence of additional skills found in classified section of dossier. Subject has deeper technical range than initially reported.`,
      });
    }
  }

  function handleEducationOpen() {
    setEducationOpen(true);
    if (!cluesFound.has('CLUE_005')) {
      onClueFound({
        id: 'CLUE_005',
        label: 'CLUE #005',
        text: '"A former professor stated: She was always the last one in the lab and the first to ask how something really worked under the hood."',
      });
    }
  }

  function handleTimelineOpen() {
    setTimelineOpen(true);
    if (!cluesFound.has('CLUE_006')) {
      onClueFound({
        id: 'CLUE_006',
        label: 'CLUE #006',
        text: 'Reconstructed career timeline confirms: the subject has been building things since day one. The work speaks for itself.',
      });
    }
  }

  return (
    <section className="dossier" id="about">
      <div className="dossier__header">
        <div className="tape">◆ SECTION A — SUBJECT DOSSIER ◆ PERSONAL FILE ◆ BACKGROUND CHECK ◆ FIELD NOTES ◆</div>
      </div>

      <div className="dossier__inner">
        <div className="dossier__title-row">
          <h2 className="dossier__title">SUBJECT DOSSIER</h2>
          <span className="stamp stamp--red" style={{ fontSize: '0.8rem' }}>CONFIDENTIAL</span>
        </div>
        <p className="dossier__subtitle">CASE FILE SECTION A — PERSONAL PROFILE &amp; BACKGROUND</p>

        <div className="dossier__columns">
          {/* LEFT: Profile card */}
          <div className="dossier__profile paper">
            <div className="dossier__profile-header">
              <span className="case-number">SUBJECT ID: EC-2024-001</span>
            </div>

            <div className="dossier__photo-wrap">
              <div className="dossier__photo">
                <div className="photo-placeholder-lg">
                  <span>PHOTO</span>
                  <span>ON FILE</span>
                </div>
              </div>
              <div className="stamp stamp--blue" style={{ position: 'absolute', bottom: '8px', right: '8px', fontSize: '0.65rem' }}>
                IDENTIFIED
              </div>
            </div>

            <div className="dossier__id-fields">
              <div className="id-field">
                <span className="id-field__label">FULL NAME</span>
                <span className="id-field__value">Evelin Cobos</span>
              </div>
              <div className="id-field">
                <span className="id-field__label">ALIAS</span>
                <span className="id-field__value">"The Engineer"</span>
              </div>
              <div className="id-field">
                <span className="id-field__label">OCCUPATION</span>
                <span className="id-field__value">Software Engineer</span>
              </div>
              <div className="id-field">
                <span className="id-field__label">BACKGROUND</span>
                <span className="id-field__value">Fmr. English Literature Student</span>
              </div>
              <div className="id-field">
                <span className="id-field__label">SPECIALTY</span>
                <span className="id-field__value">Full-Stack Development</span>
              </div>
              <div className="id-field">
                <span className="id-field__label">STATUS</span>
                <span className="id-field__value" style={{ color: 'var(--red-dark)', fontWeight: 'bold' }}>ACTIVE — BUILDING</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Interview transcript */}
          <div className="dossier__transcript paper">
            <div className="transcript__header">
              <span className="case-number">INTERVIEW TRANSCRIPT — SUBJECT SELF-REPORT</span>
              <span className="stamp stamp--red" style={{ fontSize: '0.6rem', transform: 'rotate(4deg)' }}>VERIFIED</span>
            </div>

            <p className="transcript__prompt">DETECTIVE: "Tell us about yourself."</p>
            <p className="transcript__response">
              <em>Subject pauses, as if deciding how much to reveal.</em>
            </p>
            <p className="transcript__response">
              "My name is Evelin Cobos. I'm a developer passionate about creating websites
              that are both beautiful and functional. Before I wrote a single line of code,
              I studied English literature — which taught me that the best stories have
              structure, clarity, and purpose. I bring that same thinking to my code."
            </p>
            <p className="transcript__response">
              "Good design should be invisible. It just works. Since making the switch to
              software engineering, I've been building projects in JavaScript, HTML, CSS,
              Node.js, and beyond — and I'm just getting started."
            </p>
            <p className="transcript__prompt">DETECTIVE: "What drives you?"</p>
            <p className="transcript__response">
              "Science fiction, coffee shops, photography — and the next interesting problem
              to solve. I want to build things that feel effortless to use but are anything
              but simple under the hood. Every line of code is a clue toward something better."
            </p>

            <div className="transcript__footer">
              <span className="case-number">END OF TRANSCRIPT EXCERPT — FULL RECORDING ON FILE</span>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="dossier__skills">
          <h3 className="dossier__section-label">
            <span className="section-tag">EXHIBIT A-2</span>
            Known Capabilities — Skills Analysis
          </h3>
          <p className="dossier__skills-note">
            Click <span style={{ color: 'var(--red)' }}>CLASSIFIED</span> items to attempt declassification.
          </p>
          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <div
                key={i}
                className={`skill-item ${skill.redacted ? 'skill-item--redacted' : ''} ${revealedSkills.has(skill.clueId) ? 'skill-item--revealed' : ''}`}
                onClick={() => handleRevealSkill(skill)}
              >
                <span className="skill-item__name">
                  {skill.redacted && !revealedSkills.has(skill.clueId)
                    ? <span className="redacted">{skill.name}</span>
                    : (revealedSkills.has(skill.clueId) ? skill.reveal : skill.name)
                  }
                </span>
                <span className="skill-item__level">
                  {skill.redacted && !revealedSkills.has(skill.clueId)
                    ? <span className="redacted">{skill.level}</span>
                    : skill.level
                  }
                </span>
                {skill.redacted && !revealedSkills.has(skill.clueId) && (
                  <span className="skill-item__hint">[ CLICK TO DECLASSIFY ]</span>
                )}
                {revealedSkills.has(skill.clueId) && (
                  <span className="skill-item__unlocked">🔓 DECLASSIFIED</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="dossier__accordion">
          <button
            className={`accordion-header ${educationOpen ? 'accordion-header--open' : ''}`}
            onClick={handleEducationOpen}
          >
            <span className="section-tag">EXHIBIT A-3</span>
            <span>Background Check — Education &amp; Training</span>
            <span className="accordion-arrow">{educationOpen ? '▲' : '▼'}</span>
            {!cluesFound.has('CLUE_005') && <span className="clue-hint">⚑ Evidence inside</span>}
          </button>
          {educationOpen && (
            <div className="accordion-body paper">
              <div className="bg-check-item">
                <span className="bg-check__label">INSTITUTION</span>
                <span className="bg-check__value">The Marcy Lab School</span>
              </div>
              <div className="bg-check-item">
                <span className="bg-check__label">CREDENTIAL</span>
                <span className="bg-check__value">Software Engineering Fellow</span>
              </div>
              <div className="bg-check-item">
                <span className="bg-check__label">FOCUS</span>
                <span className="bg-check__value">Full-Stack JavaScript — HTML, CSS, Node.js, PostgreSQL, React</span>
              </div>
              <div className="bg-check-item">
                <span className="bg-check__label">PRIOR EDUCATION</span>
                <span className="bg-check__value">English Literature — background in writing, structure, and storytelling</span>
              </div>
              <div className="bg-check-item bg-check-item--witness">
                <span className="bg-check__label">WITNESS STATEMENT</span>
                <span className="bg-check__value">
                  <em>"She was always the last one in the lab and the first to ask
                  how something really worked under the hood."</em>
                  <br /><span style={{ fontSize: '0.7rem', color: 'var(--ink-faded)' }}>— Former Professor</span>
                </span>
              </div>
              {cluesFound.has('CLUE_005') && (
                <div className="clue-card" style={{ marginTop: '12px' }}>
                  <span className="clue-card__label">CLUE #005 — COLLECTED</span>
                  <p className="clue-card__text">"...always the last one in the lab..."</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CAREER TIMELINE */}
        <div className="dossier__accordion">
          <button
            className={`accordion-header ${timelineOpen ? 'accordion-header--open' : ''}`}
            onClick={handleTimelineOpen}
          >
            <span className="section-tag">EXHIBIT A-4</span>
            <span>Movement History — Career Timeline</span>
            <span className="accordion-arrow">{timelineOpen ? '▲' : '▼'}</span>
            {!cluesFound.has('CLUE_006') && <span className="clue-hint">⚑ Evidence inside</span>}
          </button>
          {timelineOpen && (
            <div className="accordion-body paper">
              <div className="timeline">
                <div className="timeline__item">
                  <span className="timeline__date">CURRENT</span>
                  <span className="timeline__role">Software Engineering Fellow</span>
                  <span className="timeline__org">The Marcy Lab School</span>
                  <p className="timeline__detail">Building full-stack applications in JavaScript, Node.js, PostgreSQL, and React. Collaborating on team projects, shipping real software, and going deep on computer science fundamentals.</p>
                </div>
                <div className="timeline__item">
                  <span className="timeline__date">BEFORE</span>
                  <span className="timeline__role">English Literature Student</span>
                  <span className="timeline__org">Prior Academic Study</span>
                  <p className="timeline__detail">Studied writing, narrative structure, and the architecture of a good story. Turns out code has a lot in common — clarity, intent, and knowing your audience.</p>
                </div>
                <div className="timeline__item">
                  <span className="timeline__date">THE SWITCH</span>
                  <span className="timeline__role">First Line of Code</span>
                  <span className="timeline__org">Where it all began</span>
                  <p className="timeline__detail">Discovered that building for the web combines the logic she loved with the creativity she needed. Never looked back.</p>
                </div>
              </div>
              {cluesFound.has('CLUE_006') && (
                <div className="clue-card" style={{ marginTop: '12px' }}>
                  <span className="clue-card__label">CLUE #006 — COLLECTED</span>
                  <p className="clue-card__text">"The subject has been building things since day one."</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
