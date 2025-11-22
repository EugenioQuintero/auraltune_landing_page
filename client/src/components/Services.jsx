import React from 'react';

const Services = () => {
  const services = [
    {
      number: '01',
      title: 'Audio profesional',
      subtitle: 'Equipos de alta fidelidad',
      description: 'Sistemas de audio premium BOSE y Harbinger para cobertura perfecta en cualquier espacio, desde eventos íntimos hasta festivales.',
      icon: '🔊'
    },
    {
      number: '02',
      title: 'Iluminación Avanzada',
      subtitle: 'Efectos de luz con tecnología DMX',
      description: 'Efectos de luz con tecnología DMX y reflectores LED para realzar cada momento con iluminación profesional y dinámica.',
      icon: '✨'
    },
    {
      number: '03',
      title: 'DJ',
      subtitle: 'Ambientación musical profesional',
      description: 'DJ profesional que lee la pista y adapta la energía musical para mantener a todos bailando toda la noche.',
      icon: '🎧'
    },
    {
      number: '04',
      title: 'Pantallas LED',
      subtitle: 'Proyección de contenido visual',
      description: 'Proyección de contenido visual en alta resolución para lanzamientos, conferencias y shows inmersivos con pantallas LED modulares.',
      icon: '🖥️'
    },
    {
      number: '05',
      title: 'Pista de Baile',
      subtitle: 'Infinity Gold personalizable',
      description: 'Pista de baile LED Infinity Gold con efectos infinitos y colores personalizados que se adaptan al estilo de tu evento.',
      icon: '💃'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-8 rounded-3xl mx-4 my-8 mb-2">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-3">
            SERVICIOS
          </h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20 w-full md:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)] max-w-sm"
            >
              {/* Number Badge & Title */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {service.number}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="text-blue-100 italic text-xs mb-2">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-white/90 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-6">
          <a
            href="/cotizador"
            className="inline-block px-6 py-2.5 bg-white text-blue-600 font-bold text-base rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Cotiza Tu Evento →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
