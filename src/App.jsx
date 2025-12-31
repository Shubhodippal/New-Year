import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Starfield from './components/Starfield'
import Fireworks from './components/Fireworks'
import NewYearMessage from './components/NewYearMessage'
import ParticleSystem from './components/ParticleSystem'
import CursorTrail from './components/CursorTrail'
import InteractiveHearts from './components/InteractiveHearts'

function App() {
  const [scene, setScene] = useState(0)
  const [canProgress, setCanProgress] = useState(true)
  const [clickCount, setClickCount] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const [currentTime, setCurrentTime] = useState(null)
  const [timeUntilMidnight, setTimeUntilMidnight] = useState(null)
  const [isNewYear, setIsNewYear] = useState(false)

  useEffect(() => {
    // Fetch current time from internet
    const fetchTime = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
        const data = await response.json()
        const serverTime = new Date(data.datetime)
        setCurrentTime(serverTime)
      } catch (error) {
        // Fallback to local time if API fails
        setCurrentTime(new Date())
      }
    }
    
    fetchTime()
  }, [])

  useEffect(() => {
    if (!currentTime) return

    const updateCountdown = () => {
      const now = new Date(currentTime.getTime() + (Date.now() - currentTime.getTime()))
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)

      const diff = midnight - now

      if (diff <= 0) {
        setIsNewYear(true)
        setTimeUntilMidnight(null)
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeUntilMidnight({ hours, minutes, seconds })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [currentTime])

  useEffect(() => {
    // Auto-start after brief moment (only when it's New Year)
    if (!isNewYear) return
    const timer = setTimeout(() => setScene(1), 800)
    return () => clearTimeout(timer)
  }, [isNewYear])

  const handleClick = useCallback(() => {
    if (!canProgress) return
    
    setClickCount(prev => prev + 1)
    setShowHint(false)
    setCanProgress(false)

    // Progress to next scene
    setTimeout(() => {
      setScene(prev => Math.min(prev + 1, 7))
      setTimeout(() => setCanProgress(true), 500)
    }, 300)
  }, [canProgress])

  if (!currentTime) {
    return (
      <div className="app">
        <div className="countdown-container">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    )
  }

  if (!isNewYear && timeUntilMidnight) {
    return (
      <div className="app">
        <Starfield interactive={false} />
        <CursorTrail />
        <div className="countdown-container">
          <div className="countdown-timer">
            <div className="time-unit">
              <span className="time-value">{String(timeUntilMidnight.hours).padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <span className="time-value">{String(timeUntilMidnight.minutes).padStart(2, '0')}</span>
              <span className="time-label">Minutes</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <span className="time-value">{String(timeUntilMidnight.seconds).padStart(2, '0')}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
          <p className="countdown-message">Until the magic begins...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app" onClick={handleClick}>
      <Starfield interactive={scene >= 2} />
      <CursorTrail />
      <InteractiveHearts scene={scene} />
      <ParticleSystem active={scene >= 3} />
      <Fireworks active={scene >= 3 && scene <= 5} intensity={scene === 4 ? 'high' : 'normal'} />
      <NewYearMessage scene={scene} clickCount={clickCount} />
      
      {showHint && scene >= 1 && scene < 7 && (
        <div className="click-hint">
          <span className="hint-text">Click anywhere to continue</span>
          <span className="hint-icon">✨</span>
        </div>
      )}
      
      <div className={`overlay ${scene >= 7 ? 'fade-out' : ''}`}></div>
    </div>
  )
}

export default App
