import { useEffect, useState } from 'react'
import './CursorTrail.css'

const CursorTrail = () => {
  const [trails, setTrails] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let frameCount = 0
    
    const createTrail = (x, y) => {
      setMousePos({ x, y })
      
      // Only create particles every 2-3 frames for smoother effect
      frameCount++
      if (frameCount % 2 !== 0) return
      
      const newTrail = {
        id: `${Date.now()}-${Math.random()}`,
        x,
        y,
        size: 12 + Math.random() * 8
      }
      
      setTrails(prev => [...prev.slice(-15), newTrail])
      
      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== newTrail.id))
      }, 800)
    }

    const createBurst = (x, y) => {
      // Create elegant burst effect
      const burstCount = 8
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount
        const distance = 40 + Math.random() * 20
        
        const newParticle = {
          id: `burst-${Date.now()}-${i}`,
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          size: 10 + Math.random() * 8,
          isBurst: true
        }
        
        setTrails(prev => [...prev, newParticle])
        
        setTimeout(() => {
          setTrails(prev => prev.filter(t => t.id !== newParticle.id))
        }, 600)
      }
    }
    
    const handleMouseMove = (e) => {
      createTrail(e.clientX, e.clientY)
    }

    const handleClick = (e) => {
      createBurst(e.clientX, e.clientY)
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        createTrail(touch.clientX, touch.clientY)
      }
    }

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        createBurst(touch.clientX, touch.clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return (
    <>
      <div 
        className="cursor-glow" 
        style={{ left: mousePos.x, top: mousePos.y }} 
      />
      <div className="cursor-trail-container">
        {trails.map(trail => (
          <div
            key={trail.id}
            className={`trail-particle ${trail.isBurst ? 'burst' : ''}`}
            style={{
              left: trail.x,
              top: trail.y,
              width: trail.size,
              height: trail.size
            }}
          />
        ))}
      </div>
    </>
  )
}

export default CursorTrail