import React, { useState } from 'react';
import { Slider, TextField, Box, Typography, Paper } from '@mui/material';
import { getRecommendedAudio, getRecommendedDanceFloor } from './assets';

const AttendeeSelector = ({ attendees, onAttendeesChange, onNext }) => {
  const [localAttendees, setLocalAttendees] = useState(attendees || 100);
  const [inputError, setInputError] = useState('');

  // Get recommendations based on current selection
  const recommendedAudio = getRecommendedAudio(localAttendees);
  const recommendedFloor = getRecommendedDanceFloor(localAttendees);

  const handleSliderChange = (event, newValue) => {
    setLocalAttendees(newValue);
    setInputError('');
    if (onAttendeesChange) {
      onAttendeesChange(newValue);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (value === '') {
      setLocalAttendees('');
      return;
    }

    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
      setInputError('Por favor ingresa un número válido');
      return;
    }

    if (numValue < 20) {
      setInputError('El mínimo es 20 invitados');
      return;
    }

    if (numValue > 500) {
      setInputError('Para eventos mayores a 500 personas, contáctanos directamente');
      return;
    }

    setInputError('');
    setLocalAttendees(numValue);
    if (onAttendeesChange) {
      onAttendeesChange(numValue);
    }
  };

  const handleContinue = () => {
    if (!localAttendees || localAttendees < 20) {
      setInputError('Por favor selecciona el número de invitados (mínimo 20)');
      return;
    }

    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4">
      <div className="text-center mb-4">
        <Typography variant="h5" className="font-bold text-gray-800 mb-2">
          ¿Para cuántos invitados es tu evento?
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          Este dato nos ayuda a recomendarte el equipo perfecto para tu celebración
        </Typography>
      </div>

      {/* Main Input Section */}
      <Paper elevation={3} className="p-5 mb-4">
        <Box className="mb-6">
          <div className="flex justify-center items-center gap-2 mb-6">
            <TextField
              type="number"
              value={localAttendees}
              onChange={handleInputChange}
              error={!!inputError}
              helperText={inputError}
              variant="outlined"
              inputProps={{
                min: 20,
                max: 500,
                style: { fontSize: '1.75rem', textAlign: 'center', fontWeight: 'bold' }
              }}
              className="w-28"
            />
            <Typography variant="h6" className="text-gray-600">
              invitados
            </Typography>
          </div>

          {/* Slider */}
          <Slider
            value={typeof localAttendees === 'number' ? localAttendees : 100}
            onChange={handleSliderChange}
            min={20}
            max={500}
            step={10}
            marks={[
              { value: 20, label: '20' },
              { value: 100, label: '100' },
              { value: 200, label: '200' },
              { value: 300, label: '300' },
              { value: 400, label: '400' },
              { value: 500, label: '500+' }
            ]}
            valueLabelDisplay="auto"
            sx={{
              color: '#005ad1',
              height: 6,
              '& .MuiSlider-thumb': {
                width: 20,
                height: 20,
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#005ad1',
                fontSize: '0.75rem',
              },
              '& .MuiSlider-markLabel': {
                fontSize: '0.75rem',
                marginTop: '8px',
              },
            }}
          />
        </Box>

        {/* Recommendations Preview */}
        {localAttendees >= 20 && !inputError && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="subtitle1" className="text-gray-700 mb-3 text-center font-semibold">
              Recomendaciones para tu evento
            </Typography>

            <div className={`grid ${localAttendees <= 200 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-3 ${localAttendees > 200 ? 'max-w-md mx-auto' : ''}`}>
              {/* Audio Recommendation */}
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                <Typography variant="subtitle2" className="font-bold text-blue-900 mb-2 text-sm">
                  Audio Recomendado
                </Typography>
                <Typography variant="body2" className="text-blue-800 mb-1">
                  {recommendedAudio.title}
                </Typography>
                <Typography variant="caption" className="text-blue-600">
                  {recommendedAudio.equipment}
                </Typography>
                <div className="mt-2">
                  <Typography variant="body2" className="font-bold text-blue-900">
                    {recommendedAudio.priceDisplay}
                  </Typography>
                </div>
              </div>

              {/* Dance Floor Recommendation - Only show for 200 or fewer attendees */}
              {localAttendees <= 200 && (
                <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-600">
                  <Typography variant="subtitle2" className="font-bold text-amber-900 mb-2 text-sm">
                    Pista de Baile Recomendada
                  </Typography>
                  <Typography variant="body2" className="text-amber-800 mb-1">
                    {recommendedFloor.title}
                  </Typography>
                  <Typography variant="caption" className="text-amber-600">
                    {recommendedFloor.dimensions} ({recommendedFloor.modules} módulos)
                  </Typography>
                  <div className="mt-2">
                    <Typography variant="body2" className="font-bold text-amber-900">
                      {recommendedFloor.priceDisplay}
                    </Typography>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 p-2 bg-gray-50 rounded-lg">
              <Typography variant="caption" className="text-gray-600 text-center block">
                Estas son recomendaciones base. En el siguiente paso podrás personalizar tu paquete completo
              </Typography>
            </div>
          </div>
        )}
      </Paper>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!localAttendees || localAttendees < 20 || !!inputError}
          className="px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
        >
          Continuar →
        </button>
      </div>
    </div>
  );
};

export default AttendeeSelector;
