import { useState, useEffect } from 'react';

export interface Scroll3DState {
  scrollY: number;
  progress: number;
  velocity: number;
  activeSection: string;
}

export function useScroll3D(): Scroll3DState {
  const [scrollState, setScrollState] = useState<Scroll3DState>({
    scrollY: 0,
    progress: 0,
    velocity: 0,
    activeSection: 'hero',
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let ticking = false;

    const calculateState = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dy = currentScrollY - lastScrollY;
      const velocity = dy / dt;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));

      // Determine active section based on scroll position
      let activeSection = 'hero';
      const worksElem = document.getElementById('works');
      const capElem = document.getElementById('capabilities');
      const philElem = document.getElementById('philosophy');
      const metElem = document.getElementById('metrics');

      const triggerOffset = window.innerHeight * 0.4;
      if (metElem && currentScrollY + triggerOffset >= metElem.offsetTop) {
        activeSection = 'metrics';
      } else if (philElem && currentScrollY + triggerOffset >= philElem.offsetTop) {
        activeSection = 'philosophy';
      } else if (capElem && currentScrollY + triggerOffset >= capElem.offsetTop) {
        activeSection = 'capabilities';
      } else if (worksElem && currentScrollY + triggerOffset >= worksElem.offsetTop) {
        activeSection = 'works';
      }

      setScrollState({
        scrollY: currentScrollY,
        progress,
        velocity: Math.min(Math.max(velocity, -5), 5),
        activeSection,
      });

      lastScrollY = currentScrollY;
      lastTime = now;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollState;
}
