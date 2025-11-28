import React from 'react';

const Services = () => {
  const services = [
    {
      number: '01',
      title: 'Audio profesional',
      subtitle: 'Equipos de alta fidelidad',
      description: 'Sistemas premium BOSE y Harbinger para cobertura perfecta en cualquier espacio.',
      icon: '🔊'
    },
    {
      number: '02',
      title: 'Iluminación Avanzada',
      subtitle: 'Efectos de luz DMX',
      description: 'Tecnología DMX y reflectores LED para iluminación profesional y dinámica.',
      icon: '✨'
    },
    {
      number: '03',
      title: 'DJ',
      subtitle: 'Ambientación musical',
      description: 'DJ profesional que adapta la energía musical para mantener a todos bailando.',
      icon: '🎧'
    },
    {
      number: '04',
      title: 'Pantallas LED',
      subtitle: 'Proyección visual',
      description: 'Alta resolución para lanzamientos, conferencias y shows inmersivos.',
      icon: '🖥️'
    },
    {
      number: '05',
      title: 'Pista de Baile',
      subtitle: 'Infinity Gold LED',
      description: 'Efectos infinitos y colores personalizados que se adaptan a tu evento.',
      icon: '💃'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-6 rounded-3xl mx-4 my-6">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white mb-2">
            SERVICIOS
          </h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </div>

        {/* Services Grid - Compacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {/* Number Badge & Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-base">
                  {service.number}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {service.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="text-blue-100 italic text-xs mb-1.5">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-white/90 text-xs leading-snug">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-4">
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
