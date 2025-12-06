import { useSpring, useTransition, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';

// Custom spring configs for glass animations
export const glassSpringConfig = {
  gentle: { tension: 120, friction: 14 },
  wobbly: { tension: 180, friction: 12 },
  stiff: { tension: 210, friction: 20 },
  slow: { tension: 280, friction: 60 },
  molasses: { tension: 280, friction: 120 },
  glass: { tension: 170, friction: 26 },
  glassBounce: { tension: 200, friction: 15, clamp: false },
  glassSmooth: { tension: 160, friction: 30 },
};

// Fade in animation hook
export const useFadeIn = (delay = 0) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    config: glassSpringConfig.glass,
    delay,
  });

  return { ref, style: spring, inView };
};

// Fade in up animation hook
export const useFadeInUp = (delay = 0, distance = 20) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : `translateY(${distance}px)`,
    config: glassSpringConfig.glass,
    delay,
  });

  return { ref, style: spring, inView };
};

// Scale animation hook
export const useScaleIn = (delay = 0) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'scale(1)' : 'scale(0.95)',
    config: glassSpringConfig.glassBounce,
    delay,
  });

  return { ref, style: spring, inView };
};

// Stagger children animation
export const useStaggeredList = <T,>(
  items: T[],
  options?: {
    baseDelay?: number;
    staggerDelay?: number;
    triggerOnce?: boolean;
  }
) => {
  const { baseDelay = 0, staggerDelay = 50, triggerOnce = true } = options || {};
  const [ref, inView] = useInView({
    triggerOnce,
    threshold: 0.1,
  });

  const transitions = useTransition(inView ? items : [], {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: (_, index) => ({
      opacity: 1,
      transform: 'translateY(0px)',
      delay: baseDelay + index * staggerDelay,
    }),
    leave: { opacity: 0 },
    config: glassSpringConfig.glass,
    keys: (item, index) => index,
  });

  return { ref, transitions, inView };
};

// Hover scale animation
export const useHoverScale = (scale = 1.02) => {
  const [isHovered, setIsHovered] = useState(false);

  const spring = useSpring({
    transform: isHovered ? `scale(${scale})` : 'scale(1)',
    config: glassSpringConfig.glassBounce,
  });

  const bind = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return { style: spring, bind, isHovered };
};

// Press/tap animation
export const usePressAnimation = () => {
  const [isPressed, setIsPressed] = useState(false);

  const spring = useSpring({
    transform: isPressed ? 'scale(0.97)' : 'scale(1)',
    config: config.stiff,
  });

  const bind = {
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseLeave: () => setIsPressed(false),
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
  };

  return { style: spring, bind, isPressed };
};

// Parallax scroll effect
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { transform: `translateY(${offset}px)` };
};

// Scroll progress
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

// Number animation (for counters)
export const useAnimatedNumber = (
  value: number,
  options?: { duration?: number; decimals?: number }
) => {
  const { duration = 1000, decimals = 0 } = options || {};
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (ease-out-cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue);
};

// Typewriter effect
export const useTypewriter = (
  text: string,
  options?: { speed?: number; delay?: number }
) => {
  const { speed = 50, delay = 0 } = options || {};
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.substring(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayText, isComplete };
};

// Shake animation (for errors)
export const useShake = () => {
  const [isShaking, setIsShaking] = useState(false);

  const spring = useSpring({
    transform: isShaking
      ? 'translateX(0px)'
      : 'translateX(0px)',
    config: { tension: 300, friction: 10 },
    onRest: () => setIsShaking(false),
  });

  const triggerShake = useCallback(() => {
    setIsShaking(true);
  }, []);

  // CSS-based shake for smoother animation
  const shakeClass = isShaking ? 'animate-[shake_0.5s_ease-in-out]' : '';

  return { style: spring, triggerShake, shakeClass, isShaking };
};

// Pulse animation
export const usePulse = (isActive = false) => {
  const spring = useSpring({
    loop: isActive,
    from: { opacity: 0.7, transform: 'scale(1)' },
    to: isActive
      ? [
          { opacity: 1, transform: 'scale(1.05)' },
          { opacity: 0.7, transform: 'scale(1)' },
        ]
      : { opacity: 1, transform: 'scale(1)' },
    config: { duration: 1000 },
  });

  return spring;
};

// Glow animation
export const useGlow = (isActive = false) => {
  const spring = useSpring({
    boxShadow: isActive
      ? '0 0 40px rgba(10, 132, 255, 0.4)'
      : '0 0 20px rgba(10, 132, 255, 0.15)',
    config: glassSpringConfig.glassSmooth,
  });

  return spring;
};

export default {
  useFadeIn,
  useFadeInUp,
  useScaleIn,
  useStaggeredList,
  useHoverScale,
  usePressAnimation,
  useParallax,
  useScrollProgress,
  useAnimatedNumber,
  useTypewriter,
  useShake,
  usePulse,
  useGlow,
  glassSpringConfig,
};
