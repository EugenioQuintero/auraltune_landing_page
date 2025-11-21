import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Card,
  CardContent,
  Alert,
  Box,
  Divider,
  Chip,
  Stack,
  Grid,
  Avatar,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TvIcon from '@mui/icons-material/Tv';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DeckIcon from '@mui/icons-material/Deck';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddressAutocomplete from './AddressAutocomplete';
import { additionalCosts } from './assets';
import {
  calculatePackageTotal,
  getFormattedBreakdown,
  validatePackage,
  formatPrice
} from '../utils/pricingUtils';

const QuoteSummary = ({
  attendees,
  packageSelections,
  contactInfo,
  setContactInfo,
  onSubmit,
  onBack
}) => {
  const [addressData, setAddressData] = useState(contactInfo?.addressData || { address: '', municipality: '', isValid: false });
  const [eventDate, setEventDate] = useState(contactInfo?.eventDate || '');
  const [startTime, setStartTime] = useState(contactInfo?.startTime || '');
  const [endTime, setEndTime] = useState(contactInfo?.endTime || '');
  const [eventType, setEventType] = useState(contactInfo?.eventType || 'interior');
  const [hasSecondFloor, setHasSecondFloor] = useState(contactInfo?.hasSecondFloor || false);
  const [name, setName] = useState(contactInfo?.name || '');
  const [email, setEmail] = useState(contactInfo?.email || '');
  const [phone, setPhone] = useState(contactInfo?.phone || '');
  const [errors, setErrors] = useState({});
  const [pricing, setPricing] = useState(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [formError, setFormError] = useState('');

  const validLocations = additionalCosts.flete.validLocations;

  // Horarios de inicio del evento (2:00 PM - 10:00 PM)
  const startTimeOptions = [
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  // Horarios de fin del evento (10:00 PM - 3:00 AM)
  const endTimeOptions = [
    '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
    '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM',
    '2:00 AM', '2:30 AM', '3:00 AM'
  ];

  // Calculate pricing whenever selections or location/floor/time changes
  useEffect(() => {
    if (packageSelections) {
      const packageData = {
        ...packageSelections,
        location: addressData.municipality,
        hasSecondFloor,
        attendees,
        startTime,
        endTime
      };

      const calculated = calculatePackageTotal(packageData);
      setPricing(calculated);
    }
  }, [packageSelections, addressData.municipality, hasSecondFloor, attendees, startTime, endTime]);

  // Update parent contact info
  useEffect(() => {
    if (setContactInfo) {
      setContactInfo({
        name,
        email,
        phone,
        eventDate,
        startTime,
        endTime,
        eventType,
        addressData,
        location: addressData.municipality, // For LiveTotalSidebar
        hasSecondFloor
      });
    }
  }, [name, email, phone, eventDate, startTime, endTime, eventType, addressData, hasSecondFloor]);

  // Email validation helper
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Phone formatting helpers
  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');

    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);

    // Format based on length
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 6) {
      // Mexican format: XXX XXX
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    } else {
      // Mexican/US format: XXX XXX XXXX
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);

    // Clear error if phone is now valid
    if (formatted.replace(/\D/g, '').length === 10) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error if email is now valid
    if (isValidEmail(value)) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (email && !isValidEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Ingresa un correo completo (ej: nombre@ejemplo.com)' }));
    }
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly && digitsOnly.length < 10) {
      setErrors(prev => ({ ...prev, phone: 'El teléfono debe tener 10 dígitos' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Requerido';
    }

    if (!email || !isValidEmail(email)) {
      newErrors.email = 'Ingresa un correo válido completo';
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone || digitsOnly.length !== 10) {
      newErrors.phone = 'Teléfono debe tener 10 dígitos';
    }

    if (!eventDate) {
      newErrors.eventDate = 'Requerido';
    }

    if (!startTime) {
      newErrors.startTime = 'Requerido';
    }

    if (!endTime) {
      newErrors.endTime = 'Requerido';
    }

    if (!addressData.isValid || !addressData.municipality) {
      newErrors.address = 'Dirección válida requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    // Clear previous errors
    setFormError('');

    if (!validateForm()) {
      setFormError('Por favor completa todos los campos correctamente');
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validate event duration (minimum 3 hours)
    if (pricing?.eventInfo?.duration < 3) {
      setFormError('La duración del evento debe ser de al menos 3 horas. Por favor ajusta el horario.');
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validate package
    const packageData = {
      ...packageSelections,
      location: addressData.municipality,
      hasSecondFloor,
      attendees
    };

    const validation = validatePackage(packageData);
    if (!validation.isValid) {
      setFormError(validation.errors.join('. '));
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Submit
    if (onSubmit) {
      onSubmit({
        customerInfo: {
          name,
          email,
          phone,
          eventDate,
          startTime,
          endTime,
          eventType,
          address: addressData.address
        },
        packageData,
        pricing
      });
    }
  };

  const breakdown = pricing ? getFormattedBreakdown(pricing) : [];

  // Count equipment items for summary
  const equipmentCount = [
    packageSelections?.audio ? 1 : 0,
    packageSelections?.screen?.basePrice > 0 ? 1 : 0,
    packageSelections?.danceFloor ? 1 : 0,
    (packageSelections?.lighting?.length || 0),
    (packageSelections?.lasers?.length || 0),
    (packageSelections?.effects?.length || 0),
  ].reduce((a, b) => a + b, 0);

  return (
    <Box className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Error Alert - Beautiful warning message */}
      <Collapse in={!!formError}>
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setFormError('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography variant="body1" className="font-semibold">
            ⚠️ {formError}
          </Typography>
          <Typography variant="caption" className="block mt-1">
            Revisa los campos marcados en rojo y completa la información faltante.
          </Typography>
        </Alert>
      </Collapse>

      {/* Header */}
      <Box className="text-center mb-8">
        <Typography variant="h4" className="font-bold text-gray-800 mb-2">
          Resumen de Cotización
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          Revisa tu selección y completa tus datos
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Contact & Event Info */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            {/* Contact Form */}
            <Card elevation={2}>
              <CardContent>
                <Box className="flex items-center gap-2 mb-4">
                  <Avatar sx={{ bgcolor: '#2563eb', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="h6" className="font-bold">
                    Tus Datos
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    InputProps={{
                      startAdornment: <PersonIcon fontSize="small" className="mr-2 text-gray-400" />
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    error={!!errors.email}
                    helperText={errors.email || (emailTouched && email && !isValidEmail(email) ? 'Correo incompleto' : 'ej: nombre@ejemplo.com')}
                    required
                    InputProps={{
                      startAdornment: <EmailIcon fontSize="small" className="mr-2 text-gray-400" />
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Teléfono"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    error={!!errors.phone}
                    helperText={errors.phone || 'ej: 812 345 6789 (10 dígitos)'}
                    placeholder="812 345 6789"
                    required
                    inputProps={{
                      inputMode: 'numeric'
                    }}
                    InputProps={{
                      startAdornment: <PhoneIcon fontSize="small" className="mr-2 text-gray-400" />
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>

            {/* Event Info */}
            <Card elevation={2}>
              <CardContent>
                <Box className="flex items-center gap-2 mb-4">
                  <Avatar sx={{ bgcolor: '#7c3aed', width: 32, height: 32 }}>
                    <CalendarTodayIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="h6" className="font-bold">
                    Tu Evento
                  </Typography>
                </Box>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    size="medium"
                    label="Fecha del Evento"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.eventDate}
                    helperText={errors.eventDate}
                    required
                    InputProps={{
                      startAdornment: <CalendarTodayIcon fontSize="small" className="mr-2 text-gray-400" />
                    }}
                  />

                  {/* Horarios del evento */}
                  <Box>
                    <Typography variant="body2" className="text-gray-700 mb-3 font-medium">
                      ⏰ Horario del evento
                    </Typography>
                    <Stack spacing={2.5}>
                      <FormControl fullWidth size="medium" error={!!errors.startTime} required>
                        <InputLabel>Hora de inicio</InputLabel>
                        <Select
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          label="Hora de inicio"
                          startAdornment={<AccessTimeIcon fontSize="small" className="mr-2 text-gray-400" />}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 250
                              }
                            }
                          }}
                        >
                          <MenuItem value="" disabled>
                            <em>Selecciona hora</em>
                          </MenuItem>
                          {startTimeOptions.map((time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.startTime && (
                          <Typography variant="caption" className="text-red-600 ml-3 mt-1">
                            {errors.startTime}
                          </Typography>
                        )}
                      </FormControl>

                      <FormControl fullWidth size="medium" error={!!errors.endTime} required>
                        <InputLabel>Hora de fin</InputLabel>
                        <Select
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          label="Hora de fin"
                          startAdornment={<AccessTimeIcon fontSize="small" className="mr-2 text-gray-400" />}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 250
                              }
                            }
                          }}
                        >
                          <MenuItem value="" disabled>
                            <em>Selecciona hora</em>
                          </MenuItem>
                          {endTimeOptions.map((time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.endTime && (
                          <Typography variant="caption" className="text-red-600 ml-3 mt-1">
                            {errors.endTime}
                          </Typography>
                        )}
                      </FormControl>
                    </Stack>

                    {/* Event Duration Info */}
                    {startTime && endTime && pricing?.eventInfo && (
                      <Box className={`mt-2 p-2 rounded-lg border ${
                        pricing.eventInfo.duration < 3
                          ? 'bg-red-50 border-red-300'
                          : 'bg-blue-50 border-blue-200'
                      }`}>
                        <Typography variant="caption" className={
                          pricing.eventInfo.duration < 3 ? 'text-red-900' : 'text-blue-900'
                        } sx={{ display: 'block' }}>
                          ⏱️ <strong>Duración:</strong> {pricing.eventInfo.duration.toFixed(1)} horas
                          {' • '}
                          <strong>Incluidas:</strong> {pricing.eventInfo.includedHours} horas
                        </Typography>

                        {pricing.eventInfo.duration < 3 && (
                          <Typography variant="caption" className="text-red-700 block mt-1 font-semibold">
                            ❌ <strong>Duración mínima requerida: 3 horas</strong>
                            <br />
                            <span className="text-xs">
                              Por favor ajusta el horario para que el evento dure al menos 3 horas.
                            </span>
                          </Typography>
                        )}

                        {pricing.breakdown.overtime > 0 && pricing.eventInfo.duration >= 3 && (
                          <Typography variant="caption" className="text-orange-700 block mt-1">
                            ⚠️ <strong>Horas extra:</strong> {pricing.breakdown.overtimeDetails.hours.toFixed(1)}h
                            {' • '}
                            <strong>Costo:</strong> {formatPrice(pricing.breakdown.overtime)}
                            <br />
                            <span className="text-xs">
                              (Equipo: {formatPrice(pricing.breakdown.overtimeDetails.equipmentCost)}
                              {pricing.breakdown.overtimeDetails.djCost > 0 &&
                                ` | DJ: ${formatPrice(pricing.breakdown.overtimeDetails.djCost)}`}
                              )
                            </span>
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Box>

                  {/* Tipo de evento: Interior/Exterior */}
                  <Box>
                    <Typography variant="body2" className="text-gray-700 mb-3 font-medium">
                      🏠 Tipo de evento
                    </Typography>
                    <ToggleButtonGroup
                      value={eventType}
                      exclusive
                      onChange={(e, newValue) => {
                        if (newValue !== null) {
                          setEventType(newValue);
                        }
                      }}
                      fullWidth
                      size="large"
                      sx={{
                        '& .MuiToggleButton-root': {
                          py: 1.5,
                          fontSize: '1rem'
                        }
                      }}
                    >
                      <ToggleButton value="interior" sx={{ textTransform: 'none' }}>
                        <HomeIcon className="mr-2" />
                        Interior
                      </ToggleButton>
                      <ToggleButton value="exterior" sx={{ textTransform: 'none' }}>
                        <DeckIcon className="mr-2" />
                        Exterior
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  <AddressAutocomplete
                    value={addressData}
                    onChange={setAddressData}
                    error={!!errors.address}
                    helperText={errors.address}
                    validMunicipalities={validLocations}
                  />

                  <Box className="p-3 bg-blue-50 rounded-lg">
                    <Typography variant="body2" className="font-semibold text-blue-900">
                      👥 {attendees} invitados
                    </Typography>
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasSecondFloor}
                        onChange={(e) => setHasSecondFloor(e.target.checked)}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        2º piso sin elevador <span className="text-orange-600 font-semibold">(+$1,000)</span>
                      </Typography>
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column - Package & Pricing */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            {/* Package Summary */}
            <Card elevation={2}>
              <CardContent>
                <Box className="flex items-center justify-between mb-3">
                  <Box className="flex items-center gap-2">
                    <Avatar sx={{ bgcolor: '#059669', width: 32, height: 32 }}>
                      <Typography variant="subtitle2" className="font-bold">
                        {equipmentCount}
                      </Typography>
                    </Avatar>
                    <Typography variant="h6" className="font-bold">
                      Tu Paquete
                    </Typography>
                  </Box>
                </Box>

                <Stack spacing={1.5}>
                  {/* Audio */}
                  {packageSelections?.audio && (
                    <Box className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                      <Box className="flex items-center gap-2">
                        <MusicNoteIcon className="text-blue-600" fontSize="small" />
                        <Box>
                          <Typography variant="body2" className="font-semibold">
                            {packageSelections.audio.title}
                          </Typography>
                          <Typography variant="caption" className="text-gray-600">
                            {packageSelections.audio.equipment}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={packageSelections.audio.priceDisplay}
                        size="small"
                        sx={{ bgcolor: '#2563eb', color: 'white', fontWeight: 'bold' }}
                      />
                    </Box>
                  )}

                  {/* Screen */}
                  {packageSelections?.screen && packageSelections.screen.basePrice > 0 && (
                    <Box className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                      <Box className="flex items-center gap-2">
                        <TvIcon className="text-purple-600" fontSize="small" />
                        <Box>
                          <Typography variant="body2" className="font-semibold">
                            {packageSelections.screen.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={packageSelections.screen.priceDisplay}
                        size="small"
                        sx={{ bgcolor: '#7c3aed', color: 'white', fontWeight: 'bold' }}
                      />
                    </Box>
                  )}

                  {/* Dance Floor */}
                  {packageSelections?.danceFloor && (
                    <Box className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                      <Box className="flex items-center gap-2">
                        <Typography className="text-amber-600" fontSize="small">💃</Typography>
                        <Box>
                          <Typography variant="body2" className="font-semibold">
                            {packageSelections.danceFloor.title}
                          </Typography>
                          <Typography variant="caption" className="text-gray-600">
                            {packageSelections.danceFloor.dimensions}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={packageSelections.danceFloor.priceDisplay}
                        size="small"
                        sx={{ bgcolor: '#f59e0b', color: 'white', fontWeight: 'bold' }}
                      />
                    </Box>
                  )}

                  {/* Lighting & Lasers Accordion */}
                  {((packageSelections?.lighting && packageSelections.lighting.length > 0) ||
                    (packageSelections?.lasers && packageSelections.lasers.length > 0)) && (
                    <Accordion elevation={0} sx={{ bgcolor: '#eef2ff', '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box className="flex items-center gap-2">
                          <LightbulbIcon className="text-indigo-600" fontSize="small" />
                          <Typography variant="body2" className="font-semibold">
                            Iluminación ({(packageSelections?.lighting?.length || 0) + (packageSelections?.lasers?.length || 0)} items)
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={0.5}>
                          {packageSelections?.lighting?.map(({ item, quantity }) => (
                            <Typography key={item.id} variant="caption" className="text-gray-700">
                              • {item.name} x{quantity}
                            </Typography>
                          ))}
                          {packageSelections?.lasers?.map(({ item, quantity }) => (
                            <Typography key={item.id} variant="caption" className="text-purple-700">
                              ⚡ {item.name} x{quantity}
                            </Typography>
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  )}

                  {/* Effects */}
                  {packageSelections?.effects && packageSelections.effects.length > 0 && (
                    <Accordion elevation={0} sx={{ bgcolor: '#f3f4f6', '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box className="flex items-center gap-2">
                          <Typography fontSize="small">🌫️</Typography>
                          <Typography variant="body2" className="font-semibold">
                            Efectos ({packageSelections.effects.length})
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={0.5}>
                          {packageSelections.effects.map(({ item, quantity }) => (
                            <Typography key={item.id} variant="caption" className="text-gray-700">
                              • {item.name} x{quantity}
                            </Typography>
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  )}

                  {/* Staff */}
                  {packageSelections?.staff && packageSelections.staff.length > 0 && (
                    <Accordion elevation={0} sx={{ bgcolor: '#f0fdf4', '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box className="flex items-center gap-2">
                          <GroupIcon className="text-green-600" fontSize="small" />
                          <Typography variant="body2" className="font-semibold">
                            Staff ({packageSelections.staff.length})
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={0.5}>
                          {packageSelections.staff.map((service) => (
                            <Typography key={service.id} variant="caption" className="text-gray-700">
                              • {service.name} ({service.duration})
                            </Typography>
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </Stack>
              </CardContent>
            </Card>

          </Stack>
        </Grid>
      </Grid>

      {/* Navigation Buttons */}
      <Box className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
        >
          ← Atrás
        </button>

        <button
          onClick={handleSubmit}
          disabled={pricing?.eventInfo?.duration < 3}
          className={`px-8 py-3 text-lg font-bold rounded-lg transition-all ${
            pricing?.eventInfo?.duration < 3
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
          }`}
        >
          Solicitar Cotización 📧
        </button>
      </Box>
    </Box>
  );
};

export default QuoteSummary;
