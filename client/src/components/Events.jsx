import React from 'react';
import ImageGallery from './ImageGallery';
import { images } from './assets';

const Events = () => {
  return (
    <section className="events-section w-full py-8 md:py-12 mx-4 my-2 md:my-4">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Nuestros Eventos
        </h2>

        {/* Image Gallery Carousel */}
        <ImageGallery images={images} />
      </div>
    </section>
  );
};

export default Events;
