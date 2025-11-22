import React, { useRef, useEffect } from 'react';
import Image from './Image';
import useGsapScrollAnimation from '../hooks/useGsapScrollAnimation';
import { clients } from './assets';

const Corporate = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const logoRefs = useRef([]);
  const videoRef = useRef(null);

  const refs = {
    trigger: sectionRef,
  };

  const animation = (tl) => {
    tl.set([headingRef.current, logoRefs.current], { opacity: 0 });

    tl.to(headingRef.current, { y: 0, opacity: 1, duration: 0.7 })
      .to(logoRefs.current, { y: 0, opacity: 1, duration: 0.7, stagger: 0.2 }, '-=0.5');
  };

  useGsapScrollAnimation(refs, animation, {
    start: 'top 80%',
    end: 'bottom top',
    toggleActions: 'play reverse play reverse',
  });

  // Seamless loop - restart video slightly before it ends
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Restart video 0.1 seconds before it ends for seamless loop
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-prussian-blue">
      {/* Video Background - Full Width with Seamless Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        style={{
          filter: 'brightness(0.8)',
          minHeight: '100%',
          minWidth: '100%'
        }}
      >
        <source src="/fondo.mp4" type="video/mp4" />
      </video>

      {/* Content with proper padding and container */}
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className="text-white text-center text-4xl font-semibold mb-8"
          >
            Trusted by
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center max-w-6xl mx-auto px-4">
            {clients.map((client, index) => (
              <div
                key={client.name}
                ref={(el) => (logoRefs.current[index] = el)}
                className="flex justify-center items-center w-full"
              >
                <Image
                  publicId={client.image}
                  width={120}
                  height={120}
                  alt={client.name}
                  className="w-20 h-20 md:w-28 md:h-28 object-contain filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
