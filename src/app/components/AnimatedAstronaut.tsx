import Image from 'next/image';
import styles from '../styles/astronaut.module.css';
import { useEffect, useRef } from 'react';

const AnimatedAstronaut = () => {
  const astronautRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (astronautRef.current) {
        // Reset position to start from left when animation ends
        astronautRef.current.style.animation = 'none';
        astronautRef.current.offsetHeight; // Trigger reflow
        astronautRef.current.style.animation = '';
      }
    };

    const element = astronautRef.current;
    element?.addEventListener('animationend', handleAnimationEnd);

    return () => {
      element?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  return (
    <div className={styles.astronautContainer}>
      <div ref={astronautRef} className={styles.astronaut}>
        <Image 
          src="/content_images/autrounaut.png" 
          alt="Flying Astronaut" 
          width={100} 
          height={100}
          priority
        />
        <div className={styles.smoke}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedAstronaut; 