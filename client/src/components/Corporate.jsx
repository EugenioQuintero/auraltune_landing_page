import React, { useRef } from 'react';
import Image from './Image';
import useGsapScrollAnimation from '../hooks/useGsapScrollAnimation';
import { clients } from './assets';

const Corporate = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const logoRefs = useRef([]);

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

  return (
    <div ref={sectionRef}>
      <h2
        ref={headingRef}
        className="text-gray-900 text-center text-4xl font-semibold mb-8"
      >
        Trusted by
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 items-center lg:mx-32">
        {clients.map((client, index) => (
          <div
            key={client.name}
            ref={(el) => (logoRefs.current[index] = el)}
            className="flex justify-center items-center"
          >
            <Image
              publicId={client.image}
              alt={client.name}
              className="w-50 h-50 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Corporate;
