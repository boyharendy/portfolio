import { useEffect, useRef } from 'react'

export const About = () => {
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
      { threshold: 0.1 }
    )

    const revealElements = document.querySelectorAll('.reveal-about')
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-background flex flex-col justify-center px-6 py-24 sm:px-12 lg:px-24 overflow-hidden">
      
      {/* Top mini text */}
      <div className="absolute top-10 left-6 sm:left-12 lg:left-24 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-foreground reveal-about" style={{ transition: 'all 1s ease' }}>
        @Harendy7
      </div>
      <div className="absolute top-10 right-6 sm:right-12 lg:right-24 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-foreground reveal-about" style={{ transition: 'all 1s ease', transitionDelay: '100ms' }}>
        Portofolio.com
      </div>

      {/* Main Typography Area */}
      <div className="relative w-full max-w-7xl mx-auto mt-10">
        
        {/* Top Decorative vertical line */}
        <div className="absolute top-[-200px] right-[25%] w-[2px] h-[250px] bg-foreground reveal-about origin-top" style={{ transition: 'transform 1.5s ease', transform: 'scaleY(0)' }} />

        {/* Huge Typography */}
        <div className="flex flex-col relative z-10">
          <h1 className="text-[25vw] sm:text-[20vw] lg:text-[18vw] leading-[0.8] font-black tracking-tighter lowercase text-foreground m-0 p-0 reveal-about" style={{ transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            about
          </h1>
          
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10 mt-2 md:mt-[-2vw]">
            <h1 className="text-[25vw] sm:text-[20vw] lg:text-[18vw] leading-[0.8] font-black tracking-tighter lowercase text-foreground m-0 p-0 reveal-about delay-100" style={{ transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              me.
            </h1>
            
            {/* Image Placeholder inside text flow */}
            <div 
              className="w-full md:w-[350px] lg:w-[450px] h-[200px] md:h-[220px] lg:h-[280px] bg-muted mb-[2vw] relative reveal-about delay-200 group/photo overflow-hidden rounded-3xl shadow-xl" 
              style={{ transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {/* Single Photo with Grayscale to Color Effect */}
              <img 
                src="/Profile.jpg" 
                alt="Boy Harendy Simamora" 
                className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover/photo:grayscale-0 transition-all duration-700 ease-out z-10 pointer-events-none"
              />
            </div>
          </div>
        </div>
        
        {/* Bottom Decorative vertical line */}
        <div className="absolute bottom-[-60px] left-[15%] w-[2px] h-[60px] bg-foreground reveal-about origin-bottom delay-300 hidden md:block" style={{ transition: 'transform 1.5s ease', transform: 'scaleY(0)' }} />
      </div>

      {/* Bottom Info Area */}
      <div className="w-full max-w-7xl mx-auto mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-end">
        
        <div className="lg:col-span-8 reveal-about delay-400" style={{ transition: 'all 1s ease' }}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-foreground">
            nice to meet you!
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-medium text-justify">
            Halo! Saya Boy Harendy Simamora. Saya seorang mahasiswa aktif di Institut Teknologi Del, mengambil jurusan Sistem Informasi. Sebagai seorang Creative Frontend Developer, saya memiliki ketertarikan mendalam dalam menciptakan antarmuka pengguna (UI) yang interaktif, responsif, dan memberikan pengalaman (UX) terbaik. Di bangku kuliah, saya tidak hanya mempelajari teori, tetapi juga aktif bereksperimen mengubah desain statis menjadi aplikasi web yang hidup. Selalu haus akan ilmu baru, sangat jujur, dan siap menghadapi tantangan di era digital yang dinamis. Senang bertemu denganmu terima kasih atas dukungannya!
          </p>
        </div>

        <div className="lg:col-span-4 flex lg:justify-end reveal-about delay-500" style={{ transition: 'all 1s ease' }}>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            ~ Boy
          </p>
        </div>
        
      </div>

      <style>{`
        .reveal-about {
          opacity: 0;
          transform: translateY(30px);
          will-change: opacity, transform;
        }
        .reveal-about.origin-top, .reveal-about.origin-bottom {
          transform: scaleY(0);
          opacity: 1;
        }
        .reveal-about.active {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-about.origin-top.active, .reveal-about.origin-bottom.active {
          transform: scaleY(1);
        }
      `}</style>
    </section>
  )
}
