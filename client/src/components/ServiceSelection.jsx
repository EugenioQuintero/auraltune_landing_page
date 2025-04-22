// src/components/ServiceSelection.jsx

import React, { useState } from 'react';
import { packages } from '../components/assets';
import ServiceCard from './ServiceCard';
import { Tabs, Tab, Select, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ServiceSelection = ({ selectedPackages, setSelectedPackages }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Determine screen size
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Categories array
  const categories = packages.map((pkg) => pkg.title);

  // Handle package selection
  const handleSelectPackage = (packageItem) => {
    if (selectedPackages.some((item) => item.title === packageItem.title)) {
      setSelectedPackages(
        selectedPackages.filter((item) => item.title !== packageItem.title)
      );
    } else {
      setSelectedPackages([...selectedPackages, packageItem]);
    }
  };

  return (
    <div>
      {/* Category Selection */}
      {isSmallScreen ? (
        // Render Select component on small screens
        <Select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          fullWidth
          variant="outlined"
          className="mb-6"
          sx={{ textAlign: 'left' }}
        >
          {categories.map((category, index) => (
            <MenuItem value={index} key={index}>
              <strong>{category}</strong>
            </MenuItem>
          ))}
        </Select>
      ) : (
        // Render Tabs component on larger screens
        <Tabs
          value={selectedCategory}
          onChange={(event, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          indicatorColor="primary"
          textColor="primary"
          className="mb-6"
        >
          {categories.map((category, index) => (
            <Tab
              label={<strong>{category}</strong>}
              key={index}
            />
          ))}
        </Tabs>
      )}

      {/* Package Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {packages[selectedCategory].cards.map((card) => {
          const isSelected = selectedPackages.some(
            (item) => item.title === card.title
          );
          return (
            <ServiceCard
              key={card.title}
              title={card.title}
              description={card.description}
              price={card.price}
              image={card.image}
              long_description={card.long_description} // Ensure this field exists in your package data
              selectable={true}
              selected={isSelected}
              onSelect={() => handleSelectPackage(card)}
              showDetailsButton={true} // Ensure the "Ver Mas" button is shown
            />
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;
