import React, { useState, useRef, useEffect } from 'react';
import { hapticFeedback } from '../utils/haptics';
import './SwipeButton.css';

const SwipeButton = ({ targetUrl, text = "Swipe to connect" }) => {
  const [dragProgress, setDragProgress] = useState(0); 
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const trackRef = useRef(null);

  const handlePointerDown = (e) => {
    if (isSuccess) return;
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
    hapticFeedback.light();
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isSuccess) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const maxDrag = trackRect.width - 64; 
    let newX = e.clientX - trackRect.left - 32; 
    
    if (newX < 0) newX = 0;
    if (newX > maxDrag) newX = maxDrag;
    
    setDragProgress(newX / maxDrag);
  };

  const handlePointerUp = (e) => {
    if (!isDragging || isSuccess) return;
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
    
    if (dragProgress > 0.8) {
      setDragProgress(1);
      setIsSuccess(true);
      hapticFeedback.success();
      
      setTimeout(() => {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
        setTimeout(() => {
          setIsSuccess(false);
          setDragProgress(0);
        }, 1500);
      }, 400);
    } else {
      setDragProgress(0);
      hapticFeedback.light();
    }
  };

  return (
    <div className={`swipe-track ${isSuccess ? 'success' : ''} ${isDragging ? 'dragging' : ''}`} ref={trackRef}>
      <div 
        className="swipe-fill" 
        style={{ width: `calc(${dragProgress} * (100% - 64px) + 64px)` }}
      >
        <span 
          className="swipe-fill-text font-serif italic-text"
          style={{ opacity: dragProgress > 0.02 ? 1 : 0 }}
        >
          Let's make it happen.
        </span>
      </div>
      
      <span 
        className="swipe-text" 
        style={{ opacity: Math.max(0, 1 - dragProgress * 2) }}
      >
        {isSuccess ? "Connecting..." : text}
      </span>
      
      <div 
        className="swipe-knob"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ 
          left: `calc(${dragProgress} * (100% - 64px) + 4px)` 
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default SwipeButton;
