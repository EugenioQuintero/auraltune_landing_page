// ============================================
// PRICING UTILITY FUNCTIONS
// Auraltune Package Builder
// ============================================

/**
 * Format number as Mexican Peso currency
 * @param {number} amount - Numeric amount
 * @returns {string} Formatted price string (e.g., "$1,500")
 */
export const formatPrice = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0';
  }
  return `$${amount.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

/**
 * Parse price string to number
 * @param {string} priceString - Price string (e.g., "$1,500")
 * @returns {number} Numeric value
 */
export const parsePrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  const cleaned = priceString.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculate total price for selected audio package
 * @param {object} audioSelection - Selected audio package
 * @returns {number} Total price
 */
export const calculateAudioPrice = (audioSelection) => {
  if (!audioSelection) return 0;
  return audioSelection.basePrice || 0;
};

/**
 * Calculate total price for selected LED screen/DJ Booth
 * @param {object} screenSelection - Selected screen configuration
 * @returns {number} Total price
 */
export const calculateScreenPrice = (screenSelection) => {
  if (!screenSelection) return 0;
  return screenSelection.basePrice || 0;
};

/**
 * Calculate total price for selected dance floor
 * @param {object} floorSelection - Selected dance floor
 * @returns {number} Total price
 */
export const calculateDanceFloorPrice = (floorSelection) => {
  if (!floorSelection) return 0;
  return floorSelection.basePrice || 0;
};

/**
 * Calculate total price for lighting with quantities
 * @param {array} lightingItems - Array of {item, quantity}
 * @returns {number} Total price
 */
export const calculateLightingPrice = (lightingItems) => {
  if (!Array.isArray(lightingItems)) return 0;

  return lightingItems.reduce((total, { item, quantity }) => {
    if (!item || !quantity || quantity < 0) return total;
    return total + (item.basePrice * quantity);
  }, 0);
};

/**
 * Calculate total price for special effects with quantities
 * @param {array} effectItems - Array of {item, quantity}
 * @returns {number} Total price
 */
export const calculateEffectsPrice = (effectItems) => {
  if (!Array.isArray(effectItems)) return 0;

  return effectItems.reduce((total, { item, quantity }) => {
    if (!item || !quantity || quantity < 0) return total;
    return total + (item.basePrice * quantity);
  }, 0);
};

/**
 * Calculate total price for laser accessories with quantities
 * @param {array} laserItems - Array of {item, quantity}
 * @returns {number} Total price
 */
export const calculateLasersPrice = (laserItems) => {
  if (!Array.isArray(laserItems)) return 0;

  return laserItems.reduce((total, { item, quantity }) => {
    if (!item || !quantity || quantity < 0) return total;
    return total + (item.basePrice * quantity);
  }, 0);
};

/**
 * Calculate total price for staff services
 * @param {array} staffSelections - Array of selected staff services
 * @returns {number} Total price
 */
export const calculateStaffPrice = (staffSelections) => {
  if (!Array.isArray(staffSelections)) return 0;

  return staffSelections.reduce((total, service) => {
    if (!service) return total;
    return total + (service.basePrice || 0);
  }, 0);
};

/**
 * Calculate technical production cost based on setup complexity
 * Factors: number of equipment pieces, event size
 * @param {object} packageDetails - Full package details
 * @returns {number} Technical production cost
 */
export const calculateTechnicalProductionCost = (packageDetails) => {
  const {
    audio,
    screen,
    danceFloor,
    lighting = [],
    effects = [],
    attendees = 0
  } = packageDetails;

  let baseCost = 600; // Minimum production cost
  let complexity = 0;

  // Add complexity for each major component
  if (audio) complexity += 1;
  if (screen && screen.basePrice > 0) complexity += 1;
  if (danceFloor) complexity += 1;

  // Add complexity for lighting items
  const totalLightingItems = lighting.reduce((sum, { quantity }) => sum + (quantity || 0), 0);
  if (totalLightingItems > 0) complexity += Math.ceil(totalLightingItems / 4);

  // Add complexity for effects
  const totalEffects = effects.reduce((sum, { quantity }) => sum + (quantity || 0), 0);
  if (totalEffects > 0) complexity += 1;

  // Add complexity for large events
  if (attendees > 150) complexity += 1;
  if (attendees > 250) complexity += 1;

  // Calculate cost: $600 base + $200 per complexity point
  const productionCost = baseCost + (complexity * 200);

  return Math.min(productionCost, 2000); // Cap at $2,000
};

/**
 * Calculate flete (transportation) cost
 * Base minimum is $500 for metropolitan area
 * @param {string} location - Selected location
 * @param {number} distance - Distance in km (optional)
 * @returns {number} Flete cost
 */
export const calculateFleteCost = (location, distance = 0) => {
  const validLocations = ['Monterrey', 'San Pedro', 'Santiago', 'Cumbres', 'San Jerónimo', 'Guadalupe'];

  if (!location || !validLocations.includes(location)) {
    return 0; // Invalid location
  }

  const minimumFlete = 500;

  // If distance provided, calculate
  if (distance > 0) {
    const calculatedCost = distance * 13.5; // $13.50 per km (average of $12-15)
    return Math.max(calculatedCost, minimumFlete);
  }

  // Return minimum for valid locations
  return minimumFlete;
};

/**
 * Get second floor surcharge
 * @param {boolean} hasSecondFloor - Whether event is on second floor without elevator
 * @returns {number} Surcharge amount
 */
export const getSecondFloorSurcharge = (hasSecondFloor) => {
  return hasSecondFloor ? 1000 : 0;
};

/**
 * Parse time string to hours (24-hour format)
 * @param {string} timeString - Time in format "3:00 PM" or "12:00 AM"
 * @returns {number} Hours in 24-hour format (e.g., 15.0 for 3:00 PM)
 */
export const parseTimeToHours = (timeString) => {
  if (!timeString) return 0;

  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  let hour24 = hours;

  // Convert to 24-hour format
  if (period === 'AM') {
    if (hours === 12) hour24 = 0; // 12:00 AM = 0:00
  } else if (period === 'PM') {
    if (hours !== 12) hour24 = hours + 12; // 1:00 PM = 13:00, but 12:00 PM = 12:00
  }

  return hour24 + (minutes / 60);
};

/**
 * Calculate event duration in hours
 * Handles events that cross midnight (e.g., 10 PM to 2 AM)
 * @param {string} startTime - Start time (e.g., "7:00 PM")
 * @param {string} endTime - End time (e.g., "12:00 AM")
 * @returns {number} Duration in hours
 */
export const calculateEventDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;

  const startHours = parseTimeToHours(startTime);
  const endHours = parseTimeToHours(endTime);

  let duration = endHours - startHours;

  // If end time is before start time, event crosses midnight
  if (duration < 0) {
    duration += 24;
  }

  return duration;
};

/**
 * Check if package includes DJ service
 * DJ is available if they have audio AND (DJ Booth or LED Screen)
 * @param {object} packageData - Package selections
 * @returns {boolean} True if DJ service is included
 */
export const hasDJService = (packageData) => {
  const { audio, screen, staff = [] } = packageData;

  // Must have audio
  if (!audio) return false;

  // Must have either DJ Booth (free) or LED Screen
  if (!screen || screen.basePrice === 0 || screen.basePrice > 0) {
    // Check if they have DJ Booth or any screen
    return screen && (screen.id === 'dj-booth' || screen.basePrice > 0);
  }

  return false;
};

/**
 * Calculate overtime charges
 * All packages include 5 hours of service
 * After hour 5, overtime is charged
 * @param {number} duration - Event duration in hours
 * @param {boolean} hasDJ - Whether package includes DJ service
 * @returns {object} Overtime calculation {hours, equipmentCost, djCost, total}
 */
export const calculateOvertimeCost = (duration, hasDJ = false) => {
  const includedHours = 5;
  const overtimeHours = Math.max(0, duration - includedHours);

  if (overtimeHours === 0) {
    return {
      hours: 0,
      equipmentCost: 0,
      djCost: 0,
      total: 0
    };
  }

  const equipmentOvertimeRate = 2000; // $2,000 per hour for equipment
  const djOvertimeRate = 500; // $500 per hour for DJ

  const equipmentCost = overtimeHours * equipmentOvertimeRate;
  const djCost = hasDJ ? (overtimeHours * djOvertimeRate) : 0;

  return {
    hours: overtimeHours,
    equipmentCost,
    djCost,
    total: equipmentCost + djCost
  };
};

/**
 * Calculate complete package total
 * @param {object} packageData - Complete package data
 * @returns {object} Price breakdown and total
 */
export const calculatePackageTotal = (packageData) => {
  const {
    audio,
    screen,
    danceFloor,
    lighting = [],
    lasers = [],
    effects = [],
    staff = [],
    location,
    hasSecondFloor = false,
    distance = 0,
    attendees = 0,
    startTime,
    endTime
  } = packageData;

  // Calculate component prices
  const audioPrice = calculateAudioPrice(audio);
  const screenPrice = calculateScreenPrice(screen);
  const danceFloorPrice = calculateDanceFloorPrice(danceFloor);
  const lightingPrice = calculateLightingPrice(lighting);
  const lasersPrice = calculateLasersPrice(lasers);
  const effectsPrice = calculateEffectsPrice(effects);
  const staffPrice = calculateStaffPrice(staff);

  // Calculate subtotal of equipment and staff
  const equipmentSubtotal = audioPrice + screenPrice + danceFloorPrice + lightingPrice + lasersPrice + effectsPrice;
  const servicesSubtotal = staffPrice;

  // Calculate event duration and overtime
  const duration = calculateEventDuration(startTime, endTime);
  const hasDJ = hasDJService(packageData);
  const overtime = calculateOvertimeCost(duration, hasDJ);

  // Calculate additional costs
  const flete = calculateFleteCost(location, distance);
  const secondFloorSurcharge = getSecondFloorSurcharge(hasSecondFloor);

  // Calculate final total
  const subtotal = equipmentSubtotal + servicesSubtotal;
  const additionalCosts = flete + secondFloorSurcharge + overtime.total;
  const total = subtotal + additionalCosts;

  return {
    breakdown: {
      audio: audioPrice,
      screen: screenPrice,
      danceFloor: danceFloorPrice,
      lighting: lightingPrice,
      lightingDetails: lighting.map(lightItem => ({
        name: lightItem.item.name,
        quantity: lightItem.quantity,
        unitPrice: lightItem.item.basePrice,
        total: lightItem.item.basePrice * lightItem.quantity
      })),
      lasers: lasersPrice,
      lasersDetails: lasers.map(laserItem => ({
        name: laserItem.item.name,
        quantity: laserItem.quantity,
        unitPrice: laserItem.item.basePrice,
        total: laserItem.item.basePrice * laserItem.quantity
      })),
      effects: effectsPrice,
      effectsDetails: effects.map(effectItem => ({
        name: effectItem.item.name,
        quantity: effectItem.quantity,
        unitPrice: effectItem.item.basePrice,
        total: effectItem.item.basePrice * effectItem.quantity
      })),
      staff: staffPrice,
      staffDetails: staff.map(service => ({
        name: service.name,
        price: service.basePrice || 0,
        duration: service.duration || '5 horas'
      })),
      flete,
      secondFloorSurcharge,
      overtime: overtime.total,
      overtimeDetails: overtime
    },
    subtotals: {
      equipment: equipmentSubtotal,
      services: servicesSubtotal,
      additionalCosts
    },
    eventInfo: {
      duration,
      hasDJ,
      includedHours: 5
    },
    total
  };
};

/**
 * Get formatted breakdown for display
 * @param {object} priceCalculation - Result from calculatePackageTotal
 * @returns {array} Array of line items for display
 */
export const getFormattedBreakdown = (priceCalculation) => {
  const { breakdown, subtotals, total } = priceCalculation;
  const items = [];

  // Equipment items
  if (breakdown.audio > 0) {
    items.push({ label: 'Audio', amount: breakdown.audio, formatted: formatPrice(breakdown.audio) });
  }
  if (breakdown.screen > 0) {
    items.push({ label: 'Pantallas LED / DJ Booth', amount: breakdown.screen, formatted: formatPrice(breakdown.screen) });
  }
  if (breakdown.danceFloor > 0) {
    items.push({ label: 'Pista de Baile', amount: breakdown.danceFloor, formatted: formatPrice(breakdown.danceFloor) });
  }
  if (breakdown.lighting > 0) {
    items.push({ label: 'Iluminación', amount: breakdown.lighting, formatted: formatPrice(breakdown.lighting) });
  }
  if (breakdown.lasers > 0) {
    items.push({ label: 'Láseres', amount: breakdown.lasers, formatted: formatPrice(breakdown.lasers) });
  }
  if (breakdown.effects > 0) {
    items.push({ label: 'Efectos Especiales', amount: breakdown.effects, formatted: formatPrice(breakdown.effects) });
  }

  // Equipment subtotal
  if (subtotals.equipment > 0) {
    items.push({
      label: 'Subtotal Equipo',
      amount: subtotals.equipment,
      formatted: formatPrice(subtotals.equipment),
      isSubtotal: true
    });
  }

  // Staff services
  if (breakdown.staff > 0) {
    items.push({ label: 'Staff y Servicios', amount: breakdown.staff, formatted: formatPrice(breakdown.staff) });
  }

  // Additional costs
  if (breakdown.flete > 0) {
    items.push({ label: 'Flete', amount: breakdown.flete, formatted: formatPrice(breakdown.flete) });
  }
  if (breakdown.secondFloorSurcharge > 0) {
    items.push({
      label: 'Montaje 2º Piso',
      amount: breakdown.secondFloorSurcharge,
      formatted: formatPrice(breakdown.secondFloorSurcharge)
    });
  }
  if (breakdown.overtime > 0 && breakdown.overtimeDetails) {
    const { hours, equipmentCost, djCost } = breakdown.overtimeDetails;
    items.push({
      label: `Horas Extra (${hours.toFixed(1)}h)`,
      amount: breakdown.overtime,
      formatted: formatPrice(breakdown.overtime),
      details: `Equipo: ${formatPrice(equipmentCost)}${djCost > 0 ? ` | DJ: ${formatPrice(djCost)}` : ''}`
    });
  }

  // Final total
  items.push({
    label: 'Total Estimado',
    amount: total,
    formatted: formatPrice(total),
    isTotal: true
  });

  return items;
};

/**
 * Validate package selections
 * @param {object} packageData - Package data to validate
 * @returns {object} Validation result {isValid, errors}
 */
export const validatePackage = (packageData) => {
  const errors = [];
  const { attendees, location, staff = [], screen, lighting = [] } = packageData;

  // Check attendees
  if (!attendees || attendees < 1) {
    errors.push('El número de invitados es requerido');
  }

  // Check location
  const validLocations = ['Monterrey', 'San Pedro', 'Santiago', 'Cumbres', 'San Jerónimo', 'Guadalupe'];
  if (!location) {
    errors.push('La ubicación es requerida');
  } else if (!validLocations.includes(location)) {
    errors.push('Ubicación no válida. Solo disponible en: ' + validLocations.join(', '));
  }

  // Check VJ requirement (needs LED screens OR lighting equipment)
  const hasVJ = staff.some(s => s.id === 'vj-service');
  const hasScreens = screen && screen.basePrice > 0;
  const hasLighting = lighting.length > 0;
  if (hasVJ && !hasScreens && !hasLighting) {
    errors.push('El servicio de VJ requiere pantallas LED o iluminación');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate Google Maps link from address
 * @param {string} address - Full address text
 * @returns {string} Google Maps search URL
 */
export const generateGoogleMapsLink = (address) => {
  if (!address) return '';
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

/**
 * Generate quote summary for email
 * @param {object} packageData - Complete package data
 * @param {object} customerInfo - Customer contact info
 * @returns {string} HTML formatted email content
 */
export const generateQuoteEmailHTML = (packageData, customerInfo) => {
  const pricing = calculatePackageTotal(packageData);
  const breakdown = getFormattedBreakdown(pricing);

  const { name, email, phone, eventDate, startTime, endTime, eventType, address } = customerInfo;
  const { attendees, location, hasSecondFloor, audio, screen, danceFloor, lighting, effects, staff } = packageData;

  // Generate Google Maps link
  const mapsLink = address ? generateGoogleMapsLink(address) : '';

  let html = `
    <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f8f9fa; margin: 0; padding: 0; }
          .container { max-width: 650px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #005ad1 0%, #003d91 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 32px; letter-spacing: 2px; }
          .header h2 { margin: 10px 0 0 0; font-size: 18px; font-weight: normal; opacity: 0.95; }
          .content { padding: 25px; }
          .section { margin: 25px 0; padding: 20px; background-color: #f8f9fc; border-radius: 8px; border-left: 4px solid #005ad1; }
          .section-title { font-size: 18px; font-weight: bold; color: #005ad1; margin-bottom: 15px; display: flex; align-items: center; }
          .section-title::before { content: '📋'; margin-right: 8px; }
          .item { margin: 10px 0; line-height: 1.6; }
          .item strong { color: #005ad1; }
          .maps-button { display: inline-block; background-color: #4285f4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; transition: background-color 0.3s; }
          .maps-button:hover { background-color: #357ae8; }
          .address-box { background-color: white; padding: 15px; border-radius: 6px; border: 2px solid #e0e0e0; margin: 10px 0; }
          .breakdown-table { width: 100%; border-collapse: collapse; margin: 15px 0; background-color: white; border-radius: 8px; overflow: hidden; }
          .breakdown-table td { padding: 12px; border-bottom: 1px solid #e9ecef; }
          .breakdown-table tr:last-child td { border-bottom: none; }
          .breakdown-table .subtotal { font-weight: bold; background-color: #f1f3f5; }
          .breakdown-table .total { font-weight: bold; font-size: 20px; background-color: #005ad1; color: white; }
          .equipment-list { list-style: none; padding: 0; margin: 10px 0; }
          .equipment-list li { padding: 8px 12px; margin: 5px 0; background-color: white; border-radius: 4px; border-left: 3px solid #005ad1; }
          .disclaimer { background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%); padding: 20px; margin: 25px 0; border-radius: 8px; border-left: 4px solid #ffc107; }
          .disclaimer strong { color: #856404; }
          .contact-info { background-color: #e3f2fd; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; }
          .contact-info h3 { color: #1976d2; margin: 0 0 15px 0; }
          .contact-item { margin: 8px 0; font-size: 16px; }
          .footer { text-align: center; color: #666; padding: 25px; font-size: 13px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; }
          .footer strong { color: #005ad1; font-size: 16px; }
          .emoji { font-size: 18px; margin-right: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎵 AURALTUNE</h1>
            <h2>Nueva Solicitud de Cotización</h2>
          </div>

          <div class="content">
            <!-- Customer Contact Info -->
            <div class="section">
              <div class="section-title">Información de Contacto del Cliente</div>
              <div class="contact-info" style="background-color: #e8f5e9; border-radius: 8px; padding: 15px; margin: 15px 0;">
                <div class="contact-item"><span class="emoji">👤</span><strong>Nombre:</strong> ${name}</div>
                <div class="contact-item"><span class="emoji">📧</span><strong>Email:</strong> <a href="mailto:${email}" style="color: #1976d2;">${email}</a></div>
                <div class="contact-item"><span class="emoji">📱</span><strong>Teléfono:</strong> <a href="tel:${phone.replace(/\s/g, '')}" style="color: #1976d2;">${phone}</a></div>
              </div>
            </div>

            <!-- Event Details -->
            <div class="section">
              <div class="section-title">Detalles del Evento</div>
              <div class="item"><span class="emoji">📅</span><strong>Fecha:</strong> ${eventDate}</div>
              ${startTime ? `<div class="item"><span class="emoji">🕐</span><strong>Hora de Inicio:</strong> ${startTime}</div>` : ''}
              ${endTime ? `<div class="item"><span class="emoji">🕐</span><strong>Hora de Fin:</strong> ${endTime}</div>` : ''}
              ${pricing?.eventInfo?.duration ? `<div class="item"><span class="emoji">⏱️</span><strong>Duración:</strong> ${pricing.eventInfo.duration.toFixed(1)} horas</div>` : ''}
              <div class="item"><span class="emoji">👥</span><strong>Número de Invitados:</strong> ${attendees}</div>
              ${eventType ? `<div class="item"><span class="emoji">🏠</span><strong>Tipo de Evento:</strong> ${eventType === 'interior' ? 'Interior' : 'Exterior'}</div>` : ''}
              ${hasSecondFloor ? '<div class="item"><span class="emoji">🏢</span><strong>Montaje:</strong> 2º piso sin elevador (+$1,000)</div>' : ''}
            </div>

            <!-- Location with Google Maps -->
            ${address ? `
            <div class="section">
              <div class="section-title">Ubicación del Evento</div>
              <div class="address-box">
                <div class="item" style="margin-bottom: 15px;">
                  <span class="emoji">📍</span><strong>Dirección:</strong><br/>
                  ${address}
                </div>
                <div class="item"><span class="emoji">🏙️</span><strong>Municipio:</strong> ${location}</div>
              </div>
              ${mapsLink ? `
              <div style="text-align: center; margin-top: 15px;">
                <a href="${mapsLink}" class="maps-button" target="_blank">
                  📍 Ver ubicación en Google Maps
                </a>
              </div>
              ` : ''}
            </div>
            ` : ''}

            <!-- Package Details -->
            <div class="section">
              <div class="section-title">Paquete Seleccionado</div>
              <ul class="equipment-list">
                ${audio ? `<li><span class="emoji">🎵</span><strong>Audio:</strong> ${audio.title}<br/><small style="color: #666;">${audio.equipment}</small></li>` : ''}
                ${screen && screen.basePrice > 0 ? `<li><span class="emoji">📺</span><strong>Pantallas LED:</strong> ${screen.title}</li>` : ''}
                ${screen && screen.id === 'dj-booth' ? `<li><span class="emoji">🎧</span><strong>DJ Booth</strong></li>` : ''}
                ${danceFloor ? `<li><span class="emoji">💃</span><strong>Pista de Baile:</strong> ${danceFloor.title} (${danceFloor.dimensions})</li>` : ''}
                ${lighting && lighting.length > 0 ? '<li><span class="emoji">💡</span><strong>Iluminación:</strong><ul style="margin: 5px 0; padding-left: 20px;">' + lighting.map(l => `<li>${l.item.name} x ${l.quantity}</li>`).join('') + '</ul></li>' : ''}
                ${effects && effects.length > 0 ? '<li><span class="emoji">🌫️</span><strong>Efectos Especiales:</strong><ul style="margin: 5px 0; padding-left: 20px;">' + effects.map(e => `<li>${e.item.name} x ${e.quantity}</li>`).join('') + '</ul></li>' : ''}
                ${staff && staff.length > 0 ? '<li><span class="emoji">👥</span><strong>Staff y Servicios:</strong><ul style="margin: 5px 0; padding-left: 20px;">' + staff.map(s => `<li>${s.name} (${s.duration})</li>`).join('') + '</ul></li>' : ''}
              </ul>
            </div>

            <!-- Price Breakdown -->
            <div class="section">
              <div class="section-title">Desglose de Precio</div>
              <table class="breakdown-table">
                ${breakdown.map(item => `
                  <tr class="${item.isSubtotal ? 'subtotal' : ''} ${item.isTotal ? 'total' : ''}">
                    <td>${item.label}${item.details ? `<br/><small style="color: #666;">${item.details}</small>` : ''}</td>
                    <td align="right" style="white-space: nowrap;">${item.formatted}</td>
                  </tr>
                `).join('')}
              </table>
            </div>

            <!-- Disclaimer -->
            <div class="disclaimer">
              <strong>⚠️ Importante:</strong> Este es un precio <strong>estimado</strong>. Los precios están sujetos a modificación según
              fecha y disponibilidad, condiciones del venue (accesos, distancias internas), logística/flete y horarios de
              montaje/desmontaje. Las tarifas se confirman al definir venue, aforo y layout final.
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p><strong>AURALTUNE</strong></p>
            <p>Sonido, iluminación y DJ para elevar el aura de tu celebración</p>
            <p>📧 tuneaural@gmail.com</p>
            <p style="margin-top: 15px; font-size: 11px; color: #999;">🤖 Cotización generada automáticamente por el sistema Auraltune</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return html;
};

export default {
  formatPrice,
  parsePrice,
  calculatePackageTotal,
  getFormattedBreakdown,
  validatePackage,
  generateQuoteEmailHTML,
  generateGoogleMapsLink,
  calculateTechnicalProductionCost,
  calculateFleteCost,
  getSecondFloorSurcharge,
  calculateEventDuration,
  calculateOvertimeCost,
  hasDJService,
  parseTimeToHours
};
