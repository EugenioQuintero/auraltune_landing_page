// src/pages/Cotizador.jsx
// New Interactive Package Builder - 4 Step Flow

import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AttendeeSelector from '../components/AttendeeSelector';
import ComponentBuilder from '../components/ComponentBuilder';
import StaffSelector from '../components/StaffSelector';
import QuoteSummary from '../components/QuoteSummary';
import LiveTotalSidebar, { LiveTotalBottomBar } from '../components/LiveTotalSidebar';
import Footer from '../components/Footer';
import { generateQuoteEmailHTML } from '../utils/pricingUtils';

// Backend API URL - usar variable de entorno o fallback a Render
const API_URL = import.meta.env.VITE_API_URL || 'https://auraltune-landing-page.onrender.com';

const steps = [
  'Número de Invitados',
  'Arma tu Paquete',
  'Staff y Servicios',
  'Resumen y Contacto'
];

const Cotizador = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [attendees, setAttendees] = useState(100);
  const [packageSelections, setPackageSelections] = useState({
    audio: null,
    screen: null,
    danceFloor: null,
    lighting: [],
    effects: [],
    staff: []
  });
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    location: '',
    hasSecondFloor: false
  });

  // Dialog and notification states
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeStep]);

  // Navigation handlers
  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  // Update package selections from steps 2 and 3
  const handleComponentSelectionsChange = (newSelections) => {
    setPackageSelections((prev) => ({
      ...prev,
      ...newSelections
    }));
  };

  // Submit quote request
  const handleSubmitQuote = async ({ customerInfo, packageData, pricing }) => {
    setIsSubmitting(true);

    try {
      // Generate email HTML
      const emailHTML = generateQuoteEmailHTML(packageData, customerInfo);

      // Prepare data for backend
      const quoteData = {
        customerInfo,
        packageData: {
          attendees,
          ...packageData
        },
        pricing,
        emailHTML,
        timestamp: new Date().toISOString()
      };

      // Send quote to backend
      const response = await fetch(`${API_URL}/api/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      if (response.ok) {
        setOpenDialog(true);
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);

      // Show error message
      setSnackbarMessage('Hubo un error al enviar tu cotización. Por favor, inténtalo de nuevo o contáctanos directamente.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      // Fallback: Open email client with mailto link
      const subject = `Cotización Auraltune - ${customerInfo.name}`;
      const body = `
Hola Auraltune,

Me gustaría solicitar una cotización para mi evento.

Nombre: ${customerInfo.name}
Email: ${customerInfo.email}
Teléfono: ${customerInfo.phone}
Fecha del Evento: ${customerInfo.eventDate}
Número de Invitados: ${attendees}
Ubicación: ${packageData.location}

Servicios de interés:
${packageData.audio ? `- Audio: ${packageData.audio.title}` : ''}
${packageData.screen && packageData.screen.basePrice > 0 ? `- Pantallas: ${packageData.screen.title}` : ''}
${packageData.danceFloor ? `- Pista de Baile: ${packageData.danceFloor.title}` : ''}

Por favor envíenme una cotización formal.

Gracias!
      `.trim();

      const mailtoLink = `mailto:tuneaural@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open mailto after a delay to ensure user sees the error message
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dialog close handler
  const handleDialogClose = () => {
    setOpenDialog(false);
    setSnackbarMessage('¡Tu cotización ha sido enviada! Nos pondremos en contacto pronto.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    // Reset form after success
    setTimeout(() => {
      resetForm();
    }, 2000);
  };

  // Reset form
  const resetForm = () => {
    setActiveStep(0);
    setAttendees(100);
    setPackageSelections({
      audio: null,
      screen: null,
      danceFloor: null,
      lighting: [],
      effects: [],
      staff: []
    });
    setContactInfo({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      location: '',
      hasSecondFloor: false
    });
  };

  // Get step content
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <AttendeeSelector
            attendees={attendees}
            onAttendeesChange={setAttendees}
            onNext={handleNext}
          />
        );

      case 1:
        return (
          <ComponentBuilder
            attendees={attendees}
            selections={packageSelections}
            onSelectionsChange={handleComponentSelectionsChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 2:
        return (
          <StaffSelector
            selections={packageSelections}
            onSelectionsChange={handleComponentSelectionsChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 3:
        return (
          <QuoteSummary
            attendees={attendees}
            packageSelections={packageSelections}
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            onSubmit={handleSubmitQuote}
            onBack={handleBack}
          />
        );

      default:
        return 'Paso desconocido';
    }
  };

  // Prepare package data for LiveTotalSidebar
  const packageDataForSidebar = {
    ...packageSelections,
    attendees,
    location: contactInfo.location,
    hasSecondFloor: contactInfo.hasSecondFloor,
    startTime: contactInfo.startTime,
    endTime: contactInfo.endTime
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 pt-24 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <Typography variant="h3" className="font-bold text-gray-800 mb-2">
            Arma tu paquete
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            tu paquete perfecto en 4 simples pasos
          </Typography>
        </div>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel className="mb-8 bg-white rounded-lg p-4 shadow-md">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                <Typography variant="body2" className={activeStep === index ? 'font-bold text-blue-600' : ''}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Main Content Area */}
        <div className={activeStep === 0 ? "flex justify-center" : "grid lg:grid-cols-12 gap-6"}>
          {/* Main Content */}
          <div className={activeStep === 0 ? "w-full" : "lg:col-span-8"}>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <CircularProgress size={60} />
                  <Typography variant="h6" className="mt-4 text-gray-600">
                    Enviando tu cotización...
                  </Typography>
                </div>
              ) : (
                getStepContent(activeStep)
              )}
            </div>
          </div>

          {/* Live Total Sidebar (Desktop) */}
          {activeStep >= 1 && (
            <div className="hidden lg:block lg:col-span-4">
              <LiveTotalSidebar
                packageData={packageDataForSidebar}
                showFlete={activeStep >= 3 && !!contactInfo.location}
                showSecondFloor={activeStep >= 3}
              />
            </div>
          )}
        </div>

        {/* Live Total Bottom Bar (Mobile) */}
        {activeStep >= 1 && (
          <LiveTotalBottomBar
            packageData={packageDataForSidebar}
            showFlete={activeStep >= 3 && !!contactInfo.location}
            showSecondFloor={activeStep >= 3}
          />
        )}
      </div>

      {/* Success Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="bg-green-50 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">✅</span>
            <Typography variant="h6" className="font-bold text-green-800">
              ¡Cotización Enviada!
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent className="mt-2 text-center">
          <Typography variant="body1" className="text-gray-700">
            Te contactaremos pronto
          </Typography>
        </DialogContent>
        <DialogActions className="justify-center pb-4">
          <Button onClick={handleDialogClose} variant="contained" color="success" autoFocus>
            Listo
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default Cotizador;
