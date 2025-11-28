// Auraltune Backend API Server
// Handles quote submissions and sends emails

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration - Permite múltiples dominios frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://auraltune.com',
  'https://www.auraltune.com',
  'https://auraltune.com.mx',
  'https://www.auraltune.com.mx',
  'https://auraltune-landing-page.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS: Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Rate limiting simple (previene spam)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const MAX_REQUESTS = 5; // 5 requests por minuto

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  const timestamps = requestCounts.get(ip).filter(time => now - time < RATE_LIMIT_WINDOW);

  if (timestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.'
    });
  }

  timestamps.push(now);
  requestCounts.set(ip, timestamps);
  next();
};

app.use('/api/quotes', rateLimiter);

// Email configuration with nodemailer
// You'll need to configure your Gmail account or SMTP settings
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_APP_PASSWORD // Gmail App Password (not your regular password)
    }
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Auraltune API is running' });
});

// Quote submission endpoint
app.post('/api/quotes', async (req, res) => {
  try {
    const { customerInfo, packageData, pricing, emailHTML, timestamp } = req.body;

    console.log('📩 Nueva cotización recibida:', {
      customer: customerInfo.name,
      email: customerInfo.email,
      timestamp
    });

    // Validate required fields
    if (!customerInfo || !customerInfo.email || !customerInfo.name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required customer information'
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Validación de datos básicos
    if (customerInfo.name.length > 200 || customerInfo.email.length > 200) {
      return res.status(400).json({
        success: false,
        error: 'Input data too long'
      });
    }

    // Create email transporter
    const transporter = createTransporter();

    // Email to Auraltune
    const mailToAuraltune = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'tuneaural@gmail.com',
      subject: `Nueva Cotización - ${customerInfo.name} - ${customerInfo.eventDate}`,
      html: emailHTML,
      // Also include plain text version
      text: `
🎵 AURALTUNE - Nueva Solicitud de Cotización
============================================

📋 INFORMACIÓN DEL CLIENTE
Nombre: ${customerInfo.name}
Email: ${customerInfo.email}
Teléfono: ${customerInfo.phone}

📅 DETALLES DEL EVENTO
Fecha: ${customerInfo.eventDate}
${customerInfo.startTime ? `Hora de Inicio: ${customerInfo.startTime}` : ''}
${customerInfo.endTime ? `Hora de Fin: ${customerInfo.endTime}` : ''}
Invitados: ${packageData.attendees}
${customerInfo.eventType ? `Tipo: ${customerInfo.eventType === 'interior' ? 'Interior' : 'Exterior'}` : ''}
${packageData.hasSecondFloor ? 'Montaje: 2º piso sin elevador (+$1,000)' : ''}

📍 UBICACIÓN
${customerInfo.address || 'No proporcionada'}
Municipio: ${packageData.location}
${customerInfo.address ? `\nGoogle Maps: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerInfo.address)}` : ''}

🎛️ PAQUETE SELECCIONADO
Audio: ${packageData.audio?.title || 'No seleccionado'}
${packageData.screen ? `Pantallas/DJ Booth: ${packageData.screen.title}` : ''}
${packageData.danceFloor ? `Pista de Baile: ${packageData.danceFloor.title}` : ''}
${packageData.lighting?.length > 0 ? `Iluminación: ${packageData.lighting.length} items` : ''}
${packageData.effects?.length > 0 ? `Efectos: ${packageData.effects.length} items` : ''}
${packageData.staff?.length > 0 ? `Staff: ${packageData.staff.map(s => s.name).join(', ')}` : ''}

💰 PRECIO ESTIMADO
Total: $${pricing?.total?.toLocaleString('es-MX') || 0}

⏰ Timestamp: ${timestamp}

---
Responde a este email o llama al cliente para confirmar detalles.
      `
    };

    // Email confirmation to customer
    const mailToCustomer = {
      from: process.env.EMAIL_USER,
      to: customerInfo.email,
      subject: 'Confirmación - Tu Solicitud de Cotización Auraltune',
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .header { background-color: #005ad1; color: white; padding: 20px; text-align: center; }
              .content { padding: 30px; }
              .footer { background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>AURALTUNE</h1>
              <h2>Confirmación de Solicitud</h2>
            </div>
            <div class="content">
              <p>Hola ${customerInfo.name},</p>

              <p>¡Gracias por tu interés en Auraltune!</p>

              <p>Hemos recibido tu solicitud de cotización para tu evento del <strong>${customerInfo.eventDate}</strong>.</p>

              <p>Nuestro equipo revisará los detalles y te enviará una cotización formal dentro de las próximas 24-48 horas.</p>

              <p>Si tienes alguna pregunta urgente, no dudes en contactarnos:</p>
              <ul>
                <li>Email: tuneaural@gmail.com</li>
                <li>WhatsApp: [Tu número de WhatsApp]</li>
              </ul>

              <p>¡Estamos emocionados de ser parte de tu evento!</p>

              <p>Saludos,<br/>
              <strong>El Equipo de Auraltune</strong></p>
            </div>
            <div class="footer">
              <p>Sonido, iluminación y DJ para elevar el aura de tu celebración</p>
              <p><small>Este es un email automático, por favor no respondas a este mensaje.</small></p>
            </div>
          </body>
        </html>
      `,
      text: `
Hola ${customerInfo.name},

¡Gracias por tu interés en Auraltune!

Hemos recibido tu solicitud de cotización para tu evento del ${customerInfo.eventDate}.

Nuestro equipo revisará los detalles y te enviará una cotización formal dentro de las próximas 24-48 horas.

Si tienes alguna pregunta urgente, contáctanos en tuneaural@gmail.com

¡Estamos emocionados de ser parte de tu evento!

Saludos,
El Equipo de Auraltune
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailToAuraltune),
      transporter.sendMail(mailToCustomer)
    ]);

    console.log('✅ Emails enviados exitosamente');

    res.json({
      success: true,
      message: 'Quote submitted successfully'
    });

  } catch (error) {
    console.error('❌ Error al procesar cotización:', error);

    res.status(500).json({
      success: false,
      error: 'Failed to submit quote',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
🎵 ============================================
   AURALTUNE API Server
   ============================================
   🚀 Server running on port ${PORT}
   📧 Email service: ${process.env.EMAIL_USER ? 'Configured ✓' : 'NOT CONFIGURED ⚠️'}
   🌍 Environment: ${process.env.NODE_ENV || 'development'}
   ============================================
  `);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.warn(`
⚠️  WARNING: Email credentials not configured!

    Please create a .env file with:
    EMAIL_USER=your-email@gmail.com
    EMAIL_APP_PASSWORD=your-app-password

    See README for setup instructions.
    `);
  }
});

module.exports = app;
