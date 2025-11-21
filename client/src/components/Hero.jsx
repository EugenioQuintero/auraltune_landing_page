// src/components/Hero.jsx

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from './Image';

const Hero = () => {
  const textRef = useRef(null);
  const carouselRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add your Cloudinary image IDs here
  const images = [
    'auraltune/led_pista',
    'auraltune/EM-49',
    'auraltune/EM-57_kt50yc',
    'auraltune/better',
    'auraltune/EM-45_d9npco',
    'auraltune/DSC_3823',
    'auraltune/EM-61_pdcw8j', 
    'auraltune/DSC_3854',
    'auraltune/DSC_3866',
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Animate text entrance
    gsap.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Set up carousel animation with seamless loop
    const carousel = carouselRef.current;
    if (carousel) {
      const totalWidth = carousel.scrollWidth / 2;
      const pixelsPerSecond = 150; // Adjust speed by changing this value
      const duration = totalWidth / pixelsPerSecond;

      gsap.to(carousel, {
        x: `-${totalWidth}`,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const normalized = gsap.utils.wrap(-totalWidth, 0, parseFloat(x));
            return normalized;
          })
        }
      });
    }
  }, []);

  // Helper function to get image container classes based on screen size
  const getImageContainerClass = () => {
    const baseClasses = "relative h-full flex-none aspect-[4/3]"; // Adjust aspect ratio here
    
    if (windowWidth < 640) {
      return `${baseClasses} w-screen max-w-3xl`; // Adjust max-width for large screens
    } else if (windowWidth < 1024) {
      return `${baseClasses} w-1/2 max-w-xl`;
    } else {
      return `${baseClasses} w-1/3 max-w-lg`;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Image Carousel Container */}
      <div className="absolute inset-0">
        <div 
          ref={carouselRef}
          className="flex h-full"
          style={{ 
            width: '200%',
            gap: '0px'
          }}
        >
          {/* First set of images */}
          {images.map((publicId, index) => (
            <div
              key={`first-${index}`}
              className={getImageContainerClass()}
            >
              <Image
                publicId={publicId}
                alt={`Event ${index + 1}`}
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            </div>
          ))}
          
          {/* Duplicated set of images for seamless loop */}
          {images.map((publicId, index) => (
            <div
              key={`second-${index}`}
              className={getImageContainerClass()}
            >
              <Image
                publicId={publicId}
                alt={`Event ${index + 1}`}
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Overlay */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="px-4 sm:px-6 md:px-8">
          <h1 className="text-center">
            <span className="text-white text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wider whitespace-nowrap">
              ELEVATE YOUR <span className="text-highlight">AURA</span>
            </span>
          </h1>
        </div>

      </div>
    </div>
  );
};

export default Hero;
