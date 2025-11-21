# 🚀 Guía de Deployment - Auraltune

Esta guía te llevará paso a paso para deployar el frontend y backend de Auraltune.

## 📋 Resumen del Stack

```
Frontend (Client)  →  Vercel
Backend (Server)   →  Railway
Database          →  (Futuro: Supabase/Railway PostgreSQL)
```

---

## 1️⃣ Preparar el Repositorio en GitHub

### Si es un Fork (tu caso):

```bash
# Ver el estado actual
git status

# Agregar todos los cambios
git add .

# Hacer commit
git commit -m "feat: Add package builder with backend API

- Interactive package builder for event quotes
- Backend API with Express + Nodemailer
- Email notifications for quotes and confirmations
- Security improvements (CORS, rate limiting, validation)
- Address autocomplete with Google Maps API
- Enhanced UI components"

# Push a tu fork
git push origin mi-rama-de-cambios
```

### Crear Pull Request:

1. Ve a tu fork en GitHub
2. Click "Compare & pull request"
3. Describe los cambios
4. Click "Create pull request"
5. Espera aprobación de Eugenio

---

## 2️⃣ Deploy Backend en Railway

### Paso 1: Crear Cuenta
1. Ve a [railway.app](https://railway.app)
2. Sign up con GitHub
3. Autoriza Railway a acceder a tus repos

### Paso 2: Crear Proyecto
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Busca `auraltune_landing_page`
4. Click en el repo

### Paso 3: Configurar el Proyecto

Railway detectará automáticamente el proyecto Node.js.

**Configurar Root Directory:**
1. En el dashboard del proyecto, click en el servicio
2. Ve a **Settings** → **Service**
3. Busca **Root Directory**
4. Escribe: `server`
5. Click **Save**

### Paso 4: Variables de Entorno

Ve a la pestaña **Variables** y agrega:

```bash
NODE_ENV=production
PORT=3001

# Frontend URL - Actualizar después de deployar frontend
FRONTEND_URL=http://localhost:5173

# Email Config
EMAIL_USER=tuneaural@gmail.com
RECIPIENT_EMAIL=tuneaural@gmail.com

# Gmail App Password - Obtener de Google Account
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

### Paso 5: Deploy

1. Railway empezará a deployar automáticamente
2. Espera ~2-3 minutos
3. Una vez completado, verás el estado "Active"
4. Click en **Settings** → **Networking**
5. Click **Generate Domain**
6. Copia la URL (ej: `https://auraltune-backend-production.up.railway.app`)

### Paso 6: Verificar

Abre en el navegador:
```
https://tu-backend.up.railway.app/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "message": "Auraltune API is running"
}
```

---

## 3️⃣ Deploy Frontend en Vercel

### Paso 1: Preparar Variables de Entorno

Crea/actualiza `client/.env`:

```bash
# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_de_google

# Cloudinary (si usas)
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name

# Backend API URL - Usar la URL de Railway
VITE_API_URL=https://tu-backend.up.railway.app
```

### Paso 2: Actualizar Código del Frontend

Asegúrate de que tu frontend use la variable de entorno para la API:

```javascript
// En Cotizador.jsx o donde hagas el fetch
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const response = await fetch(`${API_URL}/api/quotes`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(quoteData)
});
```

### Paso 3: Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import tu repositorio
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Paso 4: Variables de Entorno en Vercel

1. En la configuración del proyecto
2. Ve a **Settings** → **Environment Variables**
3. Agrega:
   ```
   VITE_GOOGLE_MAPS_API_KEY=tu_key
   VITE_CLOUDINARY_CLOUD_NAME=tu_cloud
   VITE_API_URL=https://tu-backend.up.railway.app
   ```

### Paso 5: Deploy

1. Click **"Deploy"**
2. Espera ~2-3 minutos
3. Vercel te dará una URL: `https://auraltune-landing-page.vercel.app`

---

## 4️⃣ Conectar Frontend y Backend

### Actualizar CORS en Backend

1. Ve a Railway
2. Abre tu proyecto backend
3. Ve a **Variables**
4. Actualiza `FRONTEND_URL` con la URL de Vercel:
   ```
   FRONTEND_URL=https://auraltune-landing-page.vercel.app
   ```
5. Railway redeploya automáticamente

### Probar la Integración

1. Ve a tu sitio en Vercel
2. Navega al cotizador
3. Llena un formulario
4. Envía
5. Verifica que llegue el email a `tuneaural@gmail.com`

---

## 5️⃣ Configuración de Gmail App Password

Si aún no tienes el App Password:

1. Ve a [Google Account Security](https://myaccount.google.com/security)
2. Activa **Verificación en 2 pasos**
3. Ve a [App Passwords](https://myaccount.google.com/apppasswords)
4. Selecciona:
   - **App:** Mail
   - **Device:** Other (Custom name) → "Auraltune Backend"
5. Click **Generate**
6. Copia el password de 16 caracteres
7. Pégalo en Railway Variables como `EMAIL_APP_PASSWORD`

---

## 📊 Monitoreo

### Railway Dashboard

Ve a tu proyecto en Railway:
- **Metrics:** Uso de CPU, RAM, Network
- **Logs:** Ver logs en tiempo real
- **Usage:** Cuánto crédito has gastado

### Vercel Dashboard

Ve a tu proyecto en Vercel:
- **Analytics:** Visitas, performance
- **Logs:** Errores del frontend
- **Deployments:** Historial de deploys

---

## 🔧 Troubleshooting

### Backend no responde
```bash
# Ver logs en Railway
1. Ve a tu proyecto
2. Click en el servicio
3. Ve a "Logs"
4. Busca errores
```

### CORS errors
```bash
# Verificar que FRONTEND_URL esté correcto en Railway
FRONTEND_URL=https://tu-dominio-exacto.vercel.app

# Sin trailing slash!
```

### Emails no llegan
```bash
# Verificar en Railway logs:
1. ¿Hay errores de autenticación?
2. ¿EMAIL_APP_PASSWORD está correcto?
3. ¿EMAIL_USER es el correcto?

# Probar con curl:
curl -X POST https://tu-backend.up.railway.app/api/quotes \
  -H "Content-Type: application/json" \
  -d '{"customerInfo":{"name":"Test","email":"test@test.com"},...}'
```

---

## 💰 Costos Estimados

### Railway (Backend)
- **Free:** $5 crédito/mes
- **Uso esperado:** $0.50 - $2/mes
- **✅ Gratis los primeros meses**

### Vercel (Frontend)
- **Free:** 100GB bandwidth, unlimited sites
- **Uso esperado:** Dentro del plan gratis
- **✅ Gratis**

### Total: **$0/mes** 🎉

---

## 📝 Checklist Final

- [ ] Backend deployed en Railway
- [ ] Variables de entorno configuradas en Railway
- [ ] Frontend deployed en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] FRONTEND_URL actualizado en Railway
- [ ] Prueba enviando una cotización
- [ ] Email recibido en tuneaural@gmail.com
- [ ] Email de confirmación recibido por el cliente

---

## 🎉 ¡Listo!

Tu aplicación está en producción. Ahora puedes:

1. Compartir el link de Vercel con clientes
2. Monitorear cotizaciones en tuneaural@gmail.com
3. Ver analytics en Railway y Vercel dashboards
4. Escalar cuando sea necesario

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en Railway y Vercel
2. Verifica las variables de entorno
3. Prueba los endpoints directamente
4. Contacta a tuneaural@gmail.com
