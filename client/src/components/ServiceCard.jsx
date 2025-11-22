import React, { forwardRef, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from './Image'; // Custom Cloudinary Image component

const ServiceCard = forwardRef(({ title, description, image, price, showDetailsButton, onDetailsClick }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-lg"
    >
      {image && (
        <div className="aspect-[4/3] overflow-hidden bg-gray-50">
          <Image
            publicId={image}
            width={800}
            height={600}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">{title}</h3>
        <p className="text-gray-600 text-base line-clamp-3 leading-relaxed">{description}</p>
        <div className="pt-3 border-t border-gray-100">
          <p className="text-lg font-semibold text-blue-600">Precio: {price}</p>
        </div>
        {showDetailsButton && (
          <button
            className="w-full mt-4 py-2.5 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg
                     hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
            onClick={onDetailsClick}
            aria-label={`Ver más sobre ${title}`}
          >
            Ver Más
          </button>
        )}
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;