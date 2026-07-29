import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleDotLottieRef = (dotLottie) => {
    if (dotLottie) {
      dotLottie.addEventListener('complete', () => {
        setIsFadingOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800); // Wait for CSS fade out transition
      });
    }
  };

  return (
    <div className={`preloader-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <DotLottieReact
          src="https://lottie.host/ef29948c-d63d-4b22-b7f8-87755e132cff/VWDYIbX3Sa.json"
          autoplay
          dotLottieRefCallback={handleDotLottieRef}
        />
      </div>
    </div>
  );
};

export default Preloader;
