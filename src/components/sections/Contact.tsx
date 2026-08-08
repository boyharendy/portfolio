import { useEffect, useRef } from 'react'

const SOCIAL_LINKS = [
  { name: 'Email', url: 'mailto:boyharendy321@gmail.com' },
  { name: 'GitHub', url: 'https://github.com/boyharendy' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Instagram', url: 'https://www.instagram.com/harendy7/' }
]

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.2 }
    )

    const revealElements = document.querySelectorAll('.reveal-contact')
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen bg-background flex flex-col pt-32 pb-8 overflow-hidden border-t border-border">
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex-1 flex flex-col justify-center">
        
        {/* Section Heading */}
        <div className="reveal-contact" style={{ transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <h2 className="text-[12vw] sm:text-[10vw] lg:text-[10vw] leading-[0.8] font-black tracking-tighter lowercase text-foreground m-0 p-0">
            let's talk.
          </h2>
          <p className="text-muted-foreground font-medium tracking-widest uppercase mt-6 text-sm sm:text-base">
            04 / Get In Touch
          </p>
        </div>

        {/* Content Area */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          
          {/* Left: Message & Email */}
          <div className="flex flex-col reveal-contact delay-100" style={{ transition: 'all 1s ease' }}>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-md mb-12">
              Got a project in mind, a question, or just want to say hi? My inbox is always open. Let's build something amazing together.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-col items-start md:items-end justify-start reveal-contact delay-200" style={{ transition: 'all 1s ease' }}>
            <h3 className="text-muted-foreground font-medium tracking-widest uppercase mb-8 text-sm sm:text-base">
              Socials
            </h3>
            <ul className="flex flex-col items-start md:items-end space-y-4">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl md:text-4xl font-bold text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-4 group"
                  >
                    <span className="hidden md:inline-block w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-8"></span>
                    {link.name}
                    <span className="inline-block md:hidden w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-8"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 mt-32 flex flex-col md:flex-row justify-between items-center gap-4 reveal-contact delay-300" style={{ transition: 'all 1s ease' }}>
        <p className="text-muted-foreground text-sm font-medium">
          © {new Date().getFullYear()} Digital Artisan. All rights reserved.
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm font-bold tracking-widest uppercase flex items-center gap-2"
        >
          Back to Top ↑
        </button>
      </div>

      <style>{`
        .reveal-contact {
          opacity: 0;
          transform: translateY(30px);
          will-change: opacity, transform;
        }
        .reveal-contact.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
