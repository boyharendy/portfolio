import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiVuedotjs, 
  SiFlutter, 
  SiLaravel, 
  SiAnthropic 
} from 'react-icons/si'
import { GiRocketFlight } from 'react-icons/gi'

const SKILLS_LIST = [
  { name: "React", Icon: SiReact, color: "group-hover:text-[#61DAFB]" },
  { name: "Next.js", Icon: SiNextdotjs, color: "group-hover:text-foreground" },
  { name: "TypeScript", Icon: SiTypescript, color: "group-hover:text-[#3178C6]" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "group-hover:text-[#06B6D4]" },
  { name: "Framer Motion", Icon: SiFramer, color: "group-hover:text-[#0055FF]" },
  { name: "Vue.js", Icon: SiVuedotjs, color: "group-hover:text-[#4FC08D]" },
  { name: "Flutter", Icon: SiFlutter, color: "group-hover:text-[#02569B]" },
  { name: "Laravel", Icon: SiLaravel, color: "group-hover:text-[#FF2D20]" },
  { name: "Antigravity", Icon: GiRocketFlight, color: "group-hover:text-[#9333EA]" },
  { name: "Claude", Icon: SiAnthropic, color: "group-hover:text-[#D97757]" }
]

const MARQUEE_TEXT = "REACT • TYPESCRIPT • NEXT.JS • TAILWIND • NODE.JS • FIGMA • "

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true
          
          // GSAP Animation fixed for React Strict Mode
          gsap.fromTo(".skill-badge", 
            {
              opacity: 0, 
              y: 60, 
              scale: 0.8,
              rotation: () => gsap.utils.random(-10, 10),
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1,
              stagger: { amount: 0.8, from: "random" },
              ease: "back.out(1.4)",
              overwrite: "auto"
            }
          )
        }
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen bg-background flex flex-col py-32 overflow-hidden border-t border-border">
      
      {/* Background Marquee */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden opacity-5 pointer-events-none select-none z-0 mix-blend-overlay">
        <div className="flex whitespace-nowrap animate-marquee w-[200%]">
          <h2 className="text-[20vw] font-black tracking-tighter uppercase text-foreground m-0 p-0 leading-none">
            {MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}
          </h2>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col h-full justify-center items-center">
        
        {/* Section Heading */}
        <div className="mb-24 text-center">
          <h2 className="text-[12vw] sm:text-[10vw] lg:text-[8vw] leading-[0.8] font-black tracking-tighter lowercase text-foreground m-0 p-0">
            toolkit.
          </h2>
          <p className="text-muted-foreground font-medium tracking-widest uppercase mt-6 text-sm sm:text-base">
            03 / Core Competencies
          </p>
        </div>

        {/* Scattered GSAP Badges with Icons */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-5xl mx-auto">
          {SKILLS_LIST.map(({ name, Icon, color }) => (
            <div 
              key={name} 
              className="group skill-badge flex items-center gap-2 md:gap-3 px-5 py-2 md:px-8 md:py-4 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md cursor-crosshair hover:bg-foreground/10 hover:border-foreground/30 transition-all duration-300 shadow-2xl"
            >
              <Icon className={`w-6 h-6 md:w-10 md:h-10 text-foreground transition-colors duration-300 ${color}`} />
              <span className="text-foreground font-bold tracking-wide text-lg md:text-2xl transition-colors duration-300">
                {name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
