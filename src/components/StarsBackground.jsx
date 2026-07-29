import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

function generateStars(count, starColor) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: 'linear' },
  starColor = '#fff',
  className = '',
  ...props
}) {
  const [boxShadow, setBoxShadow] = useState('');

  useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={className}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2000px' }}
      {...props}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          borderRadius: '9999px',
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          borderRadius: '9999px',
          top: '2000px',
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

function StarsBackground({
  children,
  className = '',
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#fff',
  pointerEvents = true,
  ...props
}) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = useCallback(
    (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  useEffect(() => {
    if (pointerEvents) {
      window.addEventListener('pointermove', handleMouseMove);
      return () => {
        window.removeEventListener('pointermove', handleMouseMove);
      };
    }
  }, [pointerEvents, handleMouseMove]);

  return (
    <div
      data-slot="stars-background"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'transparent'
      }}
      {...props}
    >
      <motion.div
        style={{ 
          x: springX, 
          y: springY, 
          pointerEvents: pointerEvents ? 'auto' : 'none' 
        }}
      >
        <StarLayer
          count={200}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={100}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: 'linear',
          }}
          starColor={starColor}
        />
        <StarLayer
          count={50}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 3,
            ease: 'linear',
          }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}

export { StarLayer, StarsBackground };
export default StarsBackground;
