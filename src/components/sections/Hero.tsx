import RainingLetters from '../ui/modern-animated-hero-section'
import { useEffect, useState } from 'react'

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      id="home" 
      className="relative w-full h-screen bg-background overflow-hidden"
    >
      <div 
        className="w-full h-full ease-out"
        style={{ 
          transform: `translateY(${scrollY * 0.4}px)`, 
          opacity: 1 - scrollY / 700,
          willChange: 'transform, opacity'
        }}
      >
        <RainingLetters />
      </div>
    </section>
  )
}
