import React from 'react';

const Services = () => {
  const servicios = [
    {
      id: '01',
      title: 'Audio profesional',
      subtitle: 'Equipos de audio',
      description: 'Sistemas premium BOSE y Harbinger para cobertura perfecta en cualquier espacio.',
    },
    {
      id: '02',
      title: 'Iluminación Avanzada',
      subtitle: 'Efectos de luz DMX',
      description: 'Tecnología DMX y reflectores LED para iluminación profesional y dinámica.',
    },
    {
      id: '03',
      title: 'DJ',
      subtitle: 'Ambientación musical',
      description: 'DJ profesional que adapta la energía musical para mantener a todos bailando.',
    },
    {
      id: '04',
      title: 'Pantallas LED',
      subtitle: 'Proyección visual',
      description: 'Alta resolución para lanzamientos, conferencias y shows inmersivos.',
    },
    {
      id: '05',
      title: 'Pista de Baile',
      subtitle: 'Infinity Gold LED',
      description: 'Efectos infinitos y colores personalizados que se adaptan a tu evento.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      {/* Título de la sección con fondo azul */}
      <div className="text-center mb-6">
        <div className="inline-block bg-[#005ad1] px-10 py-3 rounded-t-xl">
          <h2 className="text-white font-bold text-xl md:text-2xl tracking-wide">SERVICIOS</h2>
        </div>
      </div>

      {/* Grid de 2 columnas */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
        {servicios.map((servicio, index) => (
          <div
            key={servicio.id}
            className={`bg-white border-2 border-blue-100 rounded-xl p-3 md:p-5 hover:shadow-2xl hover:border-[#005ad1] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out group relative overflow-hidden cursor-pointer ${
              index === servicios.length - 1 ? 'md:col-start-1 md:col-end-3 md:max-w-md md:mx-auto md:w-full' : ''
            }`}
          >
            {/* Acento azul en la esquina */}
            <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-[#005ad1]/10 rounded-bl-full group-hover:bg-[#005ad1]/20 transition-all"></div>

            <div className="relative z-10">
              <div className="flex items-start gap-2 mb-2">
                <span className="bg-[#005ad1] text-white px-2 md:px-3 py-0.5 md:py-1 rounded-lg shrink-0 shadow-md text-sm font-bold">
                  {servicio.id}
                </span>
                <h3 className="text-gray-900 font-bold group-hover:text-[#005ad1] transition-colors text-sm md:text-base">
                  {servicio.title}
                </h3>
              </div>
              <p className="text-[#005ad1] font-semibold text-xs md:text-sm mb-1 md:mb-2">
                {servicio.subtitle}
              </p>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {servicio.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button con efecto premium */}
      <div className="text-center">
        <a
          href="/cotizador"
          className="bg-[#005ad1] hover:bg-[#004aa8] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg inline-flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-bold"
        >
          Cotiza Tu Evento
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Services;
