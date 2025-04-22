import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from './Image'; // Custom Cloudinary Image component

const ServiceDialogCard = ({ open, selectedCard, handleClose }) => {
  const navigate = useNavigate();

  if (!open || !selectedCard) return null;

  const handleReserve = () => {
    navigate('/cotizador');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">{selectedCard.title}</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {selectedCard.image && (
            <div className="overflow-hidden bg-gray-50 rounded-lg">
              <Image
                publicId={selectedCard.image}
                width={6000}
                height={4000}
                quality="auto"
                dpr="auto"
                alt={selectedCard.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="space-y-4">
            <p className="text-gray-600">{selectedCard.long_description || 'No additional description provided.'}</p>
            <p className="text-xl font-semibold text-blue-600">Precio: {selectedCard.price}</p>
            <p className="text-sm text-gray-500">
              * Precios no incluyen flete, montaje y desmontaje.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <button
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            onClick={handleClose}
          >
            Cerrar
          </button>
          <button
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleReserve}
          >
            Reserva Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDialogCard;
