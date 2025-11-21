import { Link } from 'react-router-dom';
import { Facebook, Instagram, WhatsApp, Email, Phone } from '@mui/icons-material'; // Import social media icons from MUI

const Footer = () => {
  return (
    <footer className="bg-prussian-blue p-10 font-sans text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo Section */}
        <div className="lg:flex lg:items-center">
          <Link to="/">
            <img src="/logo_nobg.png" alt="Auraltune Logo" className="w-36" />
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="lg:flex lg:items-center">
          <ul className="flex space-x-6">
            <li>
              <a href="https://www.facebook.com/profile.php?id=61566031226648" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="fill-gray-300 hover:fill-white w-7 h-7" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/auraltune" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="fill-gray-300 hover:fill-white w-7 h-7" />
              </a>
            </li>       
            <li>
              <a href="https://wa.me/+528180999301" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <WhatsApp className="fill-gray-300 hover:fill-white w-7 h-7" />
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Contáctanos</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:tuneaural@gmail.com" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                <Email className="w-5 h-5" />
                tuneaural@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+528180999301" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                <Phone className="w-5 h-5" />
                +52 8180999301
              </a>
            </li>
            <li>
              <span className="text-gray-300 text-sm">Monterrey, NL, México</span>
            </li>
          </ul>
        </div>

        {/* Information Links */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Enlaces</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/cotizador" className="text-gray-300 hover:text-white text-sm">Cotizador</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <p className="text-gray-300 text-sm mt-10 text-center">
        © {new Date().getFullYear()} Auraltune. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
