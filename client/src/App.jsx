import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Cotizador from './pages/Cotizador';


const WhatsAppButton = () => {
  const location = useLocation();
  const isQuotePage = location.pathname === '/cotizador';

  return (
    <a
      href="https://wa.me/+528180999301"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 group ${isQuotePage ? 'hidden md:block' : ''}`}
      aria-label="Contactar por WhatsApp"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white rounded-full p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
        <FaWhatsapp className="w-10 h-10" />
      </div>
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        ¿Necesitas ayuda? Chatea con nosotros
      </span>
    </a>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizador" element={<Cotizador />} />
      </Routes>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </Router>
  )
}

export default App