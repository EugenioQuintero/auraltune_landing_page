// ============================================
// AURALTUNE CATALOG DATA STRUCTURE
// Based on Catálogo Producción Audiovisual 2025
// ============================================

// ============================================
// AUDIO PREMIUM PACKAGES
// ============================================
export const audioPackages = [
  {
    id: 'audio-intimo',
    title: 'Audio Íntimo',
    attendeeRange: { min: 0, max: 50 },
    equipment: '2 Bafles Harbinger Vari V3415',
    basePrice: 1800,
    priceDisplay: '$1,800',
    duration: '5 horas',
    image: 'auraltune/audio/a100',
    description: 'Sistema de audio compacto ideal para eventos íntimos hasta 50 personas'
  },
  {
    id: 'audio-chico',
    title: 'Audio Chico',
    attendeeRange: { min: 51, max: 80 },
    equipment: '2 Bafles Harbinger Vari V3415 + 1 Subwoofer VS18',
    basePrice: 3600,
    priceDisplay: '$3,600',
    duration: '5 horas',
    image: '20_jsal6o',
    description: 'Audio con refuerzo de graves para eventos de hasta 80 invitados'
  },
  {
    id: 'audio-mediano',
    title: 'Audio Mediano',
    attendeeRange: { min: 81, max: 150 },
    equipment: '2 BOSE L1 Pro16 + 2 Subwoofers VS18',
    basePrice: 7600,
    priceDisplay: '$7,600',
    duration: '5 horas',
    image: '27_leurl4',
    description: 'Sistema premium BOSE para cobertura clara en espacios medianos'
  },
  {
    id: 'audio-grande',
    title: 'Audio Grande',
    attendeeRange: { min: 151, max: 250 },
    equipment: '4 BOSE L1 Pro16 + 2 Subwoofers VS18',
    basePrice: 11600,
    priceDisplay: '$11,600',
    duration: '5 horas',
    image: '21_hnqnbz',
    description: 'Configuración ampliada para eventos grandes de hasta 250 personas'
  },
  {
    id: 'audio-festival',
    title: 'Audio Estilo Festival',
    attendeeRange: { min: 251, max: 500 },
    equipment: '6+ BOSE L1 Pro16 + 4 Subwoofers VS18',
    basePrice: 18000,
    priceDisplay: '$18,000',
    duration: '5 horas',
    image: '22_lmqzv8',
    description: 'Sistema de audio profesional para eventos masivos tipo festival'
  }
];

// ============================================
// AUDIO EQUIPMENT INDIVIDUAL
// ============================================
export const audioEquipment = [
  {
    id: 'bose-l1-pro16',
    name: 'Bose L1 Pro16',
    category: 'speaker',
    basePrice: 2000,
    priceDisplay: '$2,000',
    unit: 'c/u',
    description: 'Cobertura clara y pareja en espacios medianos a grandes',
    benefits: 'Marca premium reconocida mundialmente, sonido nítido con bajos envolvente',
    ideal: 'Bodas, eventos corporativos, fiestas de alto nivel',
    quantityAllowed: true,
    maxQuantity: 10
  },
  {
    id: 'harbinger-mls1000',
    name: 'Harbinger MLS1000',
    category: 'speaker',
    basePrice: 1500,
    priceDisplay: '$1,500',
    unit: 'c/u',
    description: 'Sistema compacto y versátil para eventos pequeños/medianos',
    benefits: 'Buena potencia, nitidez en sonido, look moderno y minimalista',
    ideal: 'Fiestas privadas, reuniones, antros pequeños',
    quantityAllowed: true,
    maxQuantity: 10
  },
  {
    id: 'harbinger-v3415',
    name: 'Bafle Harbinger V3415',
    category: 'speaker',
    basePrice: 900,
    priceDisplay: '$900',
    unit: 'c/u',
    description: 'Refuerzo de sonido directo y potente',
    benefits: 'Excelente para voces o música fuerte, adaptable a interiores/exteriores',
    ideal: 'Conferencias, DJ sets en espacios abiertos',
    quantityAllowed: true,
    maxQuantity: 10
  },
  {
    id: 'subwoofer-vs18',
    name: 'Subwoofer Harbinger VS18',
    category: 'subwoofer',
    basePrice: 1800,
    priceDisplay: '$1,800',
    unit: 'c/u',
    description: 'Dar graves potentes que se sienten en la pista',
    benefits: 'Mantiene la pista llena toda la noche, añade impacto físico al sonido',
    ideal: 'Fiestas grandes, bodas, eventos con música bailable',
    quantityAllowed: true,
    maxQuantity: 6
  }
];

