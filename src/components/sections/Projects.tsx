import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack'

export const PROJECTS = [
  {
    id: '01',
    title: "KUSKAS",
    category: "Web & Mobile Ecosystem",
    tech: "Flutter • Laravel • React • Supabase • Gemini AI",
    image: "/src/assets/KUSKAS/cover.png",
    github: "https://github.com/boyharendy/Projek_Kuskas_App_Web",
    gallery: [
      { url: "/src/assets/KUSKAS/web.jpeg", desc: "Tampilan Dashboard Utama Web" },
      { url: "/src/assets/KUSKAS/web1.jpeg", desc: "Halaman Manajemen Data Web" },
      { url: "/src/assets/KUSKAS/Web2.jpeg", desc: "Fitur Laporan Web" },
      { url: "/src/assets/KUSKAS/mob1.jpeg", desc: "Tampilan Beranda Mobile" },
      { url: "/src/assets/KUSKAS/mob2.jpeg", desc: "Navigasi Aplikasi Mobile" },
      { url: "/src/assets/KUSKAS/mob3.jpeg", desc: "Detail Keuangan Mobile" },
      { url: "/src/assets/KUSKAS/mob4.jpeg", desc: "Statistik Pengeluaran" },
      { url: "/src/assets/KUSKAS/mob5.jpeg", desc: "Menu Pengaturan Akun" },
      { url: "/src/assets/KUSKAS/mob6.jpeg", desc: "Pemasukan Bulanan" },
      { url: "/src/assets/KUSKAS/mob7.jpeg", desc: "Fitur Transfer Cepat" },
      { url: "/src/assets/KUSKAS/mob8.jpeg", desc: "Notifikasi Sistem" },
      { url: "/src/assets/KUSKAS/mob9.jpeg", desc: "Ringkasan Saldo Akhir" }
    ],
    description: "KUSKAS (Keuangan Sakti Kas) adalah ekosistem aplikasi keuangan pribadi yang terdiri dari aplikasi mobile Android (Flutter) dan web admin panel (Laravel + React). Proyek ini memecahkan masalah pencatatan keuangan manual dengan pendekatan modern: cukup rekam suara, maka AI akan otomatis mengkategorikan transaksi. Dilengkapi fitur QR Code Login untuk web admin dan sinkronisasi real-time via Supabase."
  },
  {
    id: '02',
    title: "KOCARI",
    category: "E-Commerce Trust Aggregator",
    tech: "Web Scraping Architecture",
    image: "/src/assets/KOCARI/cover.png",
    github: "https://github.com/boyharendy/KOCARI--Website-scraping.git",
    gallery: [
      { url: "/src/assets/KOCARI/Beranda.png", desc: "Tampilan Beranda Utama" },
      { url: "/src/assets/KOCARI/Login.png", desc: "Halaman Autentikasi" },
      { url: "/src/assets/KOCARI/dashboard admin.png", desc: "Dashboard Panel Admin" }
    ],
    description: "KOCARI adalah platform E-Commerce Trust Aggregator yang dirancang untuk mengumpulkan, menganalisis, dan menyajikan tingkat kepercayaan toko online. Proyek ini mendemonstrasikan perancangan arsitektur sistem scraping modern dengan antarmuka pengguna yang intuitif."
  },
  {
    id: '03',
    title: "TOOLSKU",
    category: "AI Content Creation Suite",
    tech: "React • Python • AI Models • Video Processing",
    image: "/src/assets/TOOLSKU/Cover.png",
    github: "https://github.com/boyharendy/Toolsku",
    gallery: [
      { url: "/src/assets/TOOLSKU/screenshot_home.png", desc: "Tampilan Beranda Utama Toolsku" },
      { url: "/src/assets/TOOLSKU/screenshot_auto-shorts.png", desc: "Fitur Auto Shorts Generator" },
      { url: "/src/assets/TOOLSKU/screenshot_auto-subtitle.png", desc: "Pembuatan Subtitle Otomatis" },
      { url: "/src/assets/TOOLSKU/screenshot_video-clipper.png", desc: "Pemotong Video Otomatis (Video Clipper)" },
      { url: "/src/assets/TOOLSKU/screenshot_voice-enhancer.png", desc: "Peningkatan Kualitas Suara (Voice Enhancer)" },
      { url: "/src/assets/TOOLSKU/screenshot_bg-remover.png", desc: "Penghapus Latar Belakang" },
      { url: "/src/assets/TOOLSKU/screenshot_color-grading.png", desc: "Color Grading Otomatis" }
    ],
    description: "TOOLSKU adalah platform AI generatif all-in-one yang dirancang untuk mempermudah kreator konten dalam mengedit dan memproduksi video. Mulai dari pembuatan Auto Shorts, Auto Subtitle, Video Clipper, hingga Voice Enhancer, semuanya diproses menggunakan kecerdasan buatan untuk alur kerja yang jauh lebih cepat."
  }
]

