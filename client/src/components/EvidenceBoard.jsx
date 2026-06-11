import { useState } from 'react';
import './EvidenceBoard.css';

const PROJECTS = [
  {
    id: 'proj-001',
    caseNum: 'EXHIBIT B-1',
    title: '[Project Name — To Be Added]',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    status: 'CLOSED — DEPLOYED',
    description: '[Describe what this project does, the problem it solves, and your role in building it. What were you most proud of?]',
    github: '#',
    live: '#',
    clueId: 'CLUE_003',
    clueText: 'Project evidence confirms subject is a full-stack builder. Both the frontend architecture and backend logic bear her fingerprints.',
    finding: 'Subject demonstrated strong systems thinking — the architecture is intentional, not accidental.',
  },
  {
    id: 'proj-002',
    caseNum: 'EXHIBIT B-2',
    title: '[Project Name — To Be Added]',
    tech: ['JavaScript', 'Express', 'HTML/CSS'],
    status: 'ACTIVE — IN PROGRESS',
    description: '[Describe what this project does. What challenge does it solve? What did you learn building it?]',
    github: '#',
    live: null,
    clueId: 'CLUE_004',
    clueText: 'A second project file recovered. Subject has a pattern: she builds things that she herself would want to use.',
    finding: 'Motive confirmed — she builds for people, not for résumés.',
  },
  {
    id: 'proj-003',
    caseNum: 'EXHIBIT B-3',
    title: '[Project Name — To Be Added]',
    tech: ['React', 'PostgreSQL', '[Tech Stack]'],
    status: 'ONGOING',
    description: '[Describe what this project does. What makes it interesting?]',
    github: '#',
    live: '#',
    clueId: null,
    clueText: null,
    finding: null,
  },
];

export default function EvidenceBoard({ onClueFound, cluesFound }) {
  const [openProjects, setOpenProjects] = useState(new Set());

  function handleOpenProject(project) {
    setOpenProjects(prev => new Set([...prev, project.id]));
    if (project.clueId && !cluesFound.has(project.clueId)) {
      onClueFound({
        id: project.clueId,
        label: `CLUE #${project.clueId.slice(-3)}`,
        text: project.clueText,
      });
    }
  }

  function handleCloseProject(id) {
    setOpenProjects(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return (
    <section className="evidence-board" id="projects">
      <div className="tape">◆ SECTION B — EVIDENCE FILES ◆ PROJECT DOCUMENTATION ◆ TECHNICAL EXHIBITS ◆</div>

      <div className="evidence-board__inner">
        <div className="evidence-board__title-row">
          <h2 className="evidence-board__title">EVIDENCE BOARD</h2>
          <span className="stamp stamp--blue" style={{ fontSize: '0.8rem' }}>FILED</span>
        </div>
        <p className="evidence-board__subtitle">
          CASE FILE SECTION B — PROJECT RECORDS &amp; TECHNICAL DOCUMENTATION
        </p>

        <div className="corkboard">
          <div className="corkboard__texture" aria-hidden="true" />

          <div className="evidence-cards">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className={`evidence-card ${openProjects.has(project.id) ? 'evidence-card--open' : ''}`}
              >
                {/* Pushpin */}
                <div className="pushpin" aria-hidden="true">●</div>

                {/* Card face */}
                {!openProjects.has(project.id) ? (
                  <div className="evidence-card__face">
                    <div className="evidence-card__bag">
                      <span className="evidence-card__bag-label">EVIDENCE</span>
                      <span className="evidence-card__case-num">{project.caseNum}</span>
                      <div className="evidence-card__preview">
                        <div className="evidence-card__screen">
                          <div className="screen-line" />
                          <div className="screen-line screen-line--short" />
                          <div className="screen-line" />
                          <div className="screen-line screen-line--medium" />
                        </div>
                      </div>
                      <span className="evidence-card__title-preview">{project.title}</span>
                      <div className="evidence-card__tech-tags">
                        {project.tech.slice(0, 2).map(t => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                        {project.tech.length > 2 && <span className="tech-tag">+{project.tech.length - 2}</span>}
                      </div>
                    </div>
                    <button
                      className="btn btn--red evidence-card__open-btn"
                      onClick={() => handleOpenProject(project)}
                    >
                      ▶ Open File
                      {project.clueId && !cluesFound.has(project.clueId) && (
                        <span className="evidence-card__clue-dot" title="Evidence inside">⚑</span>
                      )}
                    </button>
                  </div>
                ) : (
                  /* Expanded file view */
                  <div className="evidence-card__expanded paper">
                    <div className="expanded__header">
                      <span className="case-number">{project.caseNum}</span>
                      <button className="expanded__close" onClick={() => handleCloseProject(project.id)}>✕ Close</button>
                    </div>

                    <div className="expanded__status-row">
                      <span className="stamp stamp--blue" style={{ fontSize: '0.6rem', transform: 'rotate(2deg)' }}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="expanded__title">{project.title}</h3>

                    <div className="expanded__field">
                      <span className="expanded__label">TECH STACK</span>
                      <div className="expanded__tech">
                        {project.tech.map(t => <span key={t} className="tech-tag tech-tag--dark">{t}</span>)}
                      </div>
                    </div>

                    <div className="expanded__field">
                      <span className="expanded__label">CASE SUMMARY</span>
                      <p className="expanded__desc">{project.description}</p>
                    </div>

                    {project.finding && (
                      <div className="expanded__finding">
                        <span className="expanded__label">DETECTIVE'S NOTE</span>
                        <p className="expanded__finding-text">
                          <em>"{project.finding}"</em>
                        </p>
                      </div>
                    )}

                    <div className="expanded__links">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn--red"
                        style={{ fontSize: '0.7rem', padding: '6px 14px' }}
                      >
                        ⚙ Source Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn--yellow"
                          style={{ fontSize: '0.7rem', padding: '6px 14px' }}
                        >
                          ▶ Live Demo
                        </a>
                      )}
                    </div>

                    {project.clueId && cluesFound.has(project.clueId) && (
                      <div className="clue-card" style={{ marginTop: '14px' }}>
                        <span className="clue-card__label">CLUE #{project.clueId.slice(-3)} — COLLECTED</span>
                        <p className="clue-card__text">{project.clueText}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
