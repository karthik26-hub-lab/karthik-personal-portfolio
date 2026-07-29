import React from 'react';
import { Link } from 'react-router-dom';
import { hapticFeedback } from '../utils/haptics';
import './Contact.css';

import SwipeButton from './SwipeButton';

const Contact = () => {
  return (
    <section id="contact" className="contact-section reveal-section">
      <div className="contact-aurora"></div>
      <div className="container contact-minimal-container">
        <div className="contact-minimal-content">
          
          <h2 className="contact-minimal-title float-element">
            Let's create something <br/>
            <span className="font-serif italic-text">extraordinary.</span>
          </h2>
          
          <div className="contact-action-wrapper float-element-delayed" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <SwipeButton targetUrl="https://www.linkedin.com/in/karthik-v-0a143b274/" />
          </div>
          
          <div className="contact-minimal-socials float-element">
            <a href="https://www.linkedin.com/in/karthik-v-0a143b274/" target="_blank" rel="noreferrer" className="contact-social-link" onClick={() => hapticFeedback.tap()}>LinkedIn</a>
            <a href="https://github.com/karthik26-hub-lab" target="_blank" rel="noreferrer" className="contact-social-link" onClick={() => hapticFeedback.tap()}>GitHub</a>
            <Link to="/resume" className="contact-social-link" onClick={() => hapticFeedback.tap()}>Resume</Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
