# Auraltune Backend API

Backend server for handling quote submissions and sending emails for the Auraltune Package Builder.

## Features

- Express.js REST API
- Email notifications using Nodemailer
- Sends quotes to tuneaural@gmail.com
- Automatic confirmation emails to customers
- **CORS configured** for specific frontend domains
- **Rate limiting** (5 requests/minute per IP)
- **Input validation** (email format, data length)
- **Security improvements** (XSS prevention, sanitization)

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Configuration
EMAIL_USER=your-email@gmail.com
RECIPIENT_EMAIL=tuneaural@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
```

### 3. Gmail App Password Setup

To use Gmail for sending emails, you need to create an **App Password**:

1. Go to your Google Account: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select:
   - App: **Mail**
   - Device: **Other (Custom name)** → Type "Auraltune Backend"
5. Click **Generate**
6. Copy the 16-character password (spaces don't matter)
7. Paste it in your `.env` file as `EMAIL_APP_PASSWORD`

### 4. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Auraltune API is running"
}
```

### POST /api/quotes

Submit a quote request.

**Request Body:**
```json
{
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "8123456789",
    "eventDate": "2025-12-25"
  },
  "packageData": {
    "attendees": 100,
    "location": "Monterrey",
    "hasSecondFloor": false,
    "audio": { ... },
    "screen": { ... },
    "danceFloor": { ... },
    "lighting": [ ... ],
    "effects": [ ... ],
    "staff": [ ... ]
  },
  "pricing": {
    "total": 25000,
    "breakdown": { ... }
  },
  "emailHTML": "<html>...</html>",
  "timestamp": "2025-11-10T12:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote submitted successfully"
}
```

## Email Flow

When a quote is submitted:

1. **Email to Auraltune** (tuneaural@gmail.com)
   - Full quote details
   - Customer information
   - Complete breakdown
   - HTML formatted email

2. **Confirmation to Customer**
   - Thank you message
   - Expected response time (24-48 hours)
   - Contact information

## Frontend Integration

Update your frontend Vite config to proxy API requests:

**client/vite.config.js:**
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

Or update the fetch URL in your frontend to point to the backend:
```javascript
const response = await fetch('http://localhost:3001/api/quotes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(quoteData)
});
```

## Deployment

### Railway (Recommended) ⭐

Railway offers $5 free credits per month, perfect for this backend.

#### 1. Push to GitHub
```bash
git add .
git commit -m "Add backend API"
git push origin main
```

#### 2. Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `auraltune_landing_page` repository
5. Railway will auto-detect the Node.js project

#### 3. Configure Root Directory

Railway needs to know the server is in a subfolder:

1. In your Railway project, go to **Settings**
2. Under **Build**, set:
   - **Root Directory:** `server`
   - **Start Command:** `npm start` (auto-detected)

#### 4. Set Environment Variables

In Railway **Variables** tab, add:

```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
EMAIL_USER=tuneaural@gmail.com
RECIPIENT_EMAIL=tuneaural@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
```

⚠️ **Important:** Update `FRONTEND_URL` with your actual Vercel URL after deploying frontend.

#### 5. Deploy!

Railway will automatically build and deploy. You'll get a URL like:
```
https://your-backend.up.railway.app
```

#### 6. Update Frontend

In `client/.env`:
```env
VITE_API_URL=https://your-backend.up.railway.app
```

---

### Alternative: Render.com (Free with Sleep)

**Pros:** Completely free
**Cons:** Sleeps after 15 min inactivity (first request takes 30-60s)

1. Go to [render.com](https://render.com)
2. Create **New → Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables (same as Railway)

---

### Environment Variables for Production

Make sure to set these in your hosting platform:

```
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
EMAIL_USER=tuneaural@gmail.com
RECIPIENT_EMAIL=tuneaural@gmail.com
EMAIL_APP_PASSWORD=your-app-password
```

## Troubleshooting

### Emails not sending

1. **Check Gmail credentials:**
   - Verify `EMAIL_USER` is correct
   - Ensure you're using an **App Password**, not your regular password
   - Check that 2-Step Verification is enabled

2. **Check Gmail less secure apps:**
   - App Passwords bypass this, but double-check your Google security settings

3. **Check server logs:**
   ```bash
   npm run dev
   ```
   Look for error messages

### CORS errors

If you get CORS errors from the frontend:

1. Ensure the backend server is running
2. Check that `cors` is properly configured in `server.js`
3. Use the Vite proxy configuration (see Frontend Integration above)

### Port already in use

If port 3001 is already in use:
```bash
# Change PORT in .env file
PORT=3002
```

## Alternative: Using EmailJS or Formspree

If you don't want to manage a backend, you can use third-party services:

### EmailJS (Free tier available)
1. Sign up at https://www.emailjs.com/
2. Create an email service
3. Get your Service ID, Template ID, and Public Key
4. Update frontend to use EmailJS SDK instead of fetch

### Formspree (Free tier available)
1. Sign up at https://formspree.io/
2. Create a form
3. Get your form endpoint
4. Update frontend fetch URL to Formspree endpoint

## Security Notes

- Never commit `.env` file to git
- Always use App Passwords for Gmail
- Consider rate limiting for production
- Add request validation
- Consider using a dedicated email service (SendGrid, Mailgun) for production

## Support

For issues or questions:
- Email: tuneaural@gmail.com
- Check server logs: `npm run dev`
