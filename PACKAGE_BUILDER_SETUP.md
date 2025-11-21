# Auraltune Interactive Package Builder - Setup Guide

🎉 **Your new interactive package builder is ready!**

This guide will help you get everything up and running.

## What's New?

Your package builder now features a **4-step interactive flow** inspired by the McDonald's menu customizer:

### Step 1: Attendee Count
- User enters number of guests (20-500)
- System automatically recommends audio and dance floor based on this number
- Shows preview of recommended packages

### Step 2: Build Your Package
- **Audio:** Pre-selected based on attendee count, can be changed
- **LED Screens/DJ Booth:** 5 options from basic to full setup with banners
- **Dance Floor:** Infinity Gold pista with 4 size options
- **Lighting:** Quantity selectors for towers and PAR LEDs
- **Effects:** Smoke machines (max 2)

### Step 3: Staff & Services
- DJ ($2,500)
- VJ ($2,000) - requires LED screens
- Host/Animador ($1,500)

### Step 4: Summary & Quote Request
- Event date selector
- Location dropdown (only valid cities)
- Second floor surcharge checkbox
- Contact form (name, email, phone)
- Complete itemized breakdown
- Shows all disclaimers

### Live Total Sidebar
- Sticky sidebar (desktop) / bottom bar (mobile)
- Updates in real-time as selections change
- Expandable detailed breakdown
- Includes flete, technical production, surcharges

## Quick Start (Development)

### 1. Install Dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 2. Configure Email

Create `server/.env`:
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=3001
NODE_ENV=development
EMAIL_USER=tuneaural@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
```

**To get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Create password for "Mail" → "Other (Auraltune)"
5. Copy the 16-character code
6. Paste in `.env` as `EMAIL_APP_PASSWORD`

### 3. Run Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on http://localhost:5173

### 4. Test the Flow

1. Navigate to http://localhost:5173/cotizador
2. Go through all 4 steps
3. Submit a test quote
4. Check that emails arrive at tuneaural@gmail.com

## File Structure

### New Files Created

```
client/src/
├── components/
│   ├── AttendeeSelector.jsx          # Step 1: Attendee count input
│   ├── ComponentBuilder.jsx          # Step 2: Package builder
│   ├── StaffSelector.jsx             # Step 3: Staff services
│   ├── LiveTotalSidebar.jsx          # Real-time total display
│   └── assets.js                     # ✨ Completely restructured catalog data
├── utils/
│   └── pricingUtils.js               # Pricing calculations
└── pages/
    └── Cotizador.jsx                 # ✨ Completely rewritten 4-step flow

server/
├── server.js                         # Express API + email handling
├── package.json                      # Backend dependencies
├── .env.example                      # Environment template
└── README.md                         # Backend documentation
```

### Modified Files

- `client/src/components/QuoteSummary.jsx` - Enhanced with location/surcharges
- `client/vite.config.js` - Added API proxy

## Catalog Data Structure

All catalog data from your PDF has been structured in `client/src/components/assets.js`:

- **Audio Packages:** 5 tiers based on attendee ranges
- **LED Screens:** 5 configurations (Basic to Full Setup)
- **Dance Floors:** 4 module sizes (9, 12, 16, 20)
- **Lighting:** 3 types with quantity selection
- **Special Effects:** Smoke machines
- **Staff Services:** DJ, VJ, Host
- **Additional Costs:** Flete ($500), Second Floor ($1,000), Technical Production (auto-calculated)

### Helper Functions

- `getRecommendedAudio(attendees)` - Auto-selects audio based on guest count
- `getRecommendedDanceFloor(attendees)` - Calculates ideal floor size (35% dancing simultaneously)
- `getRecommendedLighting(attendees)` - Suggests lighting quantities

## Pricing Logic

All pricing is calculated in `client/src/utils/pricingUtils.js`:

```javascript
Total = Equipment + Staff + Technical Production + Flete + Surcharges
```

**Technical Production:** Auto-calculated based on setup complexity
- Base: $600
- +$200 per complexity point
- Factors: # of components, event size, lighting count
- Capped at $2,000

**Flete:** $500 minimum for valid locations
- Monterrey, San Pedro, Santiago, Cumbres, San Jerónimo, Guadalupe

**Second Floor:** +$1,000 (optional checkbox)

## Email Flow

When a user submits:

1. **Frontend** sends POST to `/api/quotes` with:
   - Customer info
   - Package selections
   - Pricing breakdown
   - HTML email template

2. **Backend** sends 2 emails:
   - To **tuneaural@gmail.com**: Full quote with all details
   - To **customer**: Confirmation with 24-48hr response time

3. **Fallback:** If backend fails, opens mailto: link so customer can send email manually

## Testing Checklist

- [ ] Step 1: Enter attendee count, verify recommendations
- [ ] Step 2: Select audio, screens, floor, lighting, effects
- [ ] Step 3: Add DJ, VJ (requires screens), Host
- [ ] Step 4: Fill contact form, select location, submit
- [ ] Verify live total updates in sidebar
- [ ] Check email arrives at tuneaural@gmail.com
- [ ] Check customer confirmation email
- [ ] Test mobile responsive design
- [ ] Test back button navigation
- [ ] Test validation (missing fields, invalid email, etc.)

## Customization

### Change Prices

Edit `client/src/components/assets.js`:
```javascript
export const audioPackages = [
  {
    id: 'audio-intimo',
    title: 'Audio Íntimo',
    attendeeRange: { min: 0, max: 50 },
    basePrice: 1800,  // ← Change here
    priceDisplay: '$1,800',  // ← And here
    // ...
  }
]
```

### Add New Items

Follow the existing patterns in `assets.js`. Each item needs:
- `id`: Unique identifier
- `title`/`name`: Display name
- `basePrice`: Numeric value
- `priceDisplay`: Formatted string
- Additional metadata (description, image, etc.)

### Modify Email Templates

Edit `client/src/utils/pricingUtils.js` → `generateQuoteEmailHTML()` function

### Change Valid Locations

Edit `client/src/components/assets.js`:
```javascript
export const additionalCosts = {
  flete: {
    validLocations: ['Monterrey', 'San Pedro', ...] // ← Add/remove cities
  }
}
```

## Deployment

### Option 1: Monorepo Deployment (Recommended)

**Render.com / Railway.app:**

1. Connect your GitHub repo
2. Create two services:
   - **Backend**: Root directory = `server`, Start command = `npm start`
   - **Frontend**: Root directory = `client`, Build command = `npm run build`
3. Set environment variables in backend:
   - `EMAIL_USER`
   - `EMAIL_APP_PASSWORD`
   - `NODE_ENV=production`
4. Update frontend env to point to backend URL

### Option 2: Separate Deployment

**Backend (Render/Railway/Heroku):**
- Deploy `server/` folder
- Note the deployed URL

**Frontend (Netlify/Vercel):**
- Deploy `client/` folder
- Update `Cotizador.jsx` line 101 to use backend URL:
  ```javascript
  const response = await fetch('https://your-backend.herokuapp.com/api/quotes', {
  ```

### Environment Variables for Production

**Backend:**
```
NODE_ENV=production
PORT=3001
EMAIL_USER=tuneaural@gmail.com
EMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

**Frontend (if needed):**
```
VITE_API_URL=https://your-backend-url.com
```

## Troubleshooting

### Emails not sending

1. Check `server/.env` has correct Gmail credentials
2. Verify using **App Password**, not regular password
3. Enable 2-Step Verification on Gmail
4. Check server logs: `npm run dev` in server folder

### CORS errors

- Ensure backend is running on port 3001
- Check vite.config.js has proxy configured
- If in production, add frontend URL to CORS allowlist in server.js

### Components not found

- Run `npm install` in `client/` folder
- Restart dev server

### Pricing not calculating

- Check browser console for errors
- Verify all selected items have `basePrice` property
- Check `pricingUtils.js` for calculation errors

## Next Steps

### Recommended Enhancements

1. **Add Image Upload:** Allow customers to upload event space photos
2. **PDF Quote Generation:** Generate downloadable PDF quotes
3. **Admin Dashboard:** View all submitted quotes
4. **Payment Integration:** Add Stripe/PayPal for deposits
5. **Calendar Integration:** Check availability for event dates
6. **WhatsApp Integration:** Send quote via WhatsApp
7. **Multi-language:** Add English version
8. **Analytics:** Track popular packages

### Security Improvements for Production

1. **Rate Limiting:** Prevent spam submissions
   ```bash
   npm install express-rate-limit
   ```

2. **Input Validation:** Add validation library
   ```bash
   npm install joi
   ```

3. **Dedicated Email Service:** Use SendGrid or Mailgun instead of Gmail
   - More reliable
   - Better deliverability
   - Professional sender reputation

4. **Environment Security:** Use secrets manager (AWS Secrets Manager, etc.)

## Support

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review `server/README.md` for backend-specific help
3. Check server logs: `cd server && npm run dev`
4. Check browser console for frontend errors
5. Contact support: tuneaural@gmail.com

## Architecture Diagram

```
User
  ↓
Frontend (React + Vite)
  ├─ Step 1: AttendeeSelector
  ├─ Step 2: ComponentBuilder
  ├─ Step 3: StaffSelector
  └─ Step 4: QuoteSummary
      ↓ (Submit)
Backend (Express + Nodemailer)
  ├─ POST /api/quotes
  ├─ Generate HTML email
  └─ Send 2 emails:
      ├─ → tuneaural@gmail.com (Full quote)
      └─ → customer@email.com (Confirmation)
```

## Key Features Implemented

✅ 4-step guided flow
✅ Smart recommendations based on attendee count
✅ Real-time total calculation
✅ Live sidebar with price breakdown
✅ Location validation (only valid cities)
✅ Second floor surcharge
✅ Flete calculation ($500 minimum)
✅ Technical production auto-calculation
✅ Email to tuneaural@gmail.com
✅ Customer confirmation email
✅ Mobile responsive design
✅ Form validation
✅ Error handling with mailto fallback
✅ All catalog items from PDF included
✅ Disclaimers about price estimates

---

**Built for Auraltune** 🎵
_Elevando el aura de cada celebración_

For technical questions about this implementation, refer to inline code comments and the READMEs in each directory.