// ============================================
// PANTALLAS LED Y DJ BOOTH
// ============================================
export const ledScreens = [
  {
    id: 'dj-booth-basico',
    title: 'DJ Booth Básico',
    description: 'Mesa DJ sin pantallas LED',
    basePrice: 0,
    priceDisplay: 'Sin costo',
    image: '23_ygc1b1',
    setup: 'Mesa básica para DJ'
  },
  {
    id: 'dj-booth-2x1',
    title: 'DJ Booth 2m x 1m',
    description: 'Pantalla LED frontal de 2 metros',
    basePrice: 3000,
    priceDisplay: '$3,000',
    dimensions: '2m x 1m',
    image: '24_ebnfmw',
    setup: 'DJ Booth con pantalla frontal'
  },
  {
    id: 'dj-booth-3x1',
    title: 'DJ Booth 3m x 1m',
    description: 'Pantalla LED frontal de 3 metros',
    basePrice: 4000,
    priceDisplay: '$4,000',
    dimensions: '3m x 1m',
    image: '24_ebnfmw',
    setup: 'DJ Booth con pantalla frontal más amplia'
  },
  {
    id: 'booth-pantalla-trasera',
    title: 'DJ Booth + Pantalla Trasera',
    description: 'DJ Booth (3m x 1m) + Pantalla Trasera (3m x 2m)',
    basePrice: 7500,
    priceDisplay: '$7,500',
    dimensions: 'Booth: 3m x 1m, Trasera: 3m x 2m',
    image: '25_avyyjy',
    setup: 'Setup completo con pantalla trasera de fondo'
  },
  {
    id: 'booth-completo',
    title: 'DJ Booth + Pantalla Trasera + Banners LED',
    description: 'Setup completo: Booth (3m x 1m) + Trasera (3m x 1m) + Banners (0.5m x 2m)',
    basePrice: 8000,
    priceDisplay: '$8,000',
    dimensions: 'Booth: 3m x 1m, Trasera: 3m x 1m, Banners: 0.5m x 2m',
    image: '26_er4cfd',
    setup: 'Setup inmersivo completo con banners laterales',
    note: 'Requiere conexión eléctrica 220V estable'
  }
];

// ============================================
// PISTA DE BAILE INFINITY GOLD
// ============================================
export const danceFloors = [
  {
    id: 'pista-9-modulos',
    title: 'Pista 9 Módulos',
    modules: 9,
    dimensions: '3.66m x 3.66m',
    attendeeCapacity: 60,
    basePrice: 6000,
    priceDisplay: '$6,000',
    image: 'auraltune/iluminacion/infinity',
    description: 'Pista Infinity Gold para 60 invitados bailando simultáneamente'
  },
  {
    id: 'pista-12-modulos',
    title: 'Pista 12 Módulos',
    modules: 12,
    dimensions: '3.66m x 4.88m',
    attendeeCapacity: 90,
    basePrice: 7000,
    priceDisplay: '$7,000',
    image: 'auraltune/iluminacion/infinity',
    description: 'Pista Infinity Gold para 90 invitados bailando simultáneamente'
  },
  {
    id: 'pista-16-modulos',
    title: 'Pista 16 Módulos',
    modules: 16,
    dimensions: '4.88m x 4.88m',
    attendeeCapacity: 120,
    basePrice: 8000,
    priceDisplay: '$8,000',
    image: 'auraltune/iluminacion/infinity',
    description: 'Pista Infinity Gold para 120 invitados bailando simultáneamente'
  },
  {
    id: 'pista-20-modulos',
    title: 'Pista 20 Módulos',
    modules: 20,
    dimensions: '4.88m x 6.10m',
    attendeeCapacity: 150,
    basePrice: 9000,
    priceDisplay: '$9,000',
    image: 'auraltune/iluminacion/infinity',
    description: 'Pista Infinity Gold para 150 invitados bailando simultáneamente'
  }
];

