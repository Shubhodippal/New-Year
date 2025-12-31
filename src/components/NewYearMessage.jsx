import './NewYearMessage.css'

const NewYearMessage = ({ scene, clickCount }) => {
  return (
    <div className="message-container">
      {/* Scene 1: Countdown */}
      <div className={`countdown ${scene >= 1 && scene < 2 ? 'active' : ''} ${scene >= 2 ? 'exit' : ''}`}>
        <div className="countdown-text">For Someone Special...</div>
        <div className="handwritten-note">Click to begin ✨</div>
      </div>

      {/* Scene 2: Year Reveal */}
      <div className={`year-reveal ${scene >= 2 && scene < 4 ? 'active' : ''} ${scene >= 4 ? 'fade-up' : ''}`}>
        <div className="year-container">
          <span className="digit interactive">2</span>
          <span className="digit interactive">0</span>
          <span className="digit interactive">2</span>
          <span className="digit interactive">6</span>
        </div>
        <div className="subtitle handwritten">A year of new possibilities</div>
      </div>

      {/* Scene 3 & 4: Happy New Year with Fireworks */}
      <div className={`main-greeting ${scene >= 3 && scene < 5 ? 'active' : ''} ${scene >= 5 ? 'fade-out' : ''}`}>
        <h1 className="elegant-title">
          <span className="word glow-hover">Happy</span>
          <span className="word glow-hover">New</span>
          <span className="word glow-hover">Year</span>
        </h1>
        {scene >= 4 && (
          <div className="handwritten-subtitle">
            Keep clicking... there's more 💫
          </div>
        )}
      </div>

      {/* Scene 5: First Message */}
      <div className={`message-scene scene-1 ${scene >= 5 && scene < 6 ? 'active' : ''} ${scene >= 6 ? 'fade-out' : ''}`}>
        <div className="message-content">
          <p className="elegant-line interactive-line">As the stars align for a new year,</p>
          <p className="elegant-line interactive-line">I find myself hoping</p>
          <p className="elegant-line interactive-line">that our story is just beginning...</p>
          <div className="doodle">✨ ~ ✨</div>
        </div>
      </div>

      {/* Scene 6: Second Message */}
      <div className={`message-scene scene-2 ${scene >= 6 && scene < 7 ? 'active' : ''} ${scene >= 7 ? 'fade-out' : ''}`}>
        <div className="message-content">
          <p className="elegant-line interactive-line">Every moment we've shared</p>
          <p className="elegant-line interactive-line">has been a glimpse</p>
          <p className="elegant-line interactive-line">of something extraordinary.</p>
          <div className="personal-note">
            <div className="handwritten-note small">
              (I mean it... every single moment)
            </div>
          </div>
        </div>
      </div>

      {/* Scene 7: Final Romantic Scene */}
      <div className={`message-scene scene-final ${scene >= 7 ? 'active' : ''}`}>
        <div className="final-content">
          <div className="ornament top sparkle">✦</div>
          <p className="romantic-line interactive-line">Perhaps this year,</p>
          <p className="romantic-line highlight interactive-line">friendship blossoms</p>
          <p className="romantic-line highlight interactive-line">into something more...</p>
          <p className="romantic-line interactive-line">something beautiful,</p>
          <p className="romantic-line final-wish interactive-line">something us.</p>
          <div className="ornament bottom sparkle">✦</div>
          
          <div className="handwritten-signature">
            Here's to 2026, and to us ✨
            <div className="heart-doodle">♡</div>
          </div>
          
          {clickCount > 15 && (
            <div className="secret-message">
              <div className="handwritten-note tiny">
                P.S. - Thanks for clicking through all of this. 
                It means you care. That means everything to me. 💕
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewYearMessage