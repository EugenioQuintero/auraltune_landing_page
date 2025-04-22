import React, { useState } from 'react';
import Dropdown from './Dropdown';
import ServiceCard from './ServiceCard';
import ServiceDialogCard from './ServiceDialogCard';
import { packages } from './assets';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const categories = ['Todos', ...new Set(packages.map((pkg) => pkg.title))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOpenDialog = (card) => {
    setSelectedCard(card);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCard(null);
    setOpenDialog(false);
  };

  const filteredPackages = selectedCategory === 'Todos'
    ? packages
    : packages.filter((pkg) => pkg.title === selectedCategory);

  return (
    <section className="container mx-auto px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
        Nuestros Servicios
      </h2>

      {/* Tabs for Larger Screens */}
      <div className="hidden md:block">
        <nav className="relative z-0 flex justify-center mb-12" role="tablist">
          <div className="inline-flex rounded-xl bg-gray-100 p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`
                  relative px-8 py-3 text-sm font-medium rounded-lg
                  transition-all duration-200 ease-in-out
                  ${selectedCategory === category
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
                role="tab"
                aria-selected={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Enhanced Mobile Dropdown */}
      <div className="md:hidden mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="input-field"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPackages.map((pkg) =>
          pkg.cards.map((card, idx) => (
            <ServiceCard
              key={idx}
              {...card}
              showDetailsButton={true}
              onDetailsClick={() => handleOpenDialog(card)}
            />
          ))
        )}
      </div>

      {/* Service Dialog */}
      {selectedCard && (
        <ServiceDialogCard
          open={openDialog}
          selectedCard={selectedCard}
          handleClose={handleCloseDialog}
        />
      )}
    </section>
  );
};

export default Services;
