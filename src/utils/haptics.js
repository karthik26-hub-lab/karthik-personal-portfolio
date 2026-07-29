export const triggerHaptic = (pattern = 10) => {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore on unsupported devices
    }
  }
};

export const hapticFeedback = {
  // Very light tick, perfect for hovering over 3D elements or scrolling
  hover: () => triggerHaptic(5),
  // Standard tap for clicking buttons or links
  tap: () => triggerHaptic(15), 
  // Heavier tap for major actions
  heavy: () => triggerHaptic(30),
  // Double tap for success/confirmations
  success: () => triggerHaptic([15, 60, 25]), 
  // Triple buzz for errors
  error: () => triggerHaptic([30, 50, 30, 50, 30]) 
};
