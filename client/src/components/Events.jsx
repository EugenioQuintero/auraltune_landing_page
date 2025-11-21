import React from 'react';
import ImageGallery from './ImageGallery';
import { images } from './assets';

const Events = () => {
  return (
    <section className="events-section w-full py-16 mx-4 my-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-gray-900">
          Nuestros Eventos
        </h2>

        {/* Image Gallery Carousel */}
        <ImageGallery images={images} />
      </div>
    </section>
  );
};

export default Events;
