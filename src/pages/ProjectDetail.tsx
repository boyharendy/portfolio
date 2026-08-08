import { useParams, Link } from 'react-router-dom'
import { PROJECTS } from '../components/sections/Projects'
import { useEffect, useState, useRef } from 'react'

export const ProjectDetail = () => {
  const { id } = useParams()
  const project = PROJECTS.find(p => p.id === id)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = window.innerWidth * 0.4;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project?.gallery || !selectedImg) return;
    const currentIndex = project.gallery.findIndex(img => img.url === selectedImg);
    if (currentIndex > 0) {
      setSelectedImg(project.gallery[currentIndex - 1].url);
    } else {
      setSelectedImg(project.gallery[project.gallery.length - 1].url);
    }
  }

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project?.gallery || !selectedImg) return;
    const currentIndex = project.gallery.findIndex(img => img.url === selectedImg);
    if (currentIndex < project.gallery.length - 1) {
      setSelectedImg(project.gallery[currentIndex + 1].url);
    } else {
      setSelectedImg(project.gallery[0].url);
    }
  }

  useEffect(() => {
    // Basic reveal animation setup on mount
    const elements = document.querySelectorAll('.reveal-detail')
    setTimeout(() => {
      elements.forEach(el => el.classList.add('active'))
    }, 10)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="text-green-500 hover:underline">Return to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-green-500 selection:text-background">
      {/* Navbar/Back Button */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 sm:px-12 lg:px-24 bg-background/50 backdrop-blur-md border-b border-border">
        <Link to="/#projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-max group">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-bold tracking-widest uppercase text-sm">Back to Projects</span>
        </Link>
      </nav>

      <main className="pt-32 pb-24">
        {/* Header Section */}
        {/* Header Section (Title Only) */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 mb-12">
          <p className="text-green-500 font-bold tracking-[0.2em] uppercase mb-6 reveal-detail" style={{ transition: 'all 0.4s ease' }}>
            {project.category}
          </p>
          <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-none uppercase reveal-detail delay-100" style={{ transition: 'all 0.4s ease' }}>
            {project.title}
          </h1>
        </div>

        {/* Gallery Carousel Section */}
        {project.gallery ? (
          <div className="w-full mb-16 reveal-detail delay-200 relative group/slider" style={{ transition: 'all 0.5s ease' }}>
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            
            {/* Scroll Buttons */}
            <button 
              onClick={() => scrollGallery('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-foreground/20 flex items-center justify-center text-foreground opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-foreground hover:text-background cursor-pointer hidden md:flex"
            >
              ←
            </button>
            <button 
              onClick={() => scrollGallery('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-foreground/20 flex items-center justify-center text-foreground opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-foreground hover:text-background cursor-pointer hidden md:flex"
            >
              →
            </button>

            <div 
              ref={galleryRef}
              className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 sm:px-12 lg:px-24 pb-8 no-scrollbar cursor-grab active:cursor-grabbing"
            >
              {project.gallery.map((img, idx) => (
                <div 
                  key={idx} 
                  className="flex-none w-[60vw] md:w-[30vw] lg:w-[20vw] snap-center group cursor-pointer"
                  onClick={() => setSelectedImg(img.url)}
                >
                  <div className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-lg">
                    {/* Dark overlay that disappears on hover */}
                    <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors duration-700 z-10" />
                    <img 
                      src={img.url} 
                      alt={img.desc} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-zinc-500 text-xs tracking-[0.3em] uppercase mt-2 opacity-50 md:hidden">
              ← Geser untuk melihat lebih →
            </div>
          </div>
        ) : (
          <div className="w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-24 mb-16 reveal-detail delay-200" style={{ transition: 'all 0.5s ease' }}>
            <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden relative group shadow-2xl mx-auto">
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        )}

        {/* Explanation Section */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-12 reveal-detail delay-300" style={{ transition: 'all 0.5s ease' }}>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-foreground/90">About The Project</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.description || `This is a detailed view for ${project.title}. It serves as a showcase of the skills and technologies used in developing this ${project.category.toLowerCase()}. The focus is on creating a seamless and interactive experience, ensuring that functionality meets aesthetic brilliance.`}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {/* @ts-ignore - 'link' may not exist on all items */}
                {project.link && (
                  <a href={(project as any).link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-foreground text-background text-sm font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-foreground/90 transition-all duration-300">
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-foreground text-sm font-bold tracking-widest uppercase border border-foreground/30 px-6 py-3 rounded-full hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300">
                    View Repository
                  </a>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-foreground/90">Tech Stack</h3>
              <div className="flex flex-col gap-2">
                {project.tech.split('•').map((tech, index) => (
                  <span key={index} className="text-green-500 font-mono text-sm">{tech.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-12 cursor-zoom-out transition-opacity duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-foreground/50 hover:text-foreground transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImg(null);
            }}
          >
            <span className="text-5xl font-light">×</span>
          </button>
          {project?.gallery && (
            <>
              <button 
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors z-20 w-12 h-12 flex items-center justify-center bg-background/20 hover:bg-background/50 rounded-full"
                onClick={handlePrevImg}
              >
                <span className="text-3xl font-light">←</span>
              </button>
              <button 
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors z-20 w-12 h-12 flex items-center justify-center bg-background/20 hover:bg-background/50 rounded-full"
                onClick={handleNextImg}
              >
                <span className="text-3xl font-light">→</span>
              </button>
            </>
          )}

          <img 
            key={selectedImg} // Add key to force re-animation when image changes
            src={selectedImg} 
            alt="Full screen preview" 
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl scale-100 animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing immediately if they click the image itself
          />
        </div>
      )}

      <style>{`
        .reveal-detail {
          opacity: 0;
          transform: translateY(30px);
          will-change: opacity, transform;
        }
        .reveal-detail.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
