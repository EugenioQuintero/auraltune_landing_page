import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from './Image';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-primary text-gray-900 flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          ¿Listo para llevar tu evento al siguiente nivel?
        </h2>
        <p className="mt-4 text-2xl">
          Contáctanos hoy mismo para obtener una cotización personalizada o utiliza nuestro cotizador para comenzar a planear tu evento.
        </p>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <a href="/cotizador" className="btn-highlight text-lg">
            Cotizador
          </a>
          <a
            href="https://wa.me/+528180999301"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
