import { useEffect, useState } from 'react'
import './ParticleSystem.css'

const ParticleSystem = ({ active }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return

    const createParticle = () => {
      const newParticle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        type: Math.random() > 0.7 ? 'sparkle' : 'dot',
        size: Math.random() * 4 + 2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2
      }
      
      setParticles(prev => [...prev.slice(-50), newParticle])
    }

    const interval = setInterval(createParticle, 200)
    return () => clearInterval(interval)
  }, [active])

  if (!active) return null

  return (
    <div className="particle-system">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`particle ${particle.type}`}
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

export default ParticleSystem