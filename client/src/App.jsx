import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Cotizador from './pages/Cotizador';

;


const App = () => {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizador" element={<Cotizador />} />
      </Routes>
    </Router>
   
  )
}

export default App