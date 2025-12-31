import './Cat3D.css'

function Cat3D({ scene }) {
  const isVisible = scene >= 10

  return (
    <div className={`cat3d-container ${isVisible ? 'visible' : 'hidden'}`}>
      {/* Left scroll zone - allows scroll to pass through */}
      <div className="scroll-zone scroll-zone-left"></div>
      
      {/* Right scroll zone - allows scroll to pass through */}
      <div className="scroll-zone scroll-zone-right"></div>
      
      {/* Sketchfab Embed */}
      <div className="sketchfab-embed-wrapper">
        <iframe 
          title="Maya - the Birman Cat" 
          frameBorder="0" 
          allowFullScreen 
          mozallowfullscreen="true" 
          webkitallowfullscreen="true" 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          src="https://sketchfab.com/models/4a2b588be9dd43d2acdffdb981b4cb79/embed?autostart=1&preload=1&ui_theme=dark&ui_animations=0&ui_annotations=0&ui_ar=0&ui_color=transparent&ui_controls=1&ui_fullscreen=0&ui_general_controls=0&ui_help=0&ui_hint=0&ui_infos=0&ui_inspector=0&ui_settings=0&ui_stop=0&ui_vr=0&ui_watermark=0&ui_watermark_link=0"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      </div>
      
      {isVisible && (
        <div className="cat-message">
          <h2 className="cat-text">You're Amazing! 💕</h2>
          <p className="cat-subtext">👋 Meow~ Wishing you endless joy in 2026! 🐾</p>
          <p className="cat-hint">✨ Drag center to rotate • Swipe edges to scroll ✨</p>
        </div>
      )}
    </div>
  )
}

export default Cat3D
