import React, { useEffect, useRef, useState } from 'react';
import SpotlightCard from './SpotlightCard';
import profileImg from '../assets/profile_transparent.png';
import Lanyard from './Lanyard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Highlighter } from './Highlighter';
import { DiaTextReveal } from './DiaTextReveal';
import { Code2, Zap, Palette, FileJson, Layout, Database, Server, Workflow, Box, PenTool, LayoutTemplate, GitBranch, GitFork, Code, Network, Cloud, Globe, Bot, Sparkles, Brain } from 'lucide-react';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Frontend');
  const [activeSkill, setActiveSkill] = useState(null);

  const techCategories = [
    { name: 'Frontend', skills: [
      { name: 'React', icon: <Code2 size={16} />, subskills: ['Hooks', 'Context API', 'React Router', 'API Integration', 'Responsive UI', 'State Management'] },
      { name: 'Vite', icon: <Zap size={16} />, subskills: ['Fast Development Server', 'Optimized Production Builds'] },
      { name: 'Tailwind CSS', icon: <Palette size={16} />, subskills: ['Responsive Design', 'Custom Components', 'Animations'] },
      { name: 'JavaScript', icon: <FileJson size={16} />, subskills: ['ES6+', 'Async/Await', 'DOM Manipulation', 'Fetch API'] },
      { name: 'HTML5', icon: <Layout size={16} />, subskills: ['Semantic HTML', 'Accessibility'] },
      { name: 'CSS3', icon: <Palette size={16} />, subskills: ['Flexbox', 'Grid', 'Animations'] }
    ] },
    { name: 'Backend', skills: [
      { name: 'Node.js', icon: <Server size={16} />, subskills: ['Express Integration', 'Middleware', 'Environment Variables'] },
      { name: 'Express.js', icon: <Workflow size={16} />, subskills: ['REST APIs', 'Routing', 'Authentication', 'Error Handling'] },
      { name: 'REST APIs', icon: <Network size={16} />, subskills: ['CRUD Operations', 'JSON Responses', 'API Testing'] }
    ] },
    { name: 'Database', skills: [
      { name: 'MongoDB', icon: <Database size={16} />, subskills: ['Collections', 'Aggregation', 'Indexing'] },
      { name: 'Mongoose', icon: <Box size={16} />, subskills: ['Schemas', 'Models', 'Validation', 'Relationships'] }
    ] },
    { name: 'Design', skills: [
      { name: 'Figma', icon: <PenTool size={16} />, subskills: ['Wireframes', 'UI Design', 'Prototyping'] },
      { name: 'Canva', icon: <LayoutTemplate size={16} />, subskills: ['Branding', 'Social Assets'] }
    ] },
    { name: 'Tools', skills: [
      { name: 'Git', icon: <GitBranch size={16} />, subskills: ['Branching', 'Merge', 'Pull Requests'] },
      { name: 'GitHub', icon: <GitFork size={16} />, subskills: ['Repository Management', 'Actions'] },
      { name: 'VS Code', icon: <Code size={16} />, subskills: ['Extensions', 'Debugging'] },
      { name: 'Postman', icon: <Network size={16} />, subskills: ['API Testing', 'Collections'] }
    ] },
    { name: 'Deployment', skills: [
      { name: 'Vercel', icon: <Cloud size={16} />, subskills: ['CI/CD', 'Custom Domains', 'Environment Variables'] },
      { name: 'Netlify', icon: <Globe size={16} />, subskills: ['Static Hosting', 'Forms'] }
    ] },
    { name: 'AI', skills: [
      { name: 'OpenAI API', icon: <Bot size={16} />, subskills: ['Chat Integration', 'Function Calling'] },
      { name: 'Gemini', icon: <Sparkles size={16} />, subskills: ['Prompt Engineering', 'Content Generation'] },
      { name: 'Claude', icon: <Brain size={16} />, subskills: ['UI Planning', 'Code Assistance'] }
    ] }
  ];

  

  return (
    <section id="about" className="about-section">
      <div className="container" style={{ position: 'relative' }}>
        
        {/* TOP HALF: Cinematic Long-form Story */}
        <div className="about-hero">
          
          <div className="about-lanyard-wrapper" style={{ position: 'absolute', top: 0, left: 'calc(-10% - 30px)', width: '60%', height: '100%', zIndex: 10, pointerEvents: 'auto' }}>
            <Lanyard 
              position={[0, 0, 20]} 
              gravity={[0, -40, 0]} 
              frontImage={profileImg} 
              backImage={profileImg} 
              transparent={true} 
            />
          </div>
          
          {/* Overlapping Text Content */}
          <div className="about-hero-content">
            <div className="about-hero-text" ref={textRef}>
              
              {/* Status Badge */}
              <div className="hero-status-badge">
                <div className="radar-container-small">
                  <div className="radar-pulse-small"></div>
                  <div className="radar-core-small"></div>
                </div>
                <div className="status-text-small">
                  <span className="status-title">Status: Active</span>
                  <span className="status-sub">Exploring Opportunities</span>
                </div>
              </div>

              <h2 className="hero-headline font-cardo" style={{ marginBottom: '1.5rem', lineHeight: '1.2' }}>
                <DiaTextReveal text="Building precise, high-performance web interfaces." textColor="var(--text-primary)" />
              </h2>
            
            <div className="about-hero-subtext">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}><Code2 size={20} /></div>
                  <div style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Engineering Foundation:</strong> <span style={{ color: 'var(--text-secondary)' }}>Applying ECE systems-discipline to write <Highlighter action="underline" color="#60a5fa" strokeWidth={1.5} isView={true}>highly structured and performant</Highlighter> frontend code.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}><Layout size={20} /></div>
                  <div style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Design Execution:</strong> <span style={{ color: 'var(--text-secondary)' }}>Translating high-fidelity UI/UX prototypes into <Highlighter action="underline" color="#f472b6" strokeWidth={1.5} isView={true}>fluid, pixel-perfect</Highlighter> web interfaces.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}><Sparkles size={20} /></div>
                  <div style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Frontend Exclusivity:</strong> <span style={{ color: 'var(--text-secondary)' }}>Specializing strictly in the <Highlighter action="underline" color="#fbbf24" strokeWidth={1.5} isView={true}>visual, interactive, and presentation</Highlighter> layers of the browser.</span>
                  </div>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
        {/* End of about-hero */}

        {/* BOTTOM HALF: Technical Bento Grid */}
        <div className="bento-grid">
          
          {/* Education Card */}
          <SpotlightCard className="bento-card bento-glass education-card">
            <h3 className="bento-title">Education</h3>
            <div className="bento-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>B.Tech in Electronics & Communication Engineering</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(0,0,0,0.6)', marginBottom: '1.5rem' }}>SRM Institute of Science and Technology</p>
              </div>
              
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>Expected Graduation: 2028</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(0,0,0,0.4)', fontWeight: 600, marginBottom: '0.2rem' }}>Performance</p>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>8.27 CGPA</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>2024 — 2028</p>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Toolkit Card */}
          <SpotlightCard className="bento-card bento-glass bento-wide tech-stack-card">
            <h3 className="bento-title">Engineering Stack</h3>
            
            <div className="tech-tabs">
              {techCategories.map(category => (
                <button 
                  key={category.name}
                  className={`tech-tab ${activeTab === category.name ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(category.name);
                    setActiveSkill(null);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div key={activeTab} className="hardware-chips-grid" style={{ minHeight: 'auto', alignContent: 'flex-start' }}>
              {techCategories.find(c => c.name === activeTab)?.skills.map(skill => (
                <div 
                  key={skill.name}
                  className={`tech-chip ${activeSkill?.name === skill.name ? 'active' : ''}`} 
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                >
                  <span className="tech-chip-icon">{skill.icon}</span>
                  <span className="tech-chip-name">{skill.name}</span>
                </div>
              ))}
            </div>

            <div className="active-skill-container">
              {activeSkill ? (
                <div key={activeSkill.name} className="active-skill-panel">
                  <div className="subskills-header">
                    <span className="subskills-title">{activeSkill.name} Core Expertise</span>
                  </div>
                  <div className="subskills-grid">
                    {activeSkill.subskills.map((sub, idx) => (
                      <div key={sub} className="subskill-item" style={{ animationDelay: `${idx * 0.05}s` }}>
                        <span className="subskill-check">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span className="subskill-name">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="active-skill-placeholder">
                  <div className="placeholder-icon-glow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                    </svg>
                  </div>
                  <p>Hover a technology to explore</p>
                </div>
              )}
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
};

export default About;
