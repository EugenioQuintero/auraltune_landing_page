import React from 'react';

const Tabs = ({ categories, selectedCategory, onTabChange }) => {
  return (
    <div className="text-center mb-8 space-x-4 flex justify-center">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onTabChange(category)}
          className={`px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-accent text-white shadow-inner'
              : 'bg-gray-200 text-black hover:bg-accent hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
