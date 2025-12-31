import { useState, useEffect } from 'react'
import './SoundController.css'

const SoundController = ({ enabled, onToggle }) => {
  const [showTooltip, setShowTooltip] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="sound-controller">
      <button 
        className={`sound-button ${enabled ? 'enabled' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
          setShowTooltip(false)
        }}
        aria-label="Toggle sound"
      >
        {enabled ? '🔊' : '🔇'}
      </button>
      {showTooltip && !enabled && (
        <div className="sound-tooltip">
          Click for sound effects
        </div>
      )}
    </div>
  )
}

export default SoundController