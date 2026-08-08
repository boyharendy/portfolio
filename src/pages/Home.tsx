import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'
import { Contact } from '../components/sections/Contact'

export const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Slight delay to ensure layout is ready
      }
    }
  }, [hash]);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
