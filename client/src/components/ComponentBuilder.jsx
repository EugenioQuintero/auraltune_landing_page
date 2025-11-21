import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  Paper,
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControl,
  FormControlLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TvIcon from '@mui/icons-material/Tv';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CloudIcon from '@mui/icons-material/Cloud';
import {
  audioPackages,
  ledScreens,
  danceFloors,
  lighting,
  lightingAccessories,
  specialEffects,
  getRecommendedAudio,
  getRecommendedDanceFloor,
  getRecommendedLighting
} from './assets';
import { formatPrice } from '../utils/pricingUtils';
import Image from './Image';

const ComponentBuilder = ({
  attendees,
  selections,
  onSelectionsChange,
  onNext,
  onBack
}) => {
  // Initialize state from props or defaults
  const [selectedAudio, setSelectedAudio] = useState(selections?.audio || null);
  const [selectedScreen, setSelectedScreen] = useState(selections?.screen || null);
  const [selectedDanceFloor, setSelectedDanceFloor] = useState(selections?.danceFloor || null);
  const [lightingItems, setLightingItems] = useState(selections?.lighting || []);
  const [laserItems, setLaserItems] = useState(selections?.lasers || []);
  const [effectsItems, setEffectsItems] = useState(selections?.effects || []);

  // Control which accordions are expanded
  const [expandedAccordions, setExpandedAccordions] = useState({
    audio: true,
    screen: true,
    danceFloor: true,
    lighting: false,
    effects: false
  });

  // Get recommendations
  const recommendedAudio = getRecommendedAudio(attendees);
  const recommendedFloor = getRecommendedDanceFloor(attendees);
  const recommendedLighting = getRecommendedLighting(attendees);

  // Sort arrays to show recommendations first
  const sortedAudioPackages = useMemo(() => {
    const recommended = getRecommendedAudio(attendees);
    return [
      recommended,
      ...audioPackages.filter(pkg => pkg.id !== recommended.id)
    ];
  }, [attendees]);

  const sortedDanceFloors = useMemo(() => {
    const recommended = getRecommendedDanceFloor(attendees);
    return [
      recommended,
      ...danceFloors.filter(floor => floor.id !== recommended.id)
    ];
  }, [attendees]);

  // Update parent whenever selections change
  useEffect(() => {
    if (onSelectionsChange) {
      onSelectionsChange({
        audio: selectedAudio,
        screen: selectedScreen,
        danceFloor: selectedDanceFloor,
        lighting: lightingItems,
        lasers: laserItems,
        effects: effectsItems
      });
    }
  }, [selectedAudio, selectedScreen, selectedDanceFloor, lightingItems, laserItems, effectsItems]);

  // Auto-close all accordions after inactivity (20 seconds)
  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Close accordions that don't have selections after 20 seconds of no interaction
        setExpandedAccordions(prev => ({
          audio: selectedAudio ? prev.audio : false,
          screen: selectedScreen ? prev.screen : false,
          danceFloor: selectedDanceFloor ? prev.danceFloor : false,
          lighting: lightingItems.length > 0 ? prev.lighting : false,
          effects: effectsItems.length > 0 ? prev.effects : false
        }));
      }, 20000); // 20 seconds
    };

    // Events that indicate user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'touchstart', 'click'];

    activityEvents.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer(); // Start the timer

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [selectedAudio, selectedScreen, selectedDanceFloor, lightingItems.length, effectsItems.length]);

  // Quantity handlers for lighting
  const getLightingQuantity = (itemId) => {
    const found = lightingItems.find(li => li.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const updateLightingQuantity = (lightItem, newQuantity) => {
    setLightingItems(prev => {
      const filtered = prev.filter(li => li.item.id !== lightItem.id);
      if (newQuantity > 0) {
        return [...filtered, { item: lightItem, quantity: Math.min(newQuantity, lightItem.maxQuantity) }];
      }
      return filtered;
    });
  };

  // Quantity handlers for effects
  const getEffectQuantity = (itemId) => {
    const found = effectsItems.find(ei => ei.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const updateEffectQuantity = (effectItem, newQuantity) => {
    setEffectsItems(prev => {
      const filtered = prev.filter(ei => ei.item.id !== effectItem.id);
      if (newQuantity > 0) {
        return [...filtered, { item: effectItem, quantity: Math.min(newQuantity, effectItem.maxQuantity) }];
      }
      return filtered;
    });
  };

  // Quantity handlers for lasers
  const getLaserQuantity = (itemId) => {
    const found = laserItems.find(li => li.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const updateLaserQuantity = (laserItem, newQuantity) => {
    setLaserItems(prev => {
      const filtered = prev.filter(li => li.item.id !== laserItem.id);
      if (newQuantity > 0) {
        return [...filtered, { item: laserItem, quantity: Math.min(newQuantity, laserItem.maxQuantity) }];
      }
      return filtered;
    });
  };

  const handleContinue = () => {
    // Check if at least one main equipment is selected (not just effects)
    const hasMainEquipment = selectedAudio ||
                             selectedScreen?.basePrice > 0 ||
                             selectedDanceFloor ||
                             lightingItems.length > 0 ||
                             laserItems.length > 0;

    const hasOnlyEffects = !hasMainEquipment && effectsItems.length > 0;

    if (hasOnlyEffects) {
      alert('Las máquinas de humo solo se pueden agregar junto con otro equipo (audio, pantallas, iluminación, etc.)');
      return;
    }

    if (!hasMainEquipment && effectsItems.length === 0) {
      alert('Por favor selecciona al menos un equipo (audio, pantallas, iluminación, pista, etc.)');
      return;
    }

    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-800 mb-2">
          Arma tu Paquete
        </Typography>
        <Typography variant="body1" className="text-gray-600 mb-4">
          Para {attendees} invitados - Personaliza cada componente según tu visión
        </Typography>
      </div>

      <div className="space-y-4">
        {/* ===== AUDIO SECTION ===== */}
        <Accordion
          expanded={expandedAccordions.audio}
          onChange={() => setExpandedAccordions(prev => ({ ...prev, audio: !prev.audio }))}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-blue-50">
            <div className="flex items-center gap-3 w-full">
              <VolumeUpIcon sx={{ fontSize: 40, color: '#1e40af' }} />
              <div className="flex-1">
                <Typography variant="h6" className="font-bold text-blue-900">
                  Audio Premium
                </Typography>
                <Typography variant="caption" className="text-blue-700">
                  Selecciona el sistema de audio ideal para tu evento
                </Typography>
              </div>
              {selectedAudio && (
                <Chip
                  label={selectedAudio.priceDisplay}
                  color="primary"
                  size="small"
                  icon={<CheckCircleIcon />}
                />
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sortedAudioPackages.map((audio) => {
                    const isRecommended = audio.id === recommendedAudio.id;
                    return (
                      <Paper
                        key={audio.id}
                        elevation={selectedAudio?.id === audio.id ? 8 : 2}
                        className={`p-4 cursor-pointer transition-all relative ${
                          selectedAudio?.id === audio.id
                            ? 'ring-4 ring-blue-600 bg-blue-50 shadow-2xl scale-105'
                            : 'hover:shadow-md hover:scale-102'
                        } ${isRecommended ? 'border-2 border-amber-400' : ''}`}
                        onClick={() => {
                          // Si ya está seleccionado, deseleccionar
                          if (selectedAudio?.id === audio.id) {
                            setSelectedAudio(null);
                          } else {
                            setSelectedAudio(audio);
                            // Auto-close accordion after selection
                            setExpandedAccordions(prev => ({ ...prev, audio: false }));
                          }
                        }}
                      >
                        {selectedAudio?.id === audio.id && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                            <CheckCircleIcon fontSize="large" />
                          </div>
                        )}
                        <div className="w-full">
                          {isRecommended && (
                            <Chip
                              label="Recomendado"
                              size="small"
                              color="warning"
                              className="mb-2"
                            />
                          )}
                          {audio.image && (
                            <div className="mb-3 rounded-lg overflow-hidden">
                              <Image
                                publicId={audio.image}
                                width={400}
                                height={250}
                                alt={audio.title}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          )}
                          <Typography variant="subtitle1" className="font-bold">
                            {audio.title}
                          </Typography>
                          <Typography variant="caption" className="text-gray-600 block mb-1">
                            {audio.attendeeRange.min}-{audio.attendeeRange.max} personas
                          </Typography>
                          <Typography variant="body2" className="text-gray-700 text-sm mb-2">
                            {audio.equipment}
                          </Typography>
                          <Typography variant="h6" className="font-bold text-blue-600">
                            {audio.priceDisplay}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            {audio.duration}
                          </Typography>
                        </div>
                      </Paper>
                    );
                  })}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* ===== PANTALLAS LED / DJ BOOTH SECTION ===== */}
        <Accordion
          expanded={expandedAccordions.screen}
          onChange={() => setExpandedAccordions(prev => ({ ...prev, screen: !prev.screen }))}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-purple-50">
            <div className="flex items-center gap-3 w-full">
              <TvIcon sx={{ fontSize: 40, color: '#7e22ce' }} />
              <div className="flex-1">
                <Typography variant="h6" className="font-bold text-purple-900">
                  Pantallas LED / DJ Booth
                </Typography>
                <Typography variant="caption" className="text-purple-700">
                  Elige tu configuración visual
                </Typography>
              </div>
              {selectedScreen && selectedScreen.basePrice > 0 && (
                <Chip
                  label={selectedScreen.priceDisplay}
                  sx={{ bgcolor: '#9333ea', color: 'white' }}
                  size="small"
                  icon={<CheckCircleIcon />}
                />
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ledScreens.map((screen) => (
                    <Paper
                      key={screen.id}
                      elevation={selectedScreen?.id === screen.id ? 8 : 2}
                      className={`p-4 cursor-pointer transition-all relative ${
                        selectedScreen?.id === screen.id
                          ? 'ring-4 ring-purple-600 bg-purple-50 shadow-2xl scale-105'
                          : 'hover:shadow-md hover:scale-102'
                      }`}
                      onClick={() => {
                        // Si ya está seleccionado, deseleccionar
                        if (selectedScreen?.id === screen.id) {
                          setSelectedScreen(null);
                        } else {
                          setSelectedScreen(screen);
                          // Auto-close accordion after selection
                          setExpandedAccordions(prev => ({ ...prev, screen: false }));
                        }
                      }}
                    >
                      {selectedScreen?.id === screen.id && (
                        <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1">
                          <CheckCircleIcon fontSize="large" />
                        </div>
                      )}
                      <div className="w-full">
                        {screen.image && (
                          <div className="mb-3 rounded-lg overflow-hidden">
                            <Image
                              publicId={screen.image}
                              width={400}
                              height={250}
                              alt={screen.title}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                        <Typography variant="subtitle1" className="font-bold">
                          {screen.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 text-sm mb-2">
                          {screen.description}
                        </Typography>
                        {screen.dimensions && (
                          <Typography variant="caption" className="text-gray-600 block mb-1">
                            📐 {screen.dimensions}
                          </Typography>
                        )}
                        <Typography variant="h6" className={`font-bold ${screen.basePrice === 0 ? 'text-green-600' : 'text-purple-600'}`}>
                          {screen.priceDisplay}
                        </Typography>
                        {screen.note && (
                          <Alert severity="info" className="mt-2 text-xs">
                            {screen.note}
                          </Alert>
                        )}
                      </div>
                    </Paper>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* ===== PISTA DE BAILE SECTION ===== */}
        <Accordion
          expanded={expandedAccordions.danceFloor}
          onChange={() => setExpandedAccordions(prev => ({ ...prev, danceFloor: !prev.danceFloor }))}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-amber-50">
            <div className="flex items-center gap-3 w-full">
              <CelebrationIcon sx={{ fontSize: 40, color: '#b45309' }} />
              <div className="flex-1">
                <Typography variant="h6" className="font-bold text-amber-900">
                  Pista de Baile Infinity Gold
                </Typography>
                <Typography variant="caption" className="text-amber-700">
                  Pista LED con efectos infinitos personalizables
                </Typography>
              </div>
              {selectedDanceFloor && (
                <Chip
                  label={selectedDanceFloor.priceDisplay}
                  sx={{ bgcolor: '#f59e0b', color: 'white' }}
                  size="small"
                  icon={<CheckCircleIcon />}
                />
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="space-y-4">
              {/* Visual Preview Card */}
              <Paper elevation={3} className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50">
                <div className="flex items-center gap-4 mb-4">
                  <CelebrationIcon sx={{ fontSize: 60, color: '#b45309' }} />
                  <div className="flex-1">
                    <Typography variant="h6" className="font-bold text-amber-900">
                      Pista de Baile Infinity Gold
                    </Typography>
                    <Typography variant="body2" className="text-amber-700">
                      Con colores personalizados y su brillante acabado oro
                    </Typography>
                  </div>
                </div>

                {/* Dance Floor Image */}
                {danceFloors[0]?.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <Image
                      publicId={danceFloors[0].image}
                      width={600}
                      height={350}
                      alt="Pista de Baile Infinity Gold"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Size Selector */}
                <FormControl fullWidth className="mb-4">
                  <InputLabel id="dance-floor-size-label">Selecciona el Tamaño</InputLabel>
                  <Select
                    labelId="dance-floor-size-label"
                    value={selectedDanceFloor?.id || ''}
                    label="Selecciona el Tamaño"
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setSelectedDanceFloor(null);
                      } else {
                        const floor = danceFloors.find(f => f.id === e.target.value);
                        setSelectedDanceFloor(floor);
                        // Auto-close accordion after selection
                        setExpandedAccordions(prev => ({ ...prev, danceFloor: false }));
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>No incluir pista de baile</em>
                    </MenuItem>
                    {sortedDanceFloors.map((floor) => {
                      const isRecommended = floor.id === recommendedFloor.id;
                      return (
                        <MenuItem key={floor.id} value={floor.id}>
                          <div className="flex items-center justify-between w-full py-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{floor.modules} Módulos</span>
                              <span className="text-gray-600 text-sm">({floor.dimensions})</span>
                              {isRecommended && (
                                <Chip label="Recomendado" size="small" color="primary" />
                              )}
                            </div>
                            <span className="font-bold text-amber-600 ml-4">{floor.priceDisplay}</span>
                          </div>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {/* Selected Floor Info */}
                {selectedDanceFloor && (
                  <div className="bg-white rounded-lg p-4 border-4 border-amber-500 shadow-xl relative">
                    <div className="absolute -top-3 -right-3 bg-amber-600 text-white rounded-full p-2 shadow-lg">
                      <CheckCircleIcon fontSize="large" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Typography variant="caption" className="text-gray-600 block">
                          Dimensiones
                        </Typography>
                        <Typography variant="body1" className="font-bold text-gray-900">
                          📐 {selectedDanceFloor.dimensions}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-600 block">
                          Capacidad
                        </Typography>
                        <Typography variant="body1" className="font-bold text-gray-900">
                          👥 Ideal para {selectedDanceFloor.attendeeCapacity} personas bailando
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-600 block">
                          Módulos
                        </Typography>
                        <Typography variant="body1" className="font-bold text-gray-900">
                          {selectedDanceFloor.modules} paneles LED
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption" className="text-gray-600 block">
                          Precio
                        </Typography>
                        <Typography variant="h6" className="font-bold text-amber-600">
                          {selectedDanceFloor.priceDisplay}
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}

                <Typography variant="caption" className="text-gray-500 mt-3 block text-center">
                  💡 Calculada para que 30-40% de tus invitados estén bailando al mismo tiempo
                </Typography>
              </Paper>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* ===== ILUMINACIÓN SECTION ===== */}
        <Accordion
          expanded={expandedAccordions.lighting}
          onChange={() => setExpandedAccordions(prev => ({ ...prev, lighting: !prev.lighting }))}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-indigo-50">
            <div className="flex items-center gap-3 w-full">
              <LightbulbIcon sx={{ fontSize: 40, color: '#4338ca' }} />
              <div className="flex-1">
                <Typography variant="h6" className="font-bold text-indigo-900">
                  Iluminación y Efectos
                </Typography>
                <Typography variant="caption" className="text-indigo-700">
                  Añade torres de iluminación y reflectores ambientales
                </Typography>
              </div>
              {lightingItems.length > 0 && (
                <Chip
                  label={`${lightingItems.reduce((sum, li) => sum + li.quantity, 0)} items`}
                  sx={{ bgcolor: '#6366f1', color: 'white' }}
                  size="small"
                />
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Alert severity="info" className="mb-4">
              💡 Recomendado para {attendees} invitados: {recommendedLighting.towers} torres, {recommendedLighting.parLeds} reflectores PAR LED
            </Alert>

            <div className="space-y-3">
              {lighting.map((lightItem) => {
                const quantity = getLightingQuantity(lightItem.id);
                return (
                  <Paper
                    key={lightItem.id}
                    elevation={quantity > 0 ? 8 : 2}
                    className={`p-4 transition-all relative ${
                      quantity > 0
                        ? 'ring-4 ring-indigo-600 bg-indigo-50 shadow-2xl'
                        : 'hover:shadow-md'
                    }`}
                  >
                    {quantity > 0 && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full px-3 py-1 font-bold shadow-lg">
                        ✓ {quantity}
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Image */}
                      {lightItem.image && (
                        <div className="md:w-48 flex-shrink-0">
                          <div className="rounded-lg overflow-hidden">
                            <Image
                              publicId={lightItem.image}
                              width={300}
                              height={200}
                              alt={lightItem.name}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {/* Content and Controls */}
                      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <Typography variant="subtitle1" className="font-bold">
                            {lightItem.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600 text-sm">
                            {lightItem.description}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            Mínimo recomendado: {lightItem.minimumRecommended}
                          </Typography>
                        </div>

                        <div className="flex items-center gap-3">
                        <Typography variant="h6" className="font-bold text-indigo-600 min-w-[80px]">
                          {lightItem.priceDisplay}
                        </Typography>

                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <IconButton
                            size="small"
                            onClick={() => updateLightingQuantity(lightItem, quantity - 1)}
                            disabled={quantity === 0}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>

                          <Typography variant="body1" className="min-w-[30px] text-center font-bold">
                            {quantity}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() => updateLightingQuantity(lightItem, quantity + 1)}
                            disabled={quantity >= lightItem.maxQuantity}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </div>

                        {quantity > 0 && (
                          <Typography variant="body2" className="text-green-600 font-bold min-w-[80px] text-right">
                            = {formatPrice(lightItem.basePrice * quantity)}
                          </Typography>
                        )}
                        </div>
                      </div>
                    </div>
                  </Paper>
                );
              })}
            </div>

            {/* Laser Accessories - Only show if torres are selected */}
            {getLightingQuantity('torre-beam-200') > 0 && (
              <div className="mt-6 pt-6 border-t-2 border-purple-200">
                <div className="mb-4">
                  <Typography variant="h6" className="font-bold text-purple-900 mb-1">
                    ⚡ Accesorios: Láseres
                  </Typography>
                  <Typography variant="body2" className="text-purple-700">
                    Agrega láseres a tus torres de iluminación
                  </Typography>
                </div>

                <div className="space-y-3">
                  {lightingAccessories.map((laserItem) => {
                    const quantity = getLaserQuantity(laserItem.id);
                    return (
                      <Paper
                        key={laserItem.id}
                        elevation={quantity > 0 ? 6 : 2}
                        className={`p-4 transition-all ${
                          quantity > 0
                            ? 'ring-2 ring-purple-600 bg-purple-50'
                            : 'hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <Typography variant="subtitle1" className="font-bold text-purple-900">
                              {laserItem.name}
                            </Typography>
                            <Typography variant="body2" className="text-purple-700 text-sm">
                              {laserItem.description}
                            </Typography>
                            <Typography variant="caption" className="text-purple-600">
                              Disponible: {laserItem.maxQuantity} {laserItem.maxQuantity === 1 ? 'unidad' : 'unidades'}
                            </Typography>
                          </div>

                          <div className="flex items-center gap-3">
                            <Typography variant="h6" className="font-bold text-purple-600 min-w-[80px]">
                              {laserItem.priceDisplay}
                            </Typography>

                            <div className="flex items-center gap-2 bg-purple-100 rounded-lg p-1">
                              <IconButton
                                size="small"
                                onClick={() => updateLaserQuantity(laserItem, quantity - 1)}
                                disabled={quantity === 0}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>

                              <Typography variant="body1" className="min-w-[30px] text-center font-bold">
                                {quantity}
                              </Typography>

                              <IconButton
                                size="small"
                                onClick={() => updateLaserQuantity(laserItem, quantity + 1)}
                                disabled={quantity >= laserItem.maxQuantity}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </div>

                            {quantity > 0 && (
                              <Typography variant="body2" className="text-green-600 font-bold min-w-[80px] text-right">
                                = {formatPrice(laserItem.basePrice * quantity)}
                              </Typography>
                            )}
                          </div>
                        </div>
                      </Paper>
                    );
                  })}
                </div>
              </div>
            )}
          </AccordionDetails>
        </Accordion>

        {/* ===== EFECTOS ESPECIALES SECTION ===== */}
        <Accordion
          expanded={expandedAccordions.effects}
          onChange={() => setExpandedAccordions(prev => ({ ...prev, effects: !prev.effects }))}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-50">
            <div className="flex items-center gap-3 w-full">
              <CloudIcon sx={{ fontSize: 40, color: '#374151' }} />
              <div className="flex-1">
                <Typography variant="h6" className="font-bold text-gray-900">
                  Efectos Especiales
                </Typography>
                <Typography variant="caption" className="text-gray-700">
                  Máquinas de humo y efectos atmosféricos
                </Typography>
              </div>
              {effectsItems.length > 0 && (
                <Chip
                  label={`${effectsItems.reduce((sum, ei) => sum + ei.quantity, 0)} items`}
                  color="default"
                  size="small"
                />
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="space-y-3">
              {specialEffects.map((effectItem) => {
                const quantity = getEffectQuantity(effectItem.id);
                return (
                  <Paper
                    key={effectItem.id}
                    elevation={quantity > 0 ? 8 : 2}
                    className={`p-4 transition-all relative ${
                      quantity > 0
                        ? 'ring-4 ring-gray-600 bg-gray-50 shadow-2xl'
                        : 'hover:shadow-md'
                    }`}
                  >
                    {quantity > 0 && (
                      <div className="absolute top-2 right-2 bg-gray-700 text-white rounded-full px-3 py-1 font-bold shadow-lg">
                        ✓ {quantity}
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Image */}
                      {effectItem.image && (
                        <div className="md:w-48 flex-shrink-0">
                          <div className="rounded-lg overflow-hidden">
                            <Image
                              publicId={effectItem.image}
                              width={300}
                              height={200}
                              alt={effectItem.name}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {/* Content and Controls */}
                      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <Typography variant="subtitle1" className="font-bold">
                            {effectItem.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600 text-sm">
                            {effectItem.description}
                          </Typography>
                          <Typography variant="caption" className="text-orange-600">
                            Máximo disponible: {effectItem.maxQuantity}
                          </Typography>
                        </div>

                        <div className="flex items-center gap-3">
                        <Typography variant="h6" className="font-bold text-gray-700 min-w-[80px]">
                          {effectItem.priceDisplay}
                        </Typography>

                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <IconButton
                            size="small"
                            onClick={() => updateEffectQuantity(effectItem, quantity - 1)}
                            disabled={quantity === 0}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>

                          <Typography variant="body1" className="min-w-[30px] text-center font-bold">
                            {quantity}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() => updateEffectQuantity(effectItem, quantity + 1)}
                            disabled={quantity >= effectItem.maxQuantity}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </div>

                        {quantity > 0 && (
                          <Typography variant="body2" className="text-green-600 font-bold min-w-[80px] text-right">
                            = {formatPrice(effectItem.basePrice * quantity)}
                          </Typography>
                        )}
                        </div>
                      </div>
                    </div>
                  </Paper>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
        >
          ← Atrás
        </button>

        <button
          onClick={handleContinue}
          disabled={
            !selectedAudio &&
            !(selectedScreen?.basePrice > 0) &&
            !selectedDanceFloor &&
            lightingItems.length === 0 &&
            laserItems.length === 0 &&
            effectsItems.length === 0
          }
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
        >
          Continuar a Staff y Servicios →
        </button>
      </div>
    </div>
  );
};

export default ComponentBuilder;
