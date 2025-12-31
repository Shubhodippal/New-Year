import { useEffect, useState } from 'react'
import './Fireworks.css'

const Fireworks = ({ active, intensity = 'normal' }) => {
  const [fireworks, setFireworks] = useState([])

  useEffect(() => {
    if (!active) return

    const createFirework = () => {
      const colors = [
        ['#ff0080', '#ff8c00', '#ffd700'],
        ['#00ffff', '#0080ff', '#8000ff'],
        ['#ff1744', '#f50057', '#ff4081'],
        ['#00e676', '#00c853', '#64ffda'],
        ['#ffea00', '#ffd600', '#ff6f00']
      ]
      
      const colorSet = colors[Math.floor(Math.random() * colors.length)]
      const particleCount = intensity === 'high' ? 50 : 40
      const newFirework = {
        id: Date.now() + Math.random(),
        left: 20 + Math.random() * 60,
        top: 15 + Math.random() * 30,
        colors: colorSet,
        particles: particleCount + Math.floor(Math.random() * 30),
        size: 200 + Math.random() * 150,
        delay: Math.random() * 0.3
      }
      
      setFireworks(prev => [...prev, newFirework])
      
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id))
      }, 3000)
    }

    const interval = intensity === 'high' ? 400 : 600
    createFirework()
    const intervalId = setInterval(createFirework, interval)
    return () => clearInterval(intervalId)
  }, [active, intensity])

  if (!active) return null

  return (
    <div className="fireworks-container">
      {fireworks.map(fw => (
        <div
          key={fw.id}
          className="firework"
          style={{
            left: `${fw.left}%`,
            top: `${fw.top}%`,
            '--firework-size': `${fw.size}px`,
            '--delay': `${fw.delay}s`
          }}
        >
          {[...Array(fw.particles)].map((_, i) => {
            const angle = (360 / fw.particles) * i
            const colorIndex = Math.floor((i / fw.particles) * fw.colors.length)
            return (
              <div
                key={i}
                className="particle"
                style={{
                  '--angle': `${angle}deg`,
                  '--color': fw.colors[colorIndex],
                  '--delay': `${fw.delay}s`
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Fireworks