import React from 'react';

const Dropdown = ({ categories, selectedCategory, onDropdownChange }) => {
  return (
    <div className="mb-8">
      <select
        value={selectedCategory}
        onChange={(e) => onDropdownChange(e.target.value)}
        className="w-full bg-gray-100 text-black p-4 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-lg"
      >
        {categories.map((category, index) => (
          <option value={category} key={index}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
