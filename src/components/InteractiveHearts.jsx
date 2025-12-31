import { useEffect, useState } from 'react'
import './InteractiveHearts.css'

const InteractiveHearts = ({ scene }) => {
  const [hearts, setHearts] = useState([])
  const [clickedHearts, setClickedHearts] = useState(0)
  //const heartIdCounter = useState(0)[0]

  useEffect(() => {
    if (scene < 5) return

    const createHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: 10 + Math.random() * 80,
        size: 30 + Math.random() * 40,
        speed: 4 + Math.random() * 3,
        emoji: ['❤️', '💖', '💕', '💗', '💝'][Math.floor(Math.random() * 5)],
        clickable: true
      }
      
      setHearts(prev => [...prev, newHeart])
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id))
      }, newHeart.speed * 1000)
    }

    const interval = setInterval(createHeart, 800)
    return () => clearInterval(interval)
  }, [scene])

  const handleHeartClick = (e, heartId) => {
    e.stopPropagation()
    setClickedHearts(prev => prev + 1)
    
    // Create explosion effect
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    
    // Remove clicked heart
    setHearts(prev => prev.filter(h => h.id !== heartId))
    
    // Create mini hearts explosion
    const miniHearts = []
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8
      miniHearts.push({
        id: `mini-${heartId}-${i}`,
        left: (x / window.innerWidth) * 100,
        top: (y / window.innerHeight) * 100,
        size: 15,
        angle: angle,
        emoji: '💫',
        clickable: false,
        isMini: true
      })
    }
    
    setHearts(prev => [...prev, ...miniHearts])
    
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !miniHearts.some(m => m.id === h.id)))
    }, 1000)
  }

  if (scene < 5) return null

  return (
    <div className="interactive-hearts-container">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className={`floating-heart ${heart.clickable ? 'clickable' : ''} ${heart.isMini ? 'mini' : ''}`}
          style={{
            left: `${heart.left}%`,
            top: heart.top ? `${heart.top}%` : 'auto',
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.speed}s`,
            '--angle': heart.angle ? `${heart.angle}rad` : '0'
          }}
          onClick={heart.clickable ? (e) => handleHeartClick(e, heart.id) : undefined}
        >
          {heart.emoji}
        </div>
      ))}
      
      {clickedHearts > 5 && scene >= 6 && (
        <div className="heart-counter">
          <span className="counter-text">You've caught {clickedHearts} hearts! 💕</span>
        </div>
      )}
    </div>
  )
}

export default InteractiveHearts