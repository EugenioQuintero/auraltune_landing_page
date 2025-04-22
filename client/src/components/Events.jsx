import React, { useState } from 'react';
import Tabs from './Tabs';
import Dropdown from './Dropdown';
import ImageGallery from './ImageGallery';
import { images } from './assets';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Extract unique event categories
  const categories = ['Todos', ...new Set(images.map((img) => img.title))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter images based on the selected category
  const filteredImages = selectedCategory === 'Todos'
    ? images
    : images.filter((img) => img.title === selectedCategory);

  return (
    <section className="events-section max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold text-center mb-8 text-white">Nuestros Eventos</h2>

      {/* Tabs for Larger Screens */}
      <div className="hidden md:block">
        <Tabs categories={categories} selectedCategory={selectedCategory} onTabChange={handleCategoryChange} />
      </div>

      {/* Dropdown for Smaller Screens */}
      <div className="md:hidden">
        <Dropdown categories={categories} selectedCategory={selectedCategory} onDropdownChange={handleCategoryChange} />
      </div>

      {/* Image Gallery */}
      <ImageGallery images={filteredImages} />
    </section>
  );
};

export default Events;
