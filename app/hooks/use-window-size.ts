'use client';
import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' && window.innerWidth,
    height: typeof window !== 'undefined' && window.innerHeight
  });

  function handleResize() {
    setWindowSize({
      width: typeof window !== 'undefined' && window.innerWidth,
      height: typeof window !== 'undefined' && window.innerHeight
    });

  }
  useEffect(() => {
    window?.addEventListener('resize', handleResize);
    return () => window?.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export { useWindowSize };
