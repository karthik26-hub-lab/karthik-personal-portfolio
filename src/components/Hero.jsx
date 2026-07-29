import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Briefcase, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import RetroGrid from './RetroGrid';
import { DiaTextReveal } from './DiaTextReveal';
import { hapticFeedback } from '../utils/haptics';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isLoaded }) => {
  const heroRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    const tl = gsap.timeline({ delay: 3.2 }); // Delay 2.4s + DiaTextReveal sweep duration (0.8s) for subtitle
    
    tl.fromTo(subtitleRef.current,
      { y: 20, opacity: 0, filter: 'blur(5px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0, filter: 'blur(5px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(socialsRef.current,
      { y: 20, opacity: 0, filter: 'blur(5px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: -10 },
      { opacity: 0.6, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    gsap.to(heroRef.current.querySelector('.hero-content'), {
      yPercent: 30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'top -20%',
        scrub: true
      }
    });

  }, [isLoaded]);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="hero-aurora"></div>
      <RetroGrid />
      
      <div className="container hero-content">
        <h1 className="h1-hero">
          <div className="title-line font-sans" style={{ fontWeight: 800, letterSpacing: '-0.02em', paddingBottom: '0.2em' }}>
            {isLoaded ? <DiaTextReveal text="Karthik." delay={2.4} duration={0.8} textColor="#1d1d1f" colors={["#1d1d1f", "#424245", "#86868b", "#1d1d1f"]} /> : <span style={{ opacity: 0 }}>Karthik.</span>}
          </div>
          <div className="title-line font-sans" style={{ fontSize: '0.45em', letterSpacing: '-0.02em', fontWeight: 600 }}>
            {isLoaded ? <DiaTextReveal text="Building precise, high-performance web interfaces." delay={2.6} duration={1.2} textColor="#424245" colors={["#424245", "#86868b", "#d2d2d7", "#424245"]} /> : <span style={{ opacity: 0 }}>Building precise, high-performance web interfaces.</span>}
          </div>
        </h1>
        
        <p className="text-lead hero-subtitle font-sans" style={{ fontWeight: 400, fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#86868b', maxWidth: '600px', lineHeight: '1.6' }} ref={subtitleRef}>
          Translating high-fidelity designs into fluid, responsive frontend code.
        </p>

        <div className="hero-cta" ref={ctaRef}>
          <div className="water-pill-container font-sans">
            <a href="#projects" className="water-pill-btn primary interactive" onClick={() => hapticFeedback.tap()}>Explore Archive</a>
          </div>
        </div>

        <div className="hero-socials-wrapper" ref={socialsRef}>
          <div className="hero-socials-pill">
            <a href="https://github.com/karthik26-hub-lab" target="_blank" rel="noreferrer" className="social-icon interactive" title="GitHub" onClick={() => hapticFeedback.tap()}>
              <Code size={20} strokeWidth={1.5} />
            </a>
            <div className="social-divider"></div>
            <a href="https://www.linkedin.com/in/karthik-v-0a143b274/" target="_blank" rel="noreferrer" className="social-icon interactive" title="LinkedIn" onClick={() => hapticFeedback.tap()}>
              <Briefcase size={20} strokeWidth={1.5} />
            </a>
            <div className="social-divider"></div>
            <Link to="/resume" className="social-icon interactive" title="Resume" onClick={() => hapticFeedback.tap()}>
              <FileText size={20} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      <div className="scroll-indicator-container" ref={scrollIndicatorRef}>
        <div className="scroll-pill">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
