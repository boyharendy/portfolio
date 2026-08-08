import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../theme-provider'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          scrolled ? 'bg-background/50 backdrop-blur-md border-border py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-between">
          
          {/* Logo on the left */}
          <div className="flex-1">
            <a href="#" className="text-2xl font-black tracking-tighter text-foreground uppercase flex items-center gap-2">
              Portfolio<span className="text-green-500 text-3xl leading-none">.</span>
            </a>
          </div>

          {/* Navigation on the right (Desktop) */}
          <div className="hidden md:flex items-center justify-end pr-4 sm:pr-8">
            <nav className="flex items-center gap-8 text-base font-semibold font-heading tracking-wide text-foreground/90">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <a 
                  key={item}
                  className="transition-colors hover:text-green-500 capitalize cursor-pointer" 
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item);
                    if (el) {
                      window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                    }
                  }}
                >
                  {item === 'contact' ? "Let's Talk" : item}
                </a>
              ))}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="ml-4 p-2 rounded-full hover:bg-foreground/10 transition-colors text-foreground"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </nav>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-foreground p-2 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-3xl font-black tracking-tighter uppercase text-foreground">
          {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
            <a 
              key={item}
              className="transition-colors hover:text-green-500 cursor-pointer" 
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                const el = document.getElementById(item);
                if (el) {
                  window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                }
              }}
            >
              {item === 'contact' ? "Let's Talk" : item}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
