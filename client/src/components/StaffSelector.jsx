import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Alert,
  Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { staffServices } from './assets';
import { formatPrice } from '../utils/pricingUtils';

const StaffSelector = ({
  selections,
  onSelectionsChange,
  onNext,
  onBack
}) => {
  const [selectedStaff, setSelectedStaff] = useState(selections?.staff || []);
  const [vjWarning, setVjWarning] = useState('');

  // Check if VJ can be selected (requires LED screens OR lighting equipment)
  const hasScreens = selections?.screen && selections.screen.basePrice > 0;
  const hasLighting = selections?.lighting && selections.lighting.length > 0;
  const canUseVJ = hasScreens || hasLighting;

  useEffect(() => {
    // Update parent
    if (onSelectionsChange) {
      onSelectionsChange({
        ...selections,
        staff: selectedStaff
      });
    }

    // Check VJ requirement
    const hasVJ = selectedStaff.some(s => s.id === 'vj-service');
    if (hasVJ && !canUseVJ) {
      setVjWarning('Nota: El servicio de VJ requiere pantallas LED o iluminación. Regresa al paso anterior para seleccionar equipo.');
    } else {
      setVjWarning('');
    }
  }, [selectedStaff, canUseVJ]);

  const isSelected = (serviceId) => {
    return selectedStaff.some(s => s.id === serviceId);
  };

  const toggleStaff = (service) => {
    // Special check for VJ
    if (service.id === 'vj-service' && !canUseVJ) {
      alert('El servicio de VJ requiere pantallas LED o iluminación. Por favor selecciona equipo en el paso anterior.');
      return;
    }

    setSelectedStaff(prev => {
      if (isSelected(service.id)) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const calculateStaffTotal = () => {
    return selectedStaff.reduce((sum, service) => sum + service.basePrice, 0);
  };

  const handleContinue = () => {
    // Staff is optional, so no validation needed
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-800 mb-2">
          Staff y Servicios
        </Typography>
        <Typography variant="body2" className="text-gray-600 mb-3">
          Añade profesionales que elevarán la experiencia de tu evento
        </Typography>
        {selectedStaff.length > 0 && (
          <Typography variant="body2" className="text-blue-600 font-medium">
            {selectedStaff.length} {selectedStaff.length === 1 ? 'servicio seleccionado' : 'servicios seleccionados'} • {formatPrice(calculateStaffTotal())}
          </Typography>
        )}
      </div>

      {vjWarning && (
        <Box className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <Typography variant="body2" className="text-amber-800 text-center">
            ⚠️ {vjWarning}
          </Typography>
        </Box>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {staffServices.map((service) => {
          const selected = isSelected(service.id);
          const isVJDisabled = service.id === 'vj-service' && !canUseVJ;

          return (
            <Box
              key={service.id}
              onClick={() => !isVJDisabled && toggleStaff(service)}
              className={`relative bg-white rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                selected
                  ? 'ring-2 ring-blue-500 bg-blue-50/50 shadow-md'
                  : isVJDisabled
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:shadow-lg hover:-translate-y-1'
              }`}
              sx={{
                border: '1px solid',
                borderColor: selected ? '#3b82f6' : '#e5e7eb'
              }}
            >
              {/* Checkmark cuando está seleccionado */}
              {selected && (
                <div className="absolute top-3 right-3">
                  <CheckCircleIcon sx={{ color: '#3b82f6', fontSize: 28 }} />
                </div>
              )}

              {/* Icon centrado */}
              <div className="flex justify-center mb-4">
                <span className="text-6xl">{service.icon}</span>
              </div>

              {/* Service Name */}
              <Typography
                variant="h6"
                className="font-bold text-gray-900 text-center mb-2"
                sx={{ fontSize: '1.125rem' }}
              >
                {service.name}
              </Typography>

              {/* Price */}
              <Typography
                variant="h5"
                className={`font-bold text-center mb-1 ${selected ? 'text-blue-600' : 'text-gray-800'}`}
                sx={{ fontSize: '1.5rem' }}
              >
                {service.priceDisplay}
              </Typography>

              {/* Duration */}
              <Typography
                variant="caption"
                className="text-gray-500 text-center block"
                sx={{ fontSize: '0.75rem' }}
              >
                {service.duration}
              </Typography>
            </Box>
          );
        })}
      </div>

      {/* Info Note - Simplificado */}
      <Box className="mb-6 text-center">
        <Typography variant="caption" className="text-gray-500">
          💡 Todos los servicios incluyen 5 horas • Horas extras con tarifa adicional
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
        >
          ← Atrás
        </button>

        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Continuar a Resumen →
        </button>
      </div>
    </div>
  );
};

export default StaffSelector;
