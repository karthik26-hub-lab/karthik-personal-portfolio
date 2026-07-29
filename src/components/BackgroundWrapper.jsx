import React from 'react';
import StarsBackground from './StarsBackground';

const BackgroundWrapper = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <StarsBackground
        factor={0.05}
        speed={50}
        transition={{ stiffness: 50, damping: 20 }}
        starColor="rgba(0, 0, 0, 0.4)"
        pointerEvents={true}
      />
    </div>
  );
};

export default BackgroundWrapper;
