import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, TextField, Box, Chip, Typography, Alert, IconButton, Collapse } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';

const libraries = ['places'];

const AddressAutocomplete = ({
  value,
  onChange,
  error,
  helperText,
  validMunicipalities = ['Monterrey', 'San Pedro', 'Santiago', 'Cumbres', 'San Jerónimo', 'Guadalupe']
}) => {
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const autocompleteService = useRef(null);
  const placesService = useRef(null);
  const geocoder = useRef(null);

  // Map of municipality aliases to handle different name variations
  const municipalityAliases = {
    'Monterrey': ['Monterrey', 'Centro de Monterrey'],
    'San Pedro': ['San Pedro', 'San Pedro Garza García', 'San Pedro Garza Garcia'],
    'Santiago': ['Santiago', 'Santiago Nuevo León', 'Santiago N.L.'],
    'Cumbres': ['Cumbres', 'Cumbres Monterrey'],
    'San Jerónimo': ['San Jerónimo', 'San Jeronimo'],
    'Guadalupe': ['Guadalupe', 'Guadalupe Nuevo León', 'Guadalupe N.L.']
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      geocoder.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  // Get predictions when input changes
  useEffect(() => {
    if (!autocompleteService.current || !inputValue || inputValue.length < 3) {
      setPredictions([]);
      return;
    }

    const request = {
      input: inputValue,
      componentRestrictions: { country: 'mx' },
      types: ['address'],
      // Bias results towards Nuevo León
      locationBias: {
        center: { lat: 25.6866, lng: -100.3161 }, // Monterrey coordinates
        radius: 50000, // 50km radius
      }
    };

    autocompleteService.current.getPlacePredictions(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        // Show all results - validation will happen on selection
        // This allows any street address to appear in suggestions
        setPredictions(results);
      } else {
        setPredictions([]);
      }
    });
  }, [inputValue, validMunicipalities]);

  const validateMunicipality = async (placeId) => {
    if (!geocoder.current) return { isValid: false, municipality: null };

    return new Promise((resolve) => {
      geocoder.current.geocode({ placeId }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const addressComponents = results[0].address_components;

          // Search through ALL address components for a match
          let matchedMunicipality = null;
          let isValid = false;

          // Check every component in the address
          for (const component of addressComponents) {
            const componentName = component.long_name;
            const componentNameLower = componentName.toLowerCase();

            // Check against all valid municipalities and their aliases
            for (const validMunicipality of validMunicipalities) {
              const aliases = municipalityAliases[validMunicipality] || [validMunicipality];

              // Check if this component matches any alias
              const matches = aliases.some(alias => {
                const aliasLower = alias.toLowerCase();
                return componentNameLower.includes(aliasLower) ||
                       aliasLower.includes(componentNameLower);
              });

              if (matches) {
                isValid = true;
                matchedMunicipality = validMunicipality;
                break;
              }
            }

            if (isValid) break;
          }

          resolve({
            isValid,
            municipality: matchedMunicipality,
            fullAddress: results[0].formatted_address
          });
        } else {
          resolve({ isValid: false, municipality: null });
        }
      });
    });
  };

  const handleSelect = async (event, newValue) => {
    if (!newValue) {
      setSelectedPlace(null);
      setErrorMessage('');
      onChange({ address: '', municipality: '', isValid: false });
      return;
    }

    const validation = await validateMunicipality(newValue.place_id);

    if (validation.isValid) {
      setSelectedPlace(newValue);
      setErrorMessage('');
      onChange({
        address: validation.fullAddress,
        municipality: validation.municipality,
        isValid: true,
        placeId: newValue.place_id
      });
    } else {
      setSelectedPlace(null);
      setErrorMessage(`Esta dirección no está en nuestras zonas de servicio`);
      onChange({ address: '', municipality: '', isValid: false });
    }
  };

  if (loadError) {
    return (
      <TextField
        fullWidth
        size="small"
        label="Dirección del Evento"
        error
        helperText="Error al cargar Google Maps. Usa el selector de ubicación."
        disabled
      />
    );
  }

  if (!isLoaded) {
    return (
      <TextField
        fullWidth
        size="small"
        label="Dirección del Evento"
        placeholder="Cargando..."
        disabled
      />
    );
  }

  return (
    <Box>
      <Autocomplete
        fullWidth
        options={predictions}
        getOptionLabel={(option) => option.description || ''}
        filterOptions={(x) => x} // Disable built-in filtering
        value={selectedPlace}
        onChange={handleSelect}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        noOptionsText={
          inputValue.length < 3
            ? 'Escribe al menos 3 caracteres'
            : 'No se encontraron direcciones. Intenta con otro nombre de calle.'
        }
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Dirección del Evento"
            placeholder="Calle, número, colonia..."
            error={error || !!errorMessage}
            helperText={helperText}
            required
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <LocationOnIcon fontSize="small" className="mr-2 text-gray-400" />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Box className="flex items-start gap-2 py-1">
              <LocationOnIcon fontSize="small" className="text-gray-400 mt-0.5" />
              <Box>
                <Typography variant="body2">
                  {option.structured_formatting?.main_text || option.description}
                </Typography>
                <Typography variant="caption" className="text-gray-600">
                  {option.structured_formatting?.secondary_text || ''}
                </Typography>
              </Box>
            </Box>
          </li>
        )}
      />

      {/* Error Alert - Beautiful warning message */}
      <Collapse in={!!errorMessage}>
        <Alert
          severity="error"
          sx={{ mt: 2 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setErrorMessage('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography variant="body2" className="font-semibold">
            {errorMessage}
          </Typography>
          <Typography variant="caption" className="block mt-1">
            📍 Zonas disponibles: {validMunicipalities.join(', ')}
          </Typography>
        </Alert>
      </Collapse>

      {selectedPlace && (
        <Box className="mt-2 flex gap-2 flex-wrap">
          <Chip
            label={`📍 ${value.municipality}`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label="Flete: $500"
            size="small"
            color="success"
          />
        </Box>
      )}

      <Typography variant="caption" className="text-gray-600 block mt-1">
        💡 Escribe cualquier calle de: {validMunicipalities.join(', ')}
      </Typography>
    </Box>
  );
};

export default AddressAutocomplete;
