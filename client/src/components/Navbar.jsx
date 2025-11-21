import React, { useState, useEffect, useRef } from 'react';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useNavigate and useLocation from React Router

const sections = [
  { name: 'Sobre Nosotros', id: '#sobre-nosotros' },
  { name: 'Servicios', id: '#servicios' },
  { name: 'Eventos', id: '#eventos' },
  { name: 'Cotiza Aquí!', id: '/cotizador', isQuoteButton: true }, // Internal route
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);
  const navigate = useNavigate();  // Initialize React Router's navigation function
  const location = useLocation();  // Get current location

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (id) => {
    if (id.startsWith("http")) {
      // If it's an external link (like WhatsApp)
      window.location.href = id;
    } else if (id === '/cotizador') {
      // Use React Router to navigate to internal routes and scroll to top instantly
      navigate(id);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    } else if (id.startsWith("#")) {
      // If we're not on the home page, navigate to home first with the hash
      if (location.pathname !== '/') {
        navigate('/' + id);
        setIsDrawerOpen(false);
        return;
      }

      // Scroll to internal sections (only if we're on home page)
      const section = document.querySelector(id);
      if (section) {
        // Different offsets for different sections
        let yOffset = -80; // Default offset
        const isMobile = window.innerWidth < 1024; // lg breakpoint

        if (id === '#servicios') {
          yOffset = 60;
        } else if (id === '#sobre-nosotros') {
          // Mobile needs more offset to show complete section
          yOffset = isMobile ? 50 : -50;
        } else if (id === '#eventos') {
          yOffset = 50;
        }

        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setIsDrawerOpen(false);  // Close drawer after clicking
  };

  const renderNavButtons = (isMobile = false) => {
    // In mobile drawer, exclude the quote button (it will be shown outside)
    const filteredSections = isMobile
      ? sections.filter(section => !section.isQuoteButton)
      : sections;

    return filteredSections.map(({ name, id, isContact, isQuoteButton }) => (
      <button
        key={id}
        onClick={() => handleNavigation(id)}
        className={`
          font-medium text-sm tracking-wide
          transition-all duration-200 ease-in-out
          ${isQuoteButton
            ? 'bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 hover:scale-105'
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

  // Handle scroll on page load if there's a hash in the URL
  useEffect(() => {
    if (location.hash) {
      // Wait a bit for the page to render
      setTimeout(() => {
        const section = document.querySelector(location.hash);
        if (section) {
          let yOffset = -80;
          const isMobile = window.innerWidth < 1024; // lg breakpoint

          if (location.hash === '#servicios') {
            yOffset = 60;
          } else if (location.hash === '#sobre-nosotros') {
            // Mobile needs more offset to show complete section
            yOffset = isMobile ? 50 : -50;
          } else if (location.hash === '#eventos') {
            yOffset = 50;
          }

          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <nav ref={navbarRef} className="bg-white shadow-sm fixed w-full z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Area - Identical to quote button */}
            <a
              href="/"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm lg:text-2xl font-medium lg:font-bold transition-all leading-none"
            >
              AURALTUNE
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {renderNavButtons()}
            </div>

            {/* Mobile: Quote Button + Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Quote Button - Always visible on mobile */}
              <button
                onClick={() => handleNavigation('/cotizador')}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-700 leading-none"
              >
                COTIZA AQUÍ!
              </button>
              {/* Hamburger Menu */}
              <button
                onClick={toggleDrawer}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 transition-colors"
              >
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