// ============================================
// ILUMINACIÓN Y EFECTOS
// ============================================
export const lighting = [
  {
    id: 'torre-beam-200',
    name: 'Torre 2m + Beam 200w',
    category: 'lighting-tower',
    basePrice: 800,
    priceDisplay: '$800',
    unit: 'c/u',
    minimumRecommended: 2,
    description: 'Torre de iluminación con cabeza beam 200w',
    image: 'auraltune/iluminacion/beams',
    quantityAllowed: true,
    maxQuantity: 6
  },
  {
    id: 'reflector-par-led',
    name: 'Reflectores PAR LED 30w',
    category: 'ambient-lighting',
    basePrice: 400,
    priceDisplay: '$400',
    unit: 'c/u',
    minimumRecommended: 2,
    description: 'Iluminación ambiental para espacios',
    image: 'auraltune/iluminacion/leds',
    quantityAllowed: true,
    maxQuantity: 3
  }
];

// ============================================
// ACCESORIOS DE ILUMINACIÓN (LÁSERES)
// ============================================
export const lightingAccessories = [
  {
    id: 'laser-3w',
    name: 'Láser 3w',
    basePrice: 400,
    priceDisplay: '$400',
    unit: 'c/u',
    maxQuantity: 6,
    description: 'Láser RGB 3w para efectos luminosos',
    quantityAllowed: true
  },
  {
    id: 'laser-5w',
    name: 'Láser 5w',
    basePrice: 500,
    priceDisplay: '$500',
    unit: 'c/u',
    maxQuantity: 1,
    description: 'Láser RGB de alta potencia 5w',
    quantityAllowed: true
  }
];

// ============================================
// EFECTOS ESPECIALES
// ============================================
export const specialEffects = [
  {
    id: 'smoke-machine',
    name: 'Máquina de Humo',
    basePrice: 250,
    priceDisplay: '$250',
    unit: 'c/u',
    maxQuantity: 2,
    description: 'Máquina de humo profesional para efectos atmosféricos',
    quantityAllowed: true
  }
];

// ============================================
// STAFF Y SERVICIOS
// ============================================
export const staffServices = [
  {
    id: 'dj-service',
    name: 'DJ',
    basePrice: 2500,
    priceDisplay: '$2,500',
    duration: '5 horas',
    description: 'Crea la atmósfera musical de la noche, lee la pista y adapta la energía para que nunca decaiga',
    icon: '🎧'
  },
  {
    id: 'vj-service',
    name: 'VJ (Visuales en vivo)',
    basePrice: 2000,
    priceDisplay: '$2,000',
    duration: '5 horas',
    description: 'El visual jockey convierte cada canción en un show visual, integrando pantallas y luces',
    icon: '🧑‍💻',
    requiresScreens: true
  },
  {
    id: 'host-service',
    name: 'Animador / Host',
    basePrice: 1500,
    priceDisplay: '$1,500',
    duration: '5 horas',
    description: 'Es la chispa que conecta al público, levanta el ánimo y guía los momentos clave',
    icon: '🎤'
  }
];

