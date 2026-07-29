import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projects as allProjects } from '../data/projects';
import ProjectModal from '../components/ProjectModal';
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = React.useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <button className="gallery-back-btn" onClick={() => navigate('/')} aria-label="Back to Home">
          <ArrowLeft size={20} /> Back
        </button>
        <h2>All Projects</h2>
        <div style={{ width: '80px' }}></div> {/* Spacer for centering */}
      </header>

      <div className="gallery-grid">
        {allProjects.map((project) => (
          <div 
            key={project.id} 
            className="gallery-item"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedProject(project)}
          >
            <div 
              className="gallery-item-image"
              style={{ background: project.imagePlaceholder }}
            >
            </div>
            
            <div className="gallery-item-content">
              <span className="gallery-item-category">{project.category}</span>
              <h3 className="gallery-item-title">{project.title}</h3>
              <p className="gallery-item-desc">{project.desc}</p>
              
              <div className="gallery-item-tags">
                {project.tech.map(tag => (
                  <span key={tag} className="gallery-item-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Gallery;
