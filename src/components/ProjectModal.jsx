import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Code, GitBranch } from 'lucide-react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="modal-scroll-area">
          <header className="modal-header">
            <span className="modal-category">{project.category}</span>
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-desc">{project.desc}</p>
          </header>

          <div className="modal-body">
            {project.overview && (
              <div className="modal-section">
                <h3>Project Overview</h3>
                <p>{project.overview}</p>
              </div>
            )}

            {project.challenge && (
              <div className="modal-section">
                <h3>The Challenge</h3>
                <p>{project.challenge}</p>
              </div>
            )}

            {project.architecture && (
              <div className="modal-section">
                <h3>Architecture & Solution</h3>
                <p>{project.architecture}</p>
              </div>
            )}

            {project.technicalHurdle && (
              <div className="modal-section highlight-section">
                <h3>Technical Hurdle</h3>
                <p>{project.technicalHurdle}</p>
              </div>
            )}

            {project.impact && (
              <div className="modal-section">
                <h3>The Impact</h3>
                <p>{project.impact}</p>
              </div>
            )}

            <div className="modal-section tech-section">
              <h3>Technologies Used</h3>
              <div className="modal-tech-grid">
                {project.tech.map(t => (
                  <div key={t} className="modal-tech-badge">
                    <Code size={16} /> {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-section demo-section">
              <h3>Live Demo & Source</h3>
              <p>Experience the project live or view the source code.</p>
              <div className="modal-actions-group">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="modal-demo-btn">
                  Launch {project.title} <ExternalLink size={18} />
                </a>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-github-btn">
                    Source Code <GitBranch size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
