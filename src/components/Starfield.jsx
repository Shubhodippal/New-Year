import { useEffect, useState } from 'react'
import './Starfield.css'

const Starfield = ({ interactive }) => {
  const [stars] = useState(() => {
    const newStars = []
    for (let i = 0; i < 200; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
        glowIntensity: Math.random()
      })
    }
    return newStars
  })
  const [hoverPos, setHoverPos] = useState(null)

  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e) => {
      setHoverPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  const getStarStyle = (star) => {
    if (!interactive || !hoverPos) return {}

    const starX = (star.left / 100) * window.innerWidth
    const starY = (star.top / 100) * window.innerHeight
    const distance = Math.sqrt(
      Math.pow(hoverPos.x - starX, 2) + Math.pow(hoverPos.y - starY, 2)
    )

    if (distance < 150) {
      const intensity = 1 - distance / 150
      return {
        transform: `scale(${1 + intensity * 2})`,
        opacity: 0.3 + intensity * 0.7
      }
    }
    return {}
  }

  return (
    <div className="starfield">
      {stars.map(star => (
        <div
          key={star.id}
          className={`star ${star.glowIntensity > 0.7 ? 'bright' : ''}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            ...getStarStyle(star)
          }}
        />
      ))}
      
      {/* Shooting Stars */}
      <div className="shooting-star" style={{ animationDelay: '2s' }} />
      <div className="shooting-star" style={{ animationDelay: '5s' }} />
      <div className="shooting-star" style={{ animationDelay: '8s' }} />
      <div className="shooting-star" style={{ animationDelay: '12s' }} />
    </div>
  )
}

export default Starfield