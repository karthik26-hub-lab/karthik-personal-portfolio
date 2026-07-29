import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel } from './ui/Carousel';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = React.useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header text-center">
          <h2 className="h2-section">Selected Works.</h2>
          <p className="text-secondary">A showcase of engineering and design.</p>
        </div>

        <Carousel.Root opts={{ loop: true, align: "center" }} className="projects-carousel">
          <Carousel.PrevTrigger className="carousel-btn carousel-btn-prev">
            <ChevronLeft size={24} />
          </Carousel.PrevTrigger>

          <Carousel.Content className="projects-carousel-container">
            {projects.slice(0, 3).map((project) => (
              <Carousel.Item key={project.id} className="projects-carousel-slide">
                <div className="project-card">
                  <div className="project-inner-glow"></div>
                  
                  <div className="project-card-layout">
                    {/* Huge Image Header */}
                    <div 
                      className="project-image-area"
                      style={{ background: project.imagePlaceholder }}
                    >
                      <div 
                        className="project-view-button"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Project <ArrowUpRight size={18} />
                      </div>
                    </div>
                    
                    {/* Content Footer */}
                    <div className="project-content-area">
                      <div className="project-text-left">
                        <span className="project-category">{project.category}</span>
                        <h3>{project.title}</h3>
                        <p>{project.desc}</p>
                      </div>
                      
                      <div className="project-tech-right">
                        {project.tech.map(tag => (
                          <span key={tag} className="project-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel.Content>

          <Carousel.NextTrigger className="carousel-btn carousel-btn-next">
            <ChevronRight size={24} />
          </Carousel.NextTrigger>
          
          <div className="carousel-controls">
            <Carousel.IndicatorGroup className="carousel-indicators">
              {({ index }) => (
                <Carousel.Indicator
                  key={index}
                  index={index}
                  className={({ isSelected }) => `carousel-dot ${isSelected ? 'is-selected' : ''}`}
                />
              )}
            </Carousel.IndicatorGroup>
          </div>
        </Carousel.Root>

        <div className="explore-projects-wrapper">
          <button 
            className="explore-projects-btn" 
            onClick={() => {
              sessionStorage.setItem('homeScrollPos', window.scrollY);
              navigate('/projects');
            }}
          >
            Explore All Projects <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
