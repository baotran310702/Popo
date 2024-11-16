'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SliderPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Base images
    const baseImages = [
      '/em/ee0b28fa88cb33956ada.jpg',
      '/em/9a68266986583d066449.jpg',
      '/em/0490345b946a2f34767b.jpg',
      '/em/20240824_162356.jpg',
      '/em/20240915_191939.jpg',
      '/em/20240915_192855.jpg',
      '/em/20240921_062346.jpg',
      '/em/20240922_101511.jpg',
      '/em/20240922_101509.jpg',
      '/em/20241005_113831(0).jpg',
      '/em/20240915_191954.jpg',
      '/em/20241116_145927.jpg',
      '/em/a69a8f7b2f4a9414cd5b.jpg',
      '/em/Locket_1719448866338_11.jpg',
    ];
    
    // No need to repeat images 100 times anymore
    setImages(baseImages);
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      // Update to show next set of 4 images
      setCurrentImageIndex((prev) => (prev + 4) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-page">
      <div className="slider-container">
        <div 
          className="images-row"
          style={{
            transform: `translateX(-${currentImageIndex * 25}%)`,
            width: '100%', // Show 4 images at 25% width each
            gap: '20px',
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className="image-container"
              style={{ 
                flex: '0 0 calc(25% - 15px)', // 25% width for each image
                height: '400px'
              }}
            >
              <Image
                src={image}
                alt={`Slide ${index}`}
                fill
                style={{ 
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                priority={index < 4} // Only prioritize first 4 images
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 