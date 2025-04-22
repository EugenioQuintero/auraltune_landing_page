// src/pages/Cotizador.jsx

import React, { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import EventDetailsForm from '../components/EventDetailsForm';
import ServiceSelection from '../components/ServiceSelection';
import QuoteSummary from '../components/QuoteSummary';
import Footer from '../components/Footer';
import dayjs from 'dayjs';

const steps = ['Detalles del Evento', 'Selecciona Servicios', 'Resumen de Cotización'];

const libraries = ['places']; // Load the Places library

const Cotizador = () => {
  const [activeStep, setActiveStep] = useState(0);

  // State for event details, selected packages, and total price
  const [eventDetails, setEventDetails] = useState({
    location: '',
    latitude: null,
    longitude: null,
    // ... other fields
  });
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // State for dialog and notifications
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Navigation handlers
  const handleNext = () => {
    if (activeStep === 0) {
      // Validate event details
      if (!validateEventDetails()) {
        return;
      }
    } else if (activeStep === 1) {
      // Ensure at least one service is selected
      if (selectedPackages.length === 0) {
        alert('Por favor, selecciona al menos un servicio.');
        return;
      }
    } else if (activeStep === 2) {
      // Validate contact information
      if (!validateContactInfo()) {
        return;
      }

      // Prepare data to send
      const quoteData = {
        eventDetails,
        selectedPackages,
        totalPrice,
      };

      // Send data to backend (using fetch or axios)
      fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      })
        .then((response) => {
          if (response.ok) {
            setOpenDialog(true);
          } else {
            alert('Hubo un error al enviar tu cotización. Por favor, inténtalo de nuevo.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Hubo un error al enviar tu cotización. Por favor, inténtalo de nuevo.');
        });

      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const validateContactInfo = () => {
    if (!eventDetails.name || !eventDetails.phone) {
      alert('Por favor, proporciona tu nombre y número de teléfono.');
      return false;
    }
    // You can add more validation, e.g., phone number format
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on desired phone number format
    if (!phoneRegex.test(eventDetails.phone)) {
      alert('Por favor, ingresa un número de teléfono válido de 10 dígitos.');
      return false;
    }
    return true;
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Validate Event Details
  const validateEventDetails = () => {
    const requiredFields = [
      'location',
      'startDateTime',
      'endDateTime',
      'attendees',
      'eventType',
    ];

    for (const field of requiredFields) {
      if (!eventDetails[field]) {
        alert('Por favor, completa todos los campos requeridos.');
        return false;
      }
    }

    // If event is on second floor, validate additional fields
    if (eventDetails.isSecondFloor) {
      if (!eventDetails.floors || !eventDetails.elevator) {
        alert('Por favor, completa todos los campos sobre el segundo piso.');
        return false;
      }
    }

    // Validate that startDateTime is before endDateTime
    if (eventDetails.startDateTime && eventDetails.endDateTime) {
      const start = dayjs(eventDetails.startDateTime);
      const end = dayjs(eventDetails.endDateTime);

      if (start.isAfter(end)) {
        alert('La fecha y hora de inicio deben ser antes de la fecha y hora de fin.');
        return false;
      }
    }

    return true;
  };

  // Function to render the content of each step
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <EventDetailsForm
            eventDetails={eventDetails}
            setEventDetails={setEventDetails}
          />
        );
      case 1:
        return (
          <ServiceSelection
            selectedPackages={selectedPackages}
            setSelectedPackages={setSelectedPackages}
          />
        );
      case 2:
        return (
          <QuoteSummary
            eventDetails={eventDetails}
            selectedPackages={selectedPackages}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        );
      default:
        return 'Paso desconocido';
    }
  };

  // Handle Dialog Close
  const handleDialogClose = () => {
    setOpenDialog(false);
    // Show confirmation message
    setSnackbarOpen(true);
    // Reset the form
    resetForm();
  };

  // Reset Form Function
  const resetForm = () => {
    setActiveStep(0);
    setEventDetails({
      location: '',
      latitude: null,
      longitude: null,
      // ... other fields
    });
    setSelectedPackages([]);
    setTotalPrice(0);
    // Reset contact info if it's part of eventDetails
  };

  // Handle Snackbar Close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* LoadScript is loaded here once */}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        language="es"
      >
        <div className="max-w-7xl mx-auto p-4 space-y-8 pt-32">
          <Typography variant="h4" align="center" gutterBottom>
            Cotiza tu Evento
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ backgroundColor: 'transparent' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <strong>{label}</strong>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {getStepContent(activeStep)}
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Atrás
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Solicitar Cotización' : 'Siguiente'}
              </Button>
            </Box>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>¡Cotización Enviada!</DialogTitle>
          <DialogContent>
            <Typography>
              Gracias por solicitar una cotización. Nos pondremos en contacto contigo pronto.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} autoFocus>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Tu cotización ha sido enviada con éxito.
          </Alert>
        </Snackbar>

        <section id="footer">
          <Footer />
        </section>
      </LoadScript>
    </>
  );
};

export default Cotizador;