export const Projects = () => {
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

    const revealElements = document.querySelectorAll('.reveal-project')
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen bg-background flex flex-col pt-32 pb-24 border-t border-border">

      {/* Massive Heading */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 mb-16">
        <h2 className="text-[15vw] sm:text-[12vw] lg:text-[10vw] leading-[0.8] font-black tracking-tighter lowercase text-foreground m-0 p-0 reveal-project" style={{ transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          selected
        </h2>
        <h2 className="text-[15vw] sm:text-[12vw] lg:text-[10vw] leading-[0.8] font-black tracking-tighter lowercase text-muted-foreground m-0 p-0 reveal-project delay-100" style={{ transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          works.
        </h2>
      </div>

      {/* Projects List with ScrollStack */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <ScrollStack>
          {PROJECTS.map((p) => (
            <ScrollStackItem key={p.id}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-foreground/30"></span>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">
                      {p.category}
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                    {p.title}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {p.tech.split(' • ').map((t, i) => (
                      <span key={i} className="text-sm font-medium text-foreground/50 border border-foreground/10 px-3 py-1.5 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>

                  {p.description && (
                    <p className="text-foreground/70 leading-relaxed max-w-xl text-base sm:text-lg line-clamp-3">
                      {p.description}
                    </p>
                  )}

                  <div className="pt-6 flex flex-wrap gap-4">
                    <Link to={`/project/${p.id}`} className="group flex h-12 items-center justify-center rounded-xl bg-foreground px-8 font-medium text-background transition-colors hover:bg-foreground/90">
                      <span className="mr-3">View Case Study</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Link>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center rounded-xl border border-border bg-transparent px-8 font-medium text-foreground transition-colors hover:bg-muted">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex-1 w-full lg:w-auto rounded-3xl overflow-hidden border border-border group relative bg-muted/30 flex items-center justify-center p-4 sm:p-8">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-auto max-h-[400px] object-contain rounded-xl shadow-lg transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </ScrollStackItem>
          ))}
          <ScrollStackItem index={PROJECTS.length}>
            <div className="flex flex-col items-center justify-center text-center py-24 sm:py-32 h-[300px] sm:h-[450px]">
              <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-foreground mb-8">
                Want to see more?
              </h3>
              <a
                href="https://github.com/boyharendy?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 items-center justify-center rounded-xl bg-foreground px-10 font-medium text-background transition-colors hover:bg-foreground/90"
              >
                <span className="mr-3 text-lg">See All My Portofolio on GitHub</span>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>

      <style>{`
        .reveal-project {
          opacity: 0;
          transform: translateY(30px);
          will-change: opacity, transform;
        }
        .reveal-project.origin-bottom {
          transform: scaleY(0);
          opacity: 1;
        }
        .reveal-project.active {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-project.origin-bottom.active {
          transform: scaleY(1);
        }
      `}</style>

    </section>
  )
}
