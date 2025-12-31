import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'
import Starfield from './components/Starfield'
import Fireworks from './components/Fireworks'
import NewYearMessage from './components/NewYearMessage'
import ParticleSystem from './components/ParticleSystem'
import CursorTrail from './components/CursorTrail'
import InteractiveHearts from './components/InteractiveHearts'

function App() {
  const [scene, setScene] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(null)
  const [timeSetAt, setTimeSetAt] = useState(null)
  const [timeUntilMidnight, setTimeUntilMidnight] = useState(null)
  const [isNewYear, setIsNewYear] = useState(false)
  const countdownInterval = useRef(null)
  const hasReachedMidnight = useRef(false)

  const handleTestCountdown = () => {
    // Reset and set countdown to 10 seconds for testing
    setIsNewYear(false)
    setTimeUntilMidnight(null)
    hasReachedMidnight.current = false
    
    const now = Date.now()
    const targetTime = new Date(now + 10000) // 10 seconds from now
    setCurrentTime(targetTime)
    setTimeSetAt(now)
  }

  useEffect(() => {
    // Fetch current time from internet and calculate midnight
    const fetchTime = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
        const data = await response.json()
        const serverTime = new Date(data.datetime)
        
        // Check if the year is 2026 or later
        if (serverTime.getFullYear() >= 2026) {
          // Skip countdown and go directly to main page
          setCurrentTime(serverTime)
          setTimeSetAt(Date.now())
          setIsNewYear(true)
          return
        }
        
        // Calculate next midnight from server time
        const midnight = new Date(serverTime)
        midnight.setHours(24, 0, 0, 0)
        
        setCurrentTime(midnight)
        setTimeSetAt(Date.now())
      } catch (error) {
        // Fallback to local time if API fails
        const localTime = new Date()
        
        // Check if the year is 2026 or later
        if (localTime.getFullYear() >= 2026) {
          setCurrentTime(localTime)
          setTimeSetAt(Date.now())
          setIsNewYear(true)
          return
        }
        
        const midnight = new Date(localTime)
        midnight.setHours(24, 0, 0, 0)
        
        setCurrentTime(midnight)
        setTimeSetAt(Date.now())
      }
    }
    
    fetchTime()
  }, [])

  useEffect(() => {
    // Clear any existing interval
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current)
      countdownInterval.current = null
    }

    if (!currentTime || !timeSetAt || isNewYear) return

    const updateCountdown = () => {
      // Prevent any updates after reaching zero
      if (hasReachedMidnight.current) return
      
      // Calculate elapsed time since the timer was set
      const elapsed = Date.now() - timeSetAt
      // Calculate remaining time from the initial currentTime
      const targetTime = currentTime.getTime()
      const currentActualTime = timeSetAt + elapsed
      const diff = targetTime - currentActualTime

      if (diff <= 0) {
        hasReachedMidnight.current = true
        setIsNewYear(true)
        setTimeUntilMidnight({ hours: 0, minutes: 0, seconds: 0 })
        if (countdownInterval.current) {
          clearInterval(countdownInterval.current)
          countdownInterval.current = null
        }
        // Transition after showing 00:00:00
        setTimeout(() => setTimeUntilMidnight(null), 100)
        return
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTimeUntilMidnight({ hours, minutes, seconds })
    }

    updateCountdown()
    countdownInterval.current = setInterval(updateCountdown, 1000)
    
    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current)
        countdownInterval.current = null
      }
    }
  }, [currentTime, timeSetAt, isNewYear])

  useEffect(() => {
    // Auto-start after brief moment (only when it's New Year)
    if (!isNewYear) return
    const timer = setTimeout(() => setScene(1), 100)
    return () => clearTimeout(timer)
  }, [isNewYear])

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault()
      
      // Calculate scroll progress (0 to 1)
      const delta = e.deltaY
      
      setScrollProgress(prev => {
        const newProgress = Math.max(0, Math.min(1, prev + delta * 0.0003))
        
        // Map progress to scenes (0-8)
        const newScene = Math.floor(newProgress * 9)
        setScene(Math.min(newScene, 8))
        
        // Increment click count for secret messages
        if (Math.floor(newProgress * 100) % 5 === 0) {
          setClickCount(c => c + 1)
        }
        
        return newProgress
      })
    }

    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      window.touchStartY = touch.clientY
    }

    const handleTouchMove = (e) => {
      if (!window.touchStartY) return
      
      const touch = e.touches[0]
      const delta = window.touchStartY - touch.clientY
      window.touchStartY = touch.clientY
      
      setScrollProgress(prev => {
        const newProgress = Math.max(0, Math.min(1, prev + delta * 0.0005))
        
        const newScene = Math.floor(newProgress * 9)
        setScene(Math.min(newScene, 8))
        
        if (Math.floor(newProgress * 100) % 5 === 0) {
          setClickCount(c => c + 1)
        }
        
        return newProgress
      })
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isNewYear])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setScrollProgress(prev => {
          const newProgress = Math.min(1, prev + 0.04)
          const newScene = Math.floor(newProgress * 9)
          setScene(Math.min(newScene, 8))
          setClickCount(c => c + 1)
          return newProgress
        })
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setScrollProgress(prev => {
          const newProgress = Math.max(0, prev - 0.04)
          const newScene = Math.floor(newProgress * 9)
          setScene(Math.min(newScene, 8))
          return newProgress
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (!currentTime) {
    return (
      <div className="app">
        <div className="countdown-container">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    )
  }

  if (!isNewYear) {
    return (
      <div className="app">
        <Starfield interactive={false} />
        <CursorTrail />
        <div className="countdown-container">
          {timeUntilMidnight ? (
            <>
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
              <button className="test-button" onClick={handleTestCountdown}>Test (10s countdown)</button>
            </>
          ) : (
            <div className="loading-text">Loading...</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Starfield interactive={scene >= 2} />
      <CursorTrail />
      <InteractiveHearts scene={scene} />
      <ParticleSystem active={scene >= 3} />
      <Fireworks active={scene >= 3 && scene <= 5} intensity={scene === 4 ? 'high' : 'normal'} />
      <NewYearMessage scene={scene} clickCount={clickCount} />
      
      {scene >= 1 && scene < 7 && (
        <div className="scroll-hint">
          <span className="hint-text">Scroll to continue</span>
          <span className="hint-icon">↓</span>
        </div>
      )}
      
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill" 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      <div className={`overlay ${scene >= 7 ? 'fade-out' : ''}`}></div>
    </div>
  )
}

export default App
