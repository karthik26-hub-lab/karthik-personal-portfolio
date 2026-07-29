import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = 'var(--text-primary)',
  bgColor = 'transparent',
  marqueeBgColor = 'var(--text-primary)',
  marqueeTextColor = 'var(--bg-color)',
  borderColor = 'rgba(0, 0, 0, 0.1)'
}) {
  return (
    <div className="flowing-menu-container" style={{ backgroundColor: bgColor }}>
      <nav className="flowing-menu-nav">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, duration, role, desc, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.flowing-menu-marquee-part');
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.flowing-menu-marquee-part');
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const [isTouchActive, setIsTouchActive] = useState(false);

  useEffect(() => {
    if (!isTouchActive) return;

    const handleTouchOutside = (e) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        setIsTouchActive(false);
        handleMouseLeave(e);
      }
    };

    document.addEventListener('touchstart', handleTouchOutside);
    return () => document.removeEventListener('touchstart', handleTouchOutside);
  }, [isTouchActive]);

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    
    let clientX = ev.clientX;
    let clientY = ev.clientY;
    
    if (ev.touches && ev.touches.length > 0) {
      clientX = ev.touches[0].clientX;
      clientY = ev.touches[0].clientY;
    }
    
    if (clientX === undefined) clientX = rect.left + rect.width / 2;
    if (clientY === undefined) clientY = rect.top + rect.height / 2;

    const edge = findClosestEdge(clientX - rect.left, clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    
    let clientX = ev.clientX;
    let clientY = ev.clientY;
    
    if (ev.touches && ev.touches.length > 0) {
      clientX = ev.touches[0].clientX;
      clientY = ev.touches[0].clientY;
    }
    
    if (clientX === undefined) clientX = rect.left + rect.width / 2;
    if (clientY === undefined) clientY = rect.top + rect.height / 2;

    const edge = findClosestEdge(clientX - rect.left, clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const handleClick = (e) => {
    if (window.matchMedia('(hover: none)').matches) {
      if (!isTouchActive) {
        e.preventDefault();
        setIsTouchActive(true);
        handleMouseEnter(e);
      }
    }
  };

  return (
    <div
      className="flowing-menu-item"
      ref={itemRef}
      style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
    >
      <a
        className="flowing-menu-link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={(e) => {
          if (!window.matchMedia('(hover: none)').matches) handleMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          if (!window.matchMedia('(hover: none)').matches) handleMouseLeave(e);
        }}
        onClick={handleClick}
        style={{ color: textColor }}
      >
        <div className="flowing-menu-link-left">{duration}</div>
        <div className="flowing-menu-link-center">{text}</div>
        <div className="flowing-menu-link-right">{role}</div>
      </a>
      <div
        className="flowing-menu-marquee"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="flowing-menu-marquee-inner" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="flowing-menu-marquee-part" key={idx} style={{ color: marqueeTextColor }}>
              <div
                className="flowing-menu-marquee-logo"
                style={{ backgroundImage: `url(${image})` }}
              />
              <span className="flowing-menu-marquee-text">{text}</span>
              {(duration || role || desc) && (
                <div className="flowing-menu-marquee-details">
                  {duration && <span className="flowing-menu-marquee-duration">{duration}</span>}
                  {role && <span className="flowing-menu-marquee-role">{role}</span>}
                  {desc && <span className="flowing-menu-marquee-desc">{desc}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
