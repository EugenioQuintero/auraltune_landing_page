import React, { useRef, useEffect, useState } from 'react';
import Image from './Image';
import useGsapScrollAnimation from '../hooks/useGsapScrollAnimation';
import { clients } from './assets';

const Corporate = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const logoRefs = useRef([]);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

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

  // Force video playback on mount (especially for mobile)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Show video only when it's playing
    const handlePlaying = () => {
      setVideoLoaded(true);
    };

    // Force play with delay to avoid showing play button
    const playVideo = async () => {
      try {
        // Small delay to let video load
        await new Promise(resolve => setTimeout(resolve, 100));
        await video.play();
      } catch (error) {
        console.log('Video autoplay prevented:', error);
        // If autoplay fails, still show the video
        setVideoLoaded(true);
      }
    };

    playVideo();

    const handleTimeUpdate = () => {
      // Restart video 0.1 seconds before it ends for seamless loop
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-prussian-blue">
      <style>{`
        /* Hide video controls on all browsers */
        .corporate-video::-webkit-media-controls {
          display: none !important;
        }
        .corporate-video::-webkit-media-controls-enclosure {
          display: none !important;
        }
        .corporate-video::-webkit-media-controls-panel {
          display: none !important;
        }
        .corporate-video::-webkit-media-controls-play-button {
          display: none !important;
        }
        .corporate-video::-webkit-media-controls-start-playback-button {
          display: none !important;
        }

        /* Hide the large play button overlay on Safari iOS */
        .corporate-video::before {
          display: none !important;
        }

        .corporate-video {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>

      {/* Video Background - Full Width with Seamless Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute top-0 left-0 w-full h-full object-cover corporate-video"
        style={{
          filter: 'brightness(0.8)',
          minHeight: '100%',
          minWidth: '100%',
          pointerEvents: 'none',
          opacity: videoLoaded ? 0.4 : 0
        }}
      >
        <source src="/fondo.mp4" type="video/mp4" />
      </video>

      {/* Content with proper padding and container - Compacto y balanceado */}
      <div className="relative z-10 py-4 md:py-6">
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className="text-white text-center text-2xl md:text-3xl font-semibold mb-4"
          >
            Trusted by
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-x-8 md:gap-y-6 lg:gap-x-12 lg:gap-y-4 max-w-5xl mx-auto">
            {clients.map((client, index) => (
              <React.Fragment key={client.name}>
                <div
                  ref={(el) => (logoRefs.current[index] = el)}
                  className="flex justify-center items-center"
                >
                  <Image
                    publicId={client.image}
                    width={96}
                    height={96}
                    alt={client.name}
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                {/* Forzar salto de línea después del 5to logo en desktop */}
                {index === 4 && <div className="hidden lg:block lg:w-full h-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