// ============================================
// COSTOS ADICIONALES Y LOGÍSTICA
// ============================================
export const additionalCosts = {
  technicalProduction: {
    id: 'tech-production',
    name: 'Producción Técnica (Montaje + Desmontaje)',
    basePrice: 600,
    priceDisplay: 'Desde $600',
    description: 'Equipo técnico para montaje, pruebas y desmontaje ordenado',
    note: 'El número de técnicos depende del tamaño del montaje (normalmente 2-4 por evento)',
    calculation: 'auto' // Calculado según complejidad del setup
  },
  flete: {
    id: 'flete',
    name: 'Flete Técnico',
    basePrice: 500,
    priceDisplay: '$500',
    minimum: 500,
    ratePerKm: 13.5, // Promedio de $12-15
    description: 'Transporte de equipo ida y vuelta desde Del Paseo Residencial',
    note: 'Mínimo $500 dentro del Área Metropolitana de Monterrey',
    validLocations: ['Monterrey', 'San Pedro', 'Santiago', 'Cumbres', 'San Jerónimo', 'Guadalupe']
  },
  secondFloorSurcharge: {
    id: 'second-floor',
    name: 'Montaje en 2º piso (sin elevador)',
    basePrice: 1000,
    priceDisplay: '$1,000',
    description: 'Incluye tiempo extra y un técnico adicional para maniobras seguras',
    isOptional: true
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get recommended audio package based on number of attendees
 */
export const getRecommendedAudio = (attendees) => {
  return audioPackages.find(pkg =>
    attendees >= pkg.attendeeRange.min && attendees <= pkg.attendeeRange.max
  ) || audioPackages[audioPackages.length - 1]; // Return largest if over max
};

/**
 * Get recommended dance floor based on number of attendees
 * Assumes 30-40% of attendees will be dancing at the same time
 */
export const getRecommendedDanceFloor = (attendees) => {
  const dancingCount = Math.ceil(attendees * 0.35); // 35% average
  return danceFloors.find(floor => floor.attendeeCapacity >= dancingCount) || danceFloors[danceFloors.length - 1];
};

/**
 * Calculate recommended minimum lighting based on event size
 */
export const getRecommendedLighting = (attendees) => {
  if (attendees <= 50) {
    return { towers: 2, parLeds: 4 };
  } else if (attendees <= 100) {
    return { towers: 3, parLeds: 6 };
  } else if (attendees <= 150) {
    return { towers: 4, parLeds: 8 };
  } else {
    return { towers: 6, parLeds: 10 };
  }
};

// ============================================
// LEGACY EXPORTS (for backward compatibility with existing components)
// ============================================
export const packages = [
  {
    title: "Audio Premium",
    cards: audioPackages.map(pkg => ({
      title: pkg.title,
      description: pkg.equipment,
      long_description: pkg.description,
      price: pkg.priceDisplay,
      image: pkg.image
    }))
  },
  {
    title: "Pantallas LED",
    cards: ledScreens.map(screen => ({
      title: screen.title,
      description: screen.description,
      long_description: screen.setup,
      price: screen.priceDisplay,
      image: screen.image
    }))
  },
  {
    title: "Pista de Baile Infinity Gold",
    cards: danceFloors.map(floor => ({
      title: floor.title,
      description: floor.description,
      long_description: `${floor.modules} módulos (${floor.dimensions})`,
      price: floor.priceDisplay,
      image: floor.image
    }))
  },
  {
    title: "Iluminación y Efectos",
    cards: lighting.map(light => ({
      title: light.name,
      description: light.description,
      long_description: `Mínimo ${light.minimumRecommended} recomendado`,
      price: light.priceDisplay,
      image: light.image
    }))
  }
];

export const images = [
  { publicId: 'auraltune/EM-45_d9npco', title: 'Eventos', description: 'Evento 1' },
  { publicId: 'auraltune/EM-57_kt50yc', title: 'Eventos', description: 'Evento 2' },
  { publicId: 'auraltune/IMG_5258_l85qam', title: 'Eventos', description: 'Evento 3' },
  { publicId: 'auraltune/IMG_5373_quuioj', title: 'Eventos', description: 'Evento 4' },
  { publicId: 'auraltune/EM-49', title: 'Eventos', description: 'Evento 5' },
  { publicId: 'auraltune/EM-61_pdcw8j', title: 'Eventos', description: 'Evento 6' },
  { publicId: 'auraltune/DSC_3854', title: 'Eventos', description: 'Evento 7' },
];

export const testimonials = [
  {
    name: "Jane D",
    avatar: "https://pagedone.io/asset/uploads/1696229969.png",
    rating: 4,
    message: "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.",
  },
  {
    name: "Harsh P.",
    avatar: "https://pagedone.io/asset/uploads/1696229994.png",
    rating: 4.9,
    message: "Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before.",
  },
  {
    name: "Alex K.",
    avatar: "https://pagedone.io/asset/uploads/1696230027.png",
    rating: 4.9,
    message: "The customer service team at pagedone went above and beyond to help me resolve a billing issue.",
  },
];

export const clients = [
  { name: 'Plaza Auriga San Pedro', image: 'auraltune/corporate_logos/auriga' },
  { name: 'Udem San Pedro', image: 'auraltune/corporate_logos/udem' },
  { name: 'Club Alpino Chipinque', image: 'auraltune/corporate_logos/alpino' },
  { name: 'Cuasartt', image: 'auraltune/corporate_logos/causartt' },
  { name: 'French Fried Cafe', image: 'auraltune/corporate_logos/frenchf' },
  { name: 'Client 6', image: '8_p4u9gt' },
  { name: 'Client 7', image: '9_tdlx2i' },
  { name: 'Client 8', image: '10_hcpc0j' },
];

