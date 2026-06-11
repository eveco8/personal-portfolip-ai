import { useState } from 'react';
import './Contact.css';

export default function Contact({ isUnlocked }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Transmission failed.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Could not reach the case file server. Try again.');
    }
  }

  if (!isUnlocked) {
    return (
      <section className="contact contact--locked" id="contact">
        <div className="tape">◆ SECTION D — CLASSIFIED ◆ ACCESS RESTRICTED ◆ COMPLETE INVESTIGATION ◆</div>
        <div className="contact__locked-inner">
          <div className="locked-file paper">
            <div className="locked-file__icon">🔒</div>
            <h2 className="locked-file__title">SECTION D — CLASSIFIED</h2>
            <p className="locked-file__subtitle">CONTACT INFORMATION — ACCESS RESTRICTED</p>
            <div className="stamp stamp--red" style={{ display: 'block', textAlign: 'center', margin: '16px auto', width: 'fit-content', fontSize: '1.1rem' }}>
              CASE UNSOLVED
            </div>
            <p className="locked-file__text">
              This file is sealed pending case resolution. Collect all available evidence
              and identify the missing engineer to gain access to direct communication channels.
            </p>
            <div className="locked-file__progress">
              <span className="locked-file__progress-label">INVESTIGATION PROGRESS</span>
              <p className="locked-file__progress-hint">
                ↑ Check the evidence tracker in the bottom-right corner.
                Collect all 6 clues, then solve the case above.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact contact--unlocked" id="contact">
      <div className="tape" style={{ background: 'var(--yellow-tape)' }}>
        ◆ SECTION D — CONTACT CHANNEL UNLOCKED ◆ CASE SOLVED ◆ DIRECT TRANSMISSION AVAILABLE ◆
      </div>

      <div className="contact__inner">
        <div className="contact__unlock-banner">
          <span className="stamp stamp--blue" style={{ fontSize: '1rem', display: 'block', textAlign: 'center' }}>
            CASE SOLVED — ACCESS GRANTED
          </span>
        </div>

        <div className="contact__title-row">
          <h2 className="contact__title">DIRECT TRANSMISSION</h2>
        </div>
        <p className="contact__subtitle">
          CASE FILE SECTION D — ESTABLISH CONTACT WITH THE MISSING ENGINEER
        </p>

        <div className="contact__columns">
          {/* LEFT: Intro document */}
          <div className="contact__brief paper">
            <div className="brief__header">
              <span className="case-number">FIELD NOTES — POST-INVESTIGATION</span>
            </div>
            <p className="brief__note">
              You found her. The evidence was there all along — in the commits,
              the projects, the late-night debug sessions.
            </p>
            <p className="brief__note">
              Evelin Cobos is not missing. She's building something new.
              If you'd like to be part of whatever that is — whether you have
              a project, an opportunity, or just want to connect — send a transmission.
            </p>

            <div className="brief__channels">
              <h4 className="brief__channels-label">OTHER CONTACT CHANNELS:</h4>
              <div className="channel-item">
                <span className="channel-item__label">EMAIL</span>
                <a className="channel-item__link" href="mailto:evecobos8@gmail.com">
                  evecobos8@gmail.com
                </a>
              </div>
              <div className="channel-item">
                <span className="channel-item__label">GITHUB</span>
                <a className="channel-item__link" href="https://github.com/eveco8" target="_blank" rel="noreferrer">
                  github.com/eveco8
                </a>
              </div>
              <div className="channel-item">
                <span className="channel-item__label">LINKEDIN</span>
                <a className="channel-item__link" href="https://www.linkedin.com/in/evelin-j-cobos" target="_blank" rel="noreferrer">
                  linkedin.com/in/evelin-j-cobos
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact form */}
          <div className="contact__form-wrap paper">
            <div className="form__header">
              <span className="case-number">SECURE TRANSMISSION FORM — CASE NO. 2024-EC-0001</span>
            </div>

            {status === 'success' ? (
              <div className="form__success">
                <div className="stamp stamp--blue" style={{ display: 'block', margin: '0 auto 16px', width: 'fit-content', fontSize: '0.9rem' }}>
                  TRANSMISSION RECEIVED
                </div>
                <p className="form__success-text">
                  Your message has been logged in the case file system.
                  The engineer will respond through the appropriate channels.
                </p>
                <button className="btn btn--red" style={{ marginTop: '16px' }} onClick={() => setStatus('idle')}>
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="form-field__label" htmlFor="contact-name">DETECTIVE NAME</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="form-field__input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-field__label" htmlFor="contact-email">SECURE CHANNEL (EMAIL)</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="form-field__input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-field__label" htmlFor="contact-message">TRANSMISSION MESSAGE</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-field__input form-field__textarea"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="State your business, Detective..."
                    required
                    rows={5}
                  />
                </div>

                {status === 'error' && (
                  <p className="form__error">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn btn--red form__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? '▷ Transmitting...' : '▶ Send Transmission'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
