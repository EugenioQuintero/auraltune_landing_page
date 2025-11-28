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
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-2 md:py-3 rounded-3xl mx-4 my-0 md:my-2">
      <div className="container mx-auto px-3 md:px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-2 md:mb-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-1.5">
            SERVICIOS
          </h2>
          <div className="w-16 md:w-20 h-0.5 bg-white mx-auto"></div>
        </div>

        {/* Services Grid - Ultra compacto móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2.5 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-2.5 hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {/* Number Badge & Title */}
              <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {service.number}
                </div>
                <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Subtitle - Oculto en móvil */}
              <p className="hidden md:block text-blue-100 italic text-xs mb-1">
                {service.subtitle}
              </p>

              {/* Description - Más corta en móvil */}
              <p className="text-white/90 text-[11px] md:text-xs leading-tight line-clamp-2 md:line-clamp-none">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-2 md:mt-3">
          <a
            href="/cotizador"
            className="inline-block px-5 md:px-6 py-2 md:py-2.5 bg-white text-blue-600 font-bold text-sm md:text-base rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Cotiza Tu Evento →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
