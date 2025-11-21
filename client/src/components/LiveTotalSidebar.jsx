import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Divider,
  Collapse,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
  calculatePackageTotal,
  formatPrice
} from '../utils/pricingUtils';

const LiveTotalSidebar = ({
  packageData,
  showFlete = false,
  showSecondFloor = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    if (packageData) {
      const calculated = calculatePackageTotal(packageData);
      setPricing(calculated);
    }
  }, [packageData]);

  if (!pricing) {
    return null;
  }

  const { breakdown, subtotals, total } = pricing;

  const hasItems =
    breakdown.audio > 0 ||
    breakdown.screen > 0 ||
    breakdown.danceFloor > 0 ||
    breakdown.lighting > 0 ||
    breakdown.effects > 0 ||
    breakdown.staff > 0;

  if (!hasItems) {
    return null;
  }

  return (
    <Paper
      elevation={6}
      className={`sticky top-20 z-10 ${className}`}
      sx={{
        background: 'linear-gradient(135deg, #005ad1 0%, #003d91 100%)',
        color: 'white',
        overflow: 'hidden',
        borderRadius: 2
      }}
    >
      {/* Header - Compact */}
      <div
        className="p-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="caption" className="text-gray-200 text-xs uppercase tracking-wide">
              Total
            </Typography>
            <Typography variant="h5" className="font-bold leading-tight">
              {formatPrice(total)}
            </Typography>
          </div>
          <IconButton
            size="small"
            sx={{ color: 'white', padding: '4px' }}
          >
            {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </div>

        <Typography variant="caption" className="text-gray-300 block mt-0.5 text-xs">
          Ver desglose
        </Typography>
      </div>

      {/* Expandable Breakdown */}
      <Collapse in={isExpanded}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />

        <div className="p-3 bg-white/10 text-sm">
          {/* Equipment Section */}
          {subtotals.equipment > 0 && (
            <>
              <Typography variant="caption" className="font-bold mb-1.5 text-yellow-200 block text-xs">
                🎛️ EQUIPO
              </Typography>

              <div className="space-y-0.5 mb-2">
                {breakdown.audio > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-100">Audio</span>
                    <span className="font-mono text-xs">{formatPrice(breakdown.audio)}</span>
                  </div>
                )}

                {breakdown.screen > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-100">Pantallas LED</span>
                    <span className="font-mono text-xs">{formatPrice(breakdown.screen)}</span>
                  </div>
                )}

                {breakdown.danceFloor > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-100">Pista de Baile</span>
                    <span className="font-mono text-xs">{formatPrice(breakdown.danceFloor)}</span>
                  </div>
                )}

                {breakdown.lighting > 0 && (
                  <>
                    {breakdown.lightingDetails && breakdown.lightingDetails.length > 0 ? (
                      breakdown.lightingDetails.map((light, index) => (
                        <div key={`light-${index}`} className="flex justify-between items-center text-xs">
                          <span className="text-gray-100">{light.name} x{light.quantity}</span>
                          <span className="font-mono text-xs">{formatPrice(light.total)}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-100">Iluminación</span>
                        <span className="font-mono text-xs">{formatPrice(breakdown.lighting)}</span>
                      </div>
                    )}
                    {breakdown.lasersDetails && breakdown.lasersDetails.length > 0 && (
                      breakdown.lasersDetails.map((laser, index) => (
                        <div key={`laser-${index}`} className="flex justify-between items-center text-xs">
                          <span className="text-gray-100">{laser.name} x{laser.quantity}</span>
                          <span className="font-mono text-xs">{formatPrice(laser.total)}</span>
                        </div>
                      ))
                    )}
                  </>
                )}

                {breakdown.effects > 0 && (
                  <>
                    {breakdown.effectsDetails && breakdown.effectsDetails.length > 0 ? (
                      breakdown.effectsDetails.map((effect, index) => (
                        <div key={`effect-${index}`} className="flex justify-between items-center text-xs">
                          <span className="text-gray-100">{effect.name} x{effect.quantity}</span>
                          <span className="font-mono text-xs">{formatPrice(effect.total)}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-100">Máquinas de humo</span>
                        <span className="font-mono text-xs">{formatPrice(breakdown.effects)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 0.5 }} />

              <div className="flex justify-between items-center font-bold mb-2 text-xs">
                <span className="text-yellow-200">Subtotal Equipo</span>
                <span className="font-mono">{formatPrice(subtotals.equipment)}</span>
              </div>
            </>
          )}

          {/* Staff Section */}
          {breakdown.staff > 0 && (
            <>
              <Typography variant="caption" className="font-bold mb-1.5 text-green-200 block text-xs">
                👥 STAFF
              </Typography>

              <div className="space-y-0.5 mb-2">
                {breakdown.staffDetails && breakdown.staffDetails.length > 0 ? (
                  breakdown.staffDetails.map((service, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-gray-100">{service.name}</span>
                      <span className="font-mono text-xs">{formatPrice(service.price)}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-100">Staff Profesional</span>
                    <span className="font-mono text-xs">{formatPrice(breakdown.staff)}</span>
                  </div>
                )}
              </div>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 0.5 }} />
            </>
          )}

          {/* Additional Costs Section */}
          {((showFlete && breakdown.flete > 0) || (showSecondFloor && breakdown.secondFloorSurcharge > 0) || breakdown.overtime > 0) && (
            <>
              <Typography variant="caption" className="font-bold mb-1.5 text-orange-200 block text-xs">
                📦 ADICIONALES
              </Typography>

              <div className="space-y-0.5 mb-2">
                {showFlete && breakdown.flete > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-100">Flete</span>
                    <span className="font-mono text-xs">{formatPrice(breakdown.flete)}</span>
                  </div>
                )}

                {showSecondFloor && breakdown.secondFloorSurcharge > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-100">Montaje 2º Piso</span>
                    <span className="font-mono text-xs">{formatPrice(breakdown.secondFloorSurcharge)}</span>
                  </div>
                )}

                {breakdown.overtime > 0 && breakdown.overtimeDetails && (
                  <div className="text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-100">
                        Horas Extra ({breakdown.overtimeDetails.hours.toFixed(1)}h)
                      </span>
                      <span className="font-mono text-xs">{formatPrice(breakdown.overtime)}</span>
                    </div>
                    <div className="text-[10px] text-gray-300 mt-0.5 ml-1">
                      Eq: {formatPrice(breakdown.overtimeDetails.equipmentCost)}
                      {breakdown.overtimeDetails.djCost > 0 &&
                        ` | DJ: ${formatPrice(breakdown.overtimeDetails.djCost)}`}
                    </div>
                  </div>
                )}
              </div>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 0.5 }} />
            </>
          )}

          {/* Final Total */}
          <div className="flex justify-between items-center pt-1.5">
            <Typography variant="body2" className="font-bold text-sm">
              TOTAL
            </Typography>
            <Typography variant="h6" className="font-bold font-mono">
              {formatPrice(total)}
            </Typography>
          </div>
        </div>

        {/* Disclaimer */}
        <Box className="p-2 bg-yellow-500/20 border-t border-yellow-300/30">
          <Typography variant="caption" className="text-yellow-100 block text-center text-[10px]">
            ⚠️ Precio estimado sujeto a confirmación
          </Typography>
        </Box>
      </Collapse>
    </Paper>
  );
};

