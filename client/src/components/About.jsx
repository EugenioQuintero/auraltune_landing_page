import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from './Image';
import useGsapScrollAnimation from '../hooks/useGsapScrollAnimation';

const About = () => {
  // Create refs for elements
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRefs = useRef([]);
  const imageRef = useRef(null);

  // Define the refs object for the hook
  const refs = {
    trigger: sectionRef,
  };

  // Define the animation
  const animation = (tl) => {
    // Set initial opacity to 0 for all elements
    tl.set([titleRef.current, textRefs.current, imageRef.current], { opacity: 0 });

    tl.to(titleRef.current, { x: 0, opacity: 1, duration: 0.7 })
      .to(
        textRefs.current,
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.3 },
        '-=0.5'
      )
      .to(imageRef.current, { scale: 1, opacity: 1, duration: 0.7 }, '-=0.5');
  };

  // Apply the custom hook
  useGsapScrollAnimation(refs, animation, {
    start: 'top 80%',
    end: 'bottom top',
    toggleActions: 'play reverse play reverse',
    additionalOptions: {
      onLeave: () => gsap.set(sectionRef.current, { opacity: 0 }),
      onEnterBack: () => gsap.set(sectionRef.current, { opacity: 1 }),
    },
  });

  useEffect(() => {
    // Existing animation logic remains the same
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-4 pb-8 md:pt-6 md:pb-12">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:space-x-12 space-y-8 lg:space-y-0 px-4">
        {/* Image Section */}
        <div
          ref={imageRef}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <Image
            publicId="/purple"
            width={6000}
            height={4000}
            quality="auto"
            dpr="auto"
            loading="lazy"
            alt="Auraltune DJ en evento"
            className="w-full h-auto max-w-lg rounded-2xl shadow-lg transition-transform duration-500 ease-out hover:scale-105"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-left space-y-6">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
          >
            Sobre Nosotros
          </h2>
          <p
            ref={(el) => (textRefs.current[0] = el)}
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
          >
            En <span className="text-blue-600 font-semibold">Auraltune</span>, somos expertos en
            servicio de DJ y producción audiovisual en Monterrey. Nos especializamos en hacer de cada
            evento una experiencia única con audio de alta calidad, un show de luces sincronizado y
            una variedad de DJs para todo tipo de celebraciones.
          </p>
          <p
            ref={(el) => (textRefs.current[1] = el)}
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
          >
            Valoramos la transparencia, la puntualidad y un servicio personalizado. Nuestro equipo se
            adapta a las necesidades de cada cliente para garantizar un evento memorable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
