import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Layers, Folder, Mail, Menu, X, Briefcase, MessageSquare } from 'lucide-react';
import { hapticFeedback } from '../utils/haptics';
import profileImg from '../assets/profile.png';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  // --- DESKTOP DRAG ENGINE STATE ---
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isDraggingDesktop, setIsDraggingDesktop] = useState(false);
  const desktopDragOffset = useRef(0);
  const itemRefs = useRef([]);
  const desktopContainerRef = useRef(null);
  const indicatorRef = useRef(null);
  const dragStartX = useRef(0);
  const dragStartLeft = useRef(0);

  // --- MOBILE LONG-PRESS ENGINE STATE ---
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);
  const [hoveredSectionMobile, setHoveredSectionMobile] = useState(null);
  const longPressTimer = useRef(null);
  const startTouchPos = useRef({x: 0, y: 0});

  const navItems = [
    { name: 'Home', href: '#hero', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Projects', href: '#projects', icon: Folder },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  // Observer for scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isDraggingDesktop && !isExpandedMobile) {
            const mappedItem = navItems.find(item => item.href === `#${entry.target.id}`);
            if (mappedItem) setActiveSection(mappedItem.name);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    document.querySelectorAll('section').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isDraggingDesktop, isExpandedMobile]);

  // Lock body scroll on mobile when menu is expanded to prevent Safari rubber-banding
  useEffect(() => {
    const preventScroll = (e) => {
      if (isExpandedMobile) {
        e.preventDefault();
      }
    };
    // Must be passive: false to allow preventDefault()
    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [isExpandedMobile]);

  // Update Desktop Indicator
  const updateDesktopIndicator = () => {
    if (isDraggingDesktop || window.innerWidth <= 768) return;
    const activeIndex = navItems.findIndex(item => item.name === activeSection);
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const el = itemRefs.current[activeIndex];
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    setTimeout(updateDesktopIndicator, 100);
    window.addEventListener('resize', updateDesktopIndicator);
    return () => window.removeEventListener('resize', updateDesktopIndicator);
  }, [activeSection]);


  // ==========================================
  // DESKTOP: Strict Magnetic Drag Engine
  // ==========================================
  const handleDesktopPointerDown = (e) => {
    if (window.innerWidth <= 768) return; 
    setIsDraggingDesktop(true);
    dragStartX.current = e.clientX;
    dragStartLeft.current = indicatorStyle.left;
    e.target.setPointerCapture(e.pointerId);
  };

  const handleDesktopPointerMove = (e) => {
    if (!isDraggingDesktop) return;
    const deltaX = e.clientX - dragStartX.current;
    const minLeft = itemRefs.current[0].offsetLeft;
    const maxItem = itemRefs.current[navItems.length - 1];
    const maxLeft = maxItem.offsetLeft + (maxItem.offsetWidth - indicatorStyle.width);
    
    let newLeft = dragStartLeft.current + deltaX;
    if (newLeft < minLeft) newLeft = minLeft;
    if (newLeft > maxLeft) newLeft = maxLeft;
    
    // Direct DOM mutation for 60fps zero-lag dragging
    if (indicatorRef.current) {
      indicatorRef.current.style.transform = `translateX(${newLeft}px)`;
    }
    
    desktopDragOffset.current = deltaX;
  };

  const handleDesktopPointerUp = (e) => {
    if (!isDraggingDesktop) return;
    setIsDraggingDesktop(false);
    e.target.releasePointerCapture(e.pointerId);
    
    if (Math.abs(desktopDragOffset.current) < 5) {
      desktopDragOffset.current = 0;
      return; 
    }
    
    desktopDragOffset.current = 0;
    const currentCenter = indicatorStyle.left + (indicatorStyle.width / 2);
    let closestItem = navItems[0];
    let minDistance = Infinity;
    
    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const distance = Math.abs(currentCenter - (el.offsetLeft + (el.offsetWidth / 2)));
      if (distance < minDistance) {
        minDistance = distance;
        closestItem = navItems[index];
      }
    });
    
    handleNavigation(closestItem.name, closestItem.href);
  };


  // ==========================================
  // MOBILE: Long-Press Drag-to-Select Engine
  // ==========================================
  const handleMobilePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    startTouchPos.current = { x: e.clientX, y: e.clientY };
    
    longPressTimer.current = setTimeout(() => {
      setIsExpandedMobile(true);
      setHoveredSectionMobile(activeSection);
      if (navigator.vibrate) navigator.vibrate(50); // Tactile feedback
    }, 350); // 350ms to activate context menu
  };

  const handleMobilePointerMove = (e) => {
    // If user swipes to scroll page before timer hits, cancel long-press
    if (!isExpandedMobile) {
      const deltaY = Math.abs(e.clientY - startTouchPos.current.y);
      if (deltaY > 10) clearTimeout(longPressTimer.current);
      return;
    }
    
    // Once expanded, track finger and highlight item underneath
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const navItemEl = el?.closest('.mobile-nav-item');
    if (navItemEl) {
      const section = navItemEl.getAttribute('data-section');
      if (section && section !== hoveredSectionMobile) {
        setHoveredSectionMobile(section);
        if (navigator.vibrate) navigator.vibrate(10); // Micro tactile tick
      }
    } else {
      // Finger dragged outside menu bounds
      setHoveredSectionMobile(null);
    }
  };

  const handleMobilePointerUp = (e) => {
    clearTimeout(longPressTimer.current);
    if (e.target.hasPointerCapture(e.pointerId)) {
      e.target.releasePointerCapture(e.pointerId);
    }
    
    if (isExpandedMobile) {
      if (hoveredSectionMobile) {
        // They dragged and released
        const mappedItem = navItems.find(i => i.name === hoveredSectionMobile);
        if (mappedItem) handleNavigation(mappedItem.name, mappedItem.href);
      } else {
        // They just tapped an item, use elementFromPoint because pointerCapture masks target
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const navItemEl = el?.closest('.mobile-nav-item');
        if (navItemEl) {
          const section = navItemEl.getAttribute('data-section');
          const mappedItem = navItems.find(i => i.name === section);
          if (mappedItem) handleNavigation(mappedItem.name, mappedItem.href);
        }
      }
      setIsExpandedMobile(false);
      setHoveredSectionMobile(null);
    } else {
      // It was just a quick tap to open!
      setIsExpandedMobile(true);
    }
  };

  // Dedicated close button for mobile if they just tapped to open
  const closeMobileMenu = (e) => {
    e.stopPropagation();
    setIsExpandedMobile(false);
    setHoveredSectionMobile(null);
  };

  const handleNavigation = (name, href) => {
    if (name === activeSection) {
      setIsExpandedMobile(false);
      return;
    }

    hapticFeedback.tap(); // Standard tap for nav clicks
    setIsExpandedMobile(false);
    
    const mainEl = document.querySelector('main');
    const targetEl = document.querySelector(href);
    const identityPill = document.querySelector('.nav-identity-pill');
    
    if (mainEl && targetEl && identityPill) {
      const NAVBAR_OFFSET = 100; // Offset so the navbar doesn't cover the section title
      // PRE-CALCULATE target scroll position before any scaling distorts the layout
      const targetScrollY = targetEl.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      
      // 1. Calculate origin relative to the Left Pill (Identity)
      const pillRect = identityPill.getBoundingClientRect();
      const originX = pillRect.left + (pillRect.width / 2);
      const originY = window.scrollY + pillRect.top + (pillRect.height / 2);
      
      mainEl.style.transformOrigin = `${originX}px ${originY}px`;
      
      // 2. Trigger Zoom Out (Sucks into the pill)
      mainEl.classList.add('page-transitioning');
      
      // 3. Wait for animation to finish
      setTimeout(() => {
        // Jump to the pre-calculated true absolute position
        window.scrollTo(0, targetScrollY);
        
        // 4. Recalculate anchor for the new position
        const newOriginY = window.scrollY + pillRect.top + (pillRect.height / 2);
        mainEl.style.transformOrigin = `${originX}px ${newOriginY}px`;
        
        // 5. Trigger Zoom In (Expands out of the pill)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            mainEl.classList.remove('page-transitioning');
            setActiveSection(name);
          });
        });
      }, 350); 
      
    } else if (targetEl) {
      setActiveSection(name);
      const targetScrollY = targetEl.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };


  const ActiveIcon = navItems.find(i => i.name === activeSection)?.icon || Home;

  return (
    <div className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`}>

      {/* ========================================== */}
      {/* DESKTOP DOCK (Hidden on Mobile) */}
      {/* ========================================== */}
      <nav className="nav-dock-pill desktop-only">
        <div 
          className="nav-dock-items" 
          ref={desktopContainerRef}
          onPointerDown={handleDesktopPointerDown}
          onPointerMove={handleDesktopPointerMove}
          onPointerUp={handleDesktopPointerUp}
          onPointerCancel={handleDesktopPointerUp}
        >
          {/* Strict Active Indicator */}
          <div 
            ref={indicatorRef}
            className={`nav-active-indicator ${isDraggingDesktop ? 'dragging' : ''}`}
            style={{ 
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity
            }}
          />

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.name;
            return (
              <a 
                ref={el => itemRefs.current[index] = el}
                key={item.name}
                href={item.href}
                className={`nav-item interactive ${isActive ? 'active' : ''}`}
                style={{ animationDelay: `${1.1 + (index * 0.15)}s` }}
                onClick={(e) => {
                  e.preventDefault();
                  if (Math.abs(desktopDragOffset.current) > 5) return;
                  handleNavigation(item.name, item.href);
                }}
                title={item.name}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="nav-item-text">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <a href="mailto:karthikvk.dev@gmail.com" className="nav-hire-btn interactive" title="Let's Talk" onClick={() => hapticFeedback.tap()}>
        <span className="hire-btn-text">Let's Talk</span>
        <MessageSquare className="hire-btn-icon" size={18} />
      </a>

      {/* ========================================== */}
      {/* MOBILE LONG-PRESS DOCK (Hidden on Desktop) */}
      {/* ========================================== */}
      <nav className={`nav-dock-pill mobile-only ${isExpandedMobile ? 'expanded' : ''}`}>
        
        {/* The interactive surface area for the touch engine */}
        <div 
          className="mobile-touch-surface"
          onPointerDown={handleMobilePointerDown}
          onPointerMove={handleMobilePointerMove}
          onPointerUp={handleMobilePointerUp}
          onPointerCancel={handleMobilePointerUp}
        >
          {/* Collapsed State: Shows active item, hides when expanded */}
          <div className="mobile-active-display">
            <ActiveIcon size={20} strokeWidth={2} />
            <span className="mobile-active-text">{activeSection}</span>
          </div>

          {/* Expanded State: The Dropdown List */}
          <div className="mobile-dropdown-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Highlight if hovering via drag, or if it's the active section (when not hovering anything)
              const isHighlighted = hoveredSectionMobile === item.name || (!hoveredSectionMobile && activeSection === item.name);
              
              return (
                <div 
                  key={item.name}
                  data-section={item.name}
                  className={`mobile-nav-item ${isHighlighted ? 'highlighted' : ''}`}
                  onClick={(e) => {
                    // For users who just tapped to open, allow tap to select
                    e.stopPropagation();
                    handleNavigation(item.name, item.href);
                  }}
                >
                  <Icon size={18} strokeWidth={isHighlighted ? 2.5 : 2} />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </nav>
      
    </div>
  );
};

export default Navbar;
