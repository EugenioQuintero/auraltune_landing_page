import React, { useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Box, TextField } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const QuoteSummary = ({
  eventDetails,
  selectedPackages,
  totalPrice,
  setTotalPrice,
  contactInfo = {}, // Default to an empty object to avoid undefined errors
  setContactInfo,
}) => {
  // Calculate total price including additional costs
  useEffect(() => {
    const packagesTotal = selectedPackages.reduce((acc, item) => {
      const priceNumber = parseFloat(
        item.price.replace(/[^0-9.-]+/g, '').replace(/,/g, '')
      );
      return acc + (isNaN(priceNumber) ? 0 : priceNumber);
    }, 0);

    const additionalCosts = 0; // Add additional costs calculation if necessary

    setTotalPrice(packagesTotal + additionalCosts);
  }, [selectedPackages, setTotalPrice]);

  // Prepare date and time strings
  const eventStartDate = eventDetails?.date ? dayjs(eventDetails.date) : null;
  const eventEndDate = eventDetails?.date
    ? eventDetails.endsNextDay
      ? dayjs(eventDetails.date).add(1, 'day')
      : dayjs(eventDetails.date)
    : null;
  const startTime = eventDetails?.startTime ? dayjs(eventDetails.startTime) : null;
  const endTime = eventDetails?.endTime ? dayjs(eventDetails.endTime) : null;

  // Handle input changes for contact info
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Resumen de Cotización
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Detalles del Evento
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="Fecha y Horario"
            secondary={
              eventStartDate && startTime && endTime
                ? `${eventStartDate.format('DD/MM/YYYY')} ${startTime.format('HH:mm')} - ${
                    eventEndDate ? eventEndDate.format('DD/MM/YYYY') : ''
                  } ${endTime.format('HH:mm')}`
                : ''
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ubicación" secondary={eventDetails?.location || ''} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Número de Asistentes" secondary={eventDetails?.attendees || ''} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Tipo de Evento"
            secondary={
              eventDetails?.eventType === 'interior' ? 'Interior' : 'Exterior'
            }
          />
        </ListItem>
        {eventDetails?.isSecondFloor && (
          <>
            <ListItem>
              <ListItemText
                primary="Evento en Segundo Piso"
                secondary={`Número de pisos: ${eventDetails?.floors || ''}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="¿Hay Elevador?"
                secondary={eventDetails?.elevator === 'yes' ? 'Sí' : 'No'}
              />
            </ListItem>
          </>
        )}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        Servicios Seleccionados
      </Typography>
      {selectedPackages.length > 0 ? (
        <List dense>
          {selectedPackages.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.title} - ${item.price}`}
                secondary={item.description}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No has seleccionado ningún servicio.</Typography>
      )}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" align="right">
        Total: ${totalPrice.toFixed(2)}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        Información de Contacto
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          label="Nombre Completo"
          name="name"
          value={contactInfo.name || ''} // Default to an empty string to avoid undefined errors
          onChange={handleContactChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Número de Teléfono"
          name="phone"
          value={contactInfo.phone || ''} // Default to an empty string to avoid undefined errors
          onChange={handleContactChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
      </Box>
    </Box>
  );
};

export default QuoteSummary;
