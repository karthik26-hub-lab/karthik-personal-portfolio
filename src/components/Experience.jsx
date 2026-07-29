import React from 'react';
import FlowingMenu from './FlowingMenu';
import HyperText from './HyperText';

const Experience = () => {
  const experiences = [
    {
      link: 'https://elvesperia-website.vercel.app/',
      text: 'Elvesperia',
      image: '/images/elvesperia-logo.png',
      duration: 'JUL 2026 - PRES',
      role: 'Freelance Frontend Developer',
      desc: 'Building premium cinematic ecosystems.'
    },
    {
      link: 'https://flyrank.ai/',
      text: 'FlyrankAI',
      image: 'https://www.google.com/s2/favicons?domain=flyrank.ai&sz=128',
      duration: 'JUL 2026 - PRES',
      role: 'Front-end AI Engineer',
      desc: 'Integrating AI models and capabilities.'
    },
    {
      link: 'https://www.qskill.in/',
      text: 'qskill',
      image: 'https://www.google.com/s2/favicons?domain=qskill.in&sz=128',
      duration: 'JUL 2026 - PRES',
      role: 'Frontend Developer',
      desc: 'Building scalable user interfaces.'
    },
    {
      link: 'https://www.decodelabs.tech/',
      text: 'decodelabs',
      image: 'https://www.google.com/s2/favicons?domain=decodelabs.tech&sz=128',
      duration: 'MAY 2026 - JUN 2026',
      role: 'Fullstack Developer',
      desc: 'Maintaining web applications.'
    }
  ];

  return (
    <section id="experience" className="reveal-section" style={{ padding: '8rem 0', width: '100%' }}>
      <div className="container">
        <div 
          className="experience-header-container"
          style={{ marginBottom: '4rem' }}
        >
          <div className="experience-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', marginBottom: '1rem' }}>
              <HyperText 
                className="font-serif italic-text" 
                startOnView={true} 
                duration={1000}
                as="span"
              >
                Experience.
              </HyperText>
            </h2>
            <p className="section-subtitle">A timeline of my professional journey.</p>
          </div>
        </div>
      </div>
      
      {/* We make the menu full width for maximum impact */}
      <div style={{ height: '70vh', position: 'relative', width: '100%' }}>
        <FlowingMenu 
          items={experiences} 
          speed={15}
          textColor="var(--text-primary)"
          bgColor="transparent"
          marqueeBgColor="var(--text-primary)"
          marqueeTextColor="var(--bg-color)"
          borderColor="rgba(0, 0, 0, 0.1)"
        />
      </div>
    </section>
  );
};

export default Experience;
