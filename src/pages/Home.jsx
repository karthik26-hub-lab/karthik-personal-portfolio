import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import '../App.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '../components/Preloader';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [appLoaded, setAppLoaded] = React.useState(() => {
    return sessionStorage.getItem('preloaderDone') === 'true';
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloaderDone', 'true');
    setAppLoaded(true);
  };

  useEffect(() => {
    // Global reveal animation for sections
    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => {
      gsap.fromTo(section, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    if (appLoaded) {
      const savedScrollPos = sessionStorage.getItem('homeScrollPos');
      if (savedScrollPos) {
        // A small timeout ensures layout is fully resolved before scrolling
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPos, 10));
          sessionStorage.removeItem('homeScrollPos');
        }, 50);
      }
    }
  }, [appLoaded]);

  return (
    <>
      {!appLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`app-container ${appLoaded ? 'app-loaded' : ''}`} style={{ opacity: appLoaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <Navbar />
        <main>
          <Hero isLoaded={appLoaded} />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  );
};

export default Home;