// Mobile version that sticks to bottom
export const LiveTotalBottomBar = ({ packageData, showFlete, showSecondFloor }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Cerrado por defecto
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    if (packageData) {
      const calculated = calculatePackageTotal(packageData);
      setPricing(calculated);
    }
  }, [packageData]);

  if (!pricing) {
    return null;
  }

  const { total } = pricing;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <Paper
        elevation={8}
        className="rounded-t-2xl shadow-2xl"
        sx={{
          background: 'linear-gradient(135deg, #005ad1 0%, #003d91 100%)',
          color: 'white'
        }}
      >
        {/* Botón de toggle - Más obvio y llamativo */}
        <div
          className="p-4 cursor-pointer active:bg-blue-700/50 transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <Typography variant="caption" className="text-blue-200 uppercase text-xs font-semibold tracking-wider">
                Total Estimado
              </Typography>
              <Typography variant="h5" className="font-black tracking-tight">
                {formatPrice(total)}
              </Typography>
              {/* Indicador visual más obvio */}
              {!isExpanded && (
                <div className="flex items-center gap-2 mt-1">
                  <Chip
                    label="👆 Toca para ver desglose"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      '@keyframes pulse': {
                        '0%, 100%': {
                          opacity: 1,
                        },
                        '50%': {
                          opacity: 0.7,
                        },
                      }
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <IconButton
                size="medium"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                {isExpanded ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
              </IconButton>
              <Typography variant="caption" className="text-blue-100 text-[10px] mt-1">
                {isExpanded ? 'Cerrar' : 'Abrir'}
              </Typography>
            </div>
          </div>
        </div>

        {/* Contenido expandible - Limitado en altura */}
        <Collapse in={isExpanded}>
          <div className="p-3 pt-0 max-h-[50vh] overflow-y-auto">
            <LiveTotalSidebar
              packageData={packageData}
              showFlete={showFlete}
              showSecondFloor={showSecondFloor}
              className="!static !shadow-none"
            />
          </div>
        </Collapse>
      </Paper>
    </div>
  );
};

export default LiveTotalSidebar;
