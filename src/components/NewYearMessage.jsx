import './NewYearMessage.css'

const NewYearMessage = ({ scene, clickCount }) => {
  return (
    <div className="message-container">
      {/* Scene 1: Countdown */}
      <div className={`countdown ${scene >= 1 && scene < 2 ? 'active' : ''} ${scene >= 2 ? 'exit' : ''}`}>
        <div className="countdown-text">For someone who makes every moment brighter, one who lights up my world, one in whose depth of eyes I forgot all my pain...</div>
        <div className="floating-sparkles">
          <span className="sparkle">✦</span>
          <span className="sparkle">✧</span>
          <span className="sparkle">✦</span>
        </div>
      </div>

      {/* Scene 2: Year Reveal */}
      <div className={`year-reveal ${scene >= 2 && scene < 4 ? 'active' : ''} ${scene >= 4 ? 'fade-up' : ''}`}>
        <div className="year-container">
          <span className="digit interactive">2</span>
          <span className="digit interactive">0</span>
          <span className="digit interactive">2</span>
          <span className="digit interactive">6</span>
        </div>
        <div className="subtitle handwritten">Your Year to Shine</div>
        <div className="decorative-line">
          <span>✦</span>
          <span className="line-segment"></span>
          <span>✦</span>
        </div>
      </div>

      {/* Scene 5: First Message */}
      <div className={`message-scene scene-1 ${scene >= 5 && scene < 6 ? 'active' : ''} ${scene >= 6 ? 'fade-out' : ''}`}>
        <div className="message-content">
          <p className="elegant-line interactive-line">Another year, another chapter,</p>
          <p className="elegant-line interactive-line">and I'm grateful to be</p>
          <p className="elegant-line interactive-line">by your side through it all.</p>
        </div>
      </div>

      {/* Scene 6: Second Message */}
      <div className={`message-scene scene-2 ${scene >= 6 && scene < 7 ? 'active' : ''} ${scene >= 7 ? 'fade-out' : ''}`}>
        <div className="message-content">
          <p className="elegant-line interactive-line">You've got dreams to chase,</p>
          <p className="elegant-line interactive-line">goals to crush,</p>
          <p className="elegant-line interactive-line">and I'll be cheering you on</p>
          <p className="elegant-line highlight interactive-line">every step of the way.</p>
          <div className="personal-note">
            <div className="handwritten-note small">
              (Your success is my happiness)
            </div>
          </div>
        </div>
      </div>

      {/* Scene 7: Final Scene */}
      <div className={`message-scene scene-final ${scene >= 7 && scene < 8 ? 'active' : ''} ${scene >= 8 ? 'fade-out' : ''}`}>
        <div className="final-content">
          <div className="ornament top sparkle">✦</div>
          <p className="romantic-line interactive-line">Here's to your growth,</p>
          <p className="romantic-line highlight interactive-line">your happiness,</p>
          <p className="romantic-line interactive-line">your achievements,</p>
          <p className="romantic-line final-wish interactive-line">and to always being there for you.</p>
          <div className="ornament bottom sparkle">✦</div>
        </div>
      </div>

      {/* Scene 8: Signature and Subtle Notes */}
      <div className={`message-scene scene-subtle ${scene >= 8 ? 'active' : ''}`}>
        <div className="handwritten-signature">
          Cheers to 2026! Let's make it amazing! 🎆
          <div className="heart-doodle">✨</div>
        </div>
        
        {clickCount > 15 && (
          <div className="secret-message">
            <div className="handwritten-note tiny">
              This is just the beginning... destiny is waiting for us. 💫
            </div>
          </div>
        )}
        
        <div className="subtle-notes">
          <p className="subtle-line">Always rooting for you</p>
          <p className="subtle-line">Here whenever you need</p>
          <p className="subtle-line">Wishing you endless happiness</p>
        </div>
      </div>
    </div>
  )
}

export default NewYearMessage