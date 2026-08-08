import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      const target = e.target as HTMLElement
      setIsPointer(
        !!target.closest('a, button, [role="button"]')
      )
    }
    
    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <div 
      className={cn(
        "fixed pointer-events-none z-[9999] rounded-full bg-foreground transition-transform duration-100 ease-out",
        isPointer ? "w-8 h-8 opacity-20 mix-blend-difference" : "w-4 h-4 opacity-70"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
