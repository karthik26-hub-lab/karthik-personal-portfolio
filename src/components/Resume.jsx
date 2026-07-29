import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { hapticFeedback } from '../utils/haptics';
import './Resume.css';

// Animation variants for staggered fade-in
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Resume = () => {
  const handlePrint = () => {
    hapticFeedback.success();
    window.print();
  };

  return (
    <div className="resume-page reveal-section">
      
      {/* Background Aurora for Web View */}
      <div className="resume-aurora no-print"></div>

      {/* Web-only Navigation & Actions */}
      <div className="resume-actions no-print">
        <Link to="/" className="resume-back-link" onClick={() => hapticFeedback.hover()}>
          <ArrowLeft size={20} />
          <span>Back to Portfolio</span>
        </Link>
        <button className="resume-print-btn" onClick={handlePrint}>
          <Download size={18} />
          <span>Save as PDF</span>
        </button>
      </div>

      {/* The Resume Document - Grid Layout on Web, 1-Column on Print */}
      <div className="resume-document">
        
        {/* LEFT COLUMN: Sidebar (Sticky on Web) */}
        <div className="resume-sidebar">
          
          <header className="resume-header">
            <h1 className="resume-name font-serif">Karthik</h1>
            <p className="resume-title">B.Tech ECE (3rd Year) <br/> Full Stack & Frontend Developer</p>
            <div className="resume-contact">
              <a href="mailto:karthikvk.dev@gmail.com">karthikvk.dev@gmail.com</a>
              <a href="tel:+919150650700">+91 9150650700</a>
              <a href="https://www.linkedin.com/in/karthik-v-0a143b274/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/karthik26-hub-lab" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </header>

          <div className="resume-section">
            <h2 className="resume-section-title font-serif">Profile</h2>
            <p className="resume-summary">
              Passionate and results-driven Full Stack and Frontend Developer with a strong foundation in modern web technologies (React, Node.js, MERN stack). Currently pursuing a B.Tech in Electronics and Communication Engineering, I have hands-on experience leading frontend architecture, integrating AI-assisted workflows, and building scalable, responsive web applications through multiple internships and freelance roles. Proven ability to bridge the gap between complex technical requirements and elegant user experiences.
            </p>
          </div>

          <div className="resume-section">
            <h2 className="resume-section-title font-serif">Technical Skills</h2>
            <div className="resume-skills">
              <div className="skill-group">
                <span className="skill-category">Frontend:</span>
                <span className="skill-list">React.js, Tailwind CSS, Responsive Web Design, JavaScript, HTML5, CSS3</span>
              </div>
              <div className="skill-group">
                <span className="skill-category">Backend & DB:</span>
                <span className="skill-list">Node.js, Express.js, REST APIs, MongoDB</span>
              </div>
              <div className="skill-group">
                <span className="skill-category">Tools:</span>
                <span className="skill-list">Git, GitHub, Postman, VS Code, Vercel</span>
              </div>
              <div className="skill-group">
                <span className="skill-category">Concepts:</span>
                <span className="skill-list">API Integration, CRUD Operations, Component-Based Development</span>
              </div>
            </div>
          </div>

          <div className="resume-section">
            <h2 className="resume-section-title font-serif">Education</h2>
            <div className="resume-item">
              <h3 className="resume-item-title">SRM Institute of Science and Technology</h3>
              <p className="resume-item-subtitle">B.Tech ECE</p>
              <p className="resume-item-metrics">Expected 2028 | CGPA: 8.27</p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Scrolling Content (Timeline on Web) */}
        <motion.div 
          className="resume-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          <div className="resume-section">
            <h2 className="resume-section-title font-serif">Experience</h2>
            <div className="timeline-container">
              
              <motion.div variants={itemVariants} className="resume-item timeline-item">
                <div className="timeline-dot"></div>
                <div className="resume-item-header">
                  <h3 className="resume-item-title">Elvesperia</h3>
                  <span className="resume-item-date">July 2026 – Present</span>
                </div>
                <p className="resume-item-subtitle">Lead Full Stack Developer</p>
                <ul className="resume-bullets">
                  <li>Led the development of responsive full-stack web applications using React, Node.js, Express.js, and MongoDB.</li>
                  <li>Designed and implemented scalable frontend interfaces, backend APIs, and database integration.</li>
                  <li>Managed deployment, version control, and project architecture using Git, GitHub, and Vercel.</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="resume-item timeline-item">
                <div className="timeline-dot"></div>
                <div className="resume-item-header">
                  <h3 className="resume-item-title">Flyrank AI</h3>
                  <span className="resume-item-date">July 2026 – Present</span>
                </div>
                <p className="resume-item-subtitle">Frontend AI Intern</p>
                <ul className="resume-bullets">
                  <li>Developing AI-assisted frontend applications using React, Tailwind CSS, and modern AI development tools.</li>
                  <li>Building responsive user interfaces and integrating REST APIs to enhance application functionality.</li>
                  <li>Collaborating on AI-powered features while utilizing AI-assisted development workflows for rapid prototyping and debugging.</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="resume-item timeline-item">
                <div className="timeline-dot"></div>
                <div className="resume-item-header">
                  <h3 className="resume-item-title">Decodelabs</h3>
                  <span className="resume-item-date">May 2026 – June 2026</span>
                </div>
                <p className="resume-item-subtitle">Full Stack Development Intern</p>
                <ul className="resume-bullets">
                  <li>Built full-stack web applications using React, Node.js, Express.js, and MongoDB.</li>
                  <li>Developed REST APIs, integrated frontend and backend modules, and implemented CRUD functionality.</li>
                  <li>Collaborated on project milestones while following modern full-stack development practices.</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="resume-item timeline-item">
                <div className="timeline-dot"></div>
                <div className="resume-item-header">
                  <h3 className="resume-item-title">QSkills</h3>
                  <span className="resume-item-date">Internship</span>
                </div>
                <p className="resume-item-subtitle">Frontend Developer Intern</p>
                <ul className="resume-bullets">
                  <li>Engineered InternTools, a responsive utility suite using React and Vite, featuring a translation tool and a cryptographic string generator powered by the Web Crypto API.</li>
                  <li>Designed a modern, mobile-first UI with Tailwind CSS, implementing glassmorphism, dark mode, micro-interactions, and haptic feedback.</li>
                  <li>Optimized application performance using React Hooks, local storage, and responsive layouts while improving state management and user workflows.</li>
                </ul>
              </motion.div>
            
            </div>
          </div>

          <div className="resume-section">
            <h2 className="resume-section-title font-serif">Certifications</h2>
            <div className="timeline-container">
              
              <motion.div variants={itemVariants} className="resume-item timeline-item">
                <div className="timeline-dot"></div>
                <div className="resume-item-header">
                  <h3 className="resume-item-title">AI Fluency: Framework & Foundations</h3>
                  <span className="resume-item-date">Jul 2026</span>
                </div>
                <p className="resume-item-subtitle">Anthropic</p>
              </motion.div>

              <motion.div variants={itemVariants} className="resume-item timeline-item">
                <div className="timeline-dot"></div>
                <div className="resume-item-header">
                  <h3 className="resume-item-title">JavaScript (Basic) Certificate</h3>
                  <span className="resume-item-date">HackerRank</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="resume-item timeline-item">
                <div className="timeline-dot"></div>
                <div className="resume-item-header">
                  <h3 className="resume-item-title">Java (Basic) Certificate</h3>
                  <span className="resume-item-date">HackerRank</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="resume-item timeline-item">
                <div className="timeline-dot"></div>
                <div className="resume-item-header">
                  <h3 className="resume-item-title">CSS (Basic) Certificate</h3>
                  <span className="resume-item-date">HackerRank</span>
                </div>
              </motion.div>

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
