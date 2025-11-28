import React from 'react';
import ImageGallery from './ImageGallery';
import { images } from './assets';

const Events = () => {
  return (
    <section className="events-section w-full py-6 md:py-8 lg:py-10 mx-0 sm:mx-4 my-2 md:my-4">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
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
