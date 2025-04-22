import React, { useState, useEffect, useRef } from 'react';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router

const sections = [
  { name: 'Sobre Nosotros', id: '#sobre-nosotros' },
  { name: 'Servicios', id: '#servicios' },
  { name: 'Eventos', id: '#eventos' },
  { name: 'Reseñas', id: '#resenas' },
  { name: 'Contáctanos', id: 'https://wa.me/+528180999301', isContact: true }, 
  { name: 'Cotiza Aquí!', id: '/cotizador', isQuoteButton: true }, // Internal route
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);
  const navigate = useNavigate();  // Initialize React Router's navigation function

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (id) => {
    if (id.startsWith("http")) {
      // If it's an external link (like WhatsApp)
      window.location.href = id;
    } else if (id === '/cotizador') {
      // Use React Router to navigate to internal routes
      navigate(id);
    } else if (id.startsWith("#")) {
      // Scroll to internal sections
      const section = document.querySelector(id);
      if (section) {
        const yOffset = -90;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setIsDrawerOpen(false);  // Close drawer after clicking
  };

  const renderNavButtons = (isMobile = false) => {
    return sections.map(({ name, id, isContact, isQuoteButton }) => (
      <button
        key={id}
        onClick={() => handleNavigation(id)}
        className={`
          font-medium text-sm tracking-wide
          transition-all duration-200 ease-in-out
          ${isQuoteButton
            ? 'bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700'
            : isContact
              ? 'bg-gray-100 text-blue-600 px-6 py-2.5 rounded-lg hover:bg-gray-200'
              : 'text-gray-600 hover:text-blue-600 px-4 py-2.5'}
          ${isMobile ? 'w-full text-left' : ''}
        `}
      >
        {name}
      </button>
    ));
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      navbarRef.current.classList.add('-translate-y-full');
    } else {
      navbarRef.current.classList.remove('-translate-y-full');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav ref={navbarRef} className="bg-white shadow-sm fixed w-full z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Area - Dark Background to maintain white logo visibility */}
            <div className="flex items-center">
              <div className="bg-blue-600 px-4 py-2 rounded-lg">
                <a href="/" className="text-2xl font-bold text-white">
                  AURALTUNE
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {renderNavButtons()}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={toggleDrawer} className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: 'white',
            width: 280,
            padding: '1.5rem',
          },
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end mb-6">
            <button onClick={toggleDrawer} className="p-2 text-gray-600 hover:text-blue-600">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            {renderNavButtons(true)}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
