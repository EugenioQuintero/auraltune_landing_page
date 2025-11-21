# 📧 Guía de Configuración del Sistema de Email

Esta guía te ayudará a configurar el sistema de email para recibir cotizaciones automáticamente en **tuneaural@gmail.com**.

---

## ✅ Prerrequisitos

- Acceso a la cuenta de Gmail: **tuneaural@gmail.com**
- Node.js instalado en tu computadora
- Ambos proyectos (client y server) descargados

---

## 🔧 Paso 1: Configurar Gmail App Password

Para que el servidor pueda enviar emails desde tu cuenta de Gmail, necesitas crear una **App Password** (no uses tu contraseña regular).

### 1.1 Habilitar Verificación en 2 Pasos

1. Ve a tu cuenta de Google: https://myaccount.google.com
2. En el menú lateral, haz clic en **"Seguridad"**
3. Busca la sección **"Acceso a Google"**
4. Haz clic en **"Verificación en 2 pasos"**
5. Sigue los pasos para habilitarla (necesitarás tu teléfono)

### 1.2 Crear App Password

1. Una vez habilitada la verificación en 2 pasos, regresa a: https://myaccount.google.com/security
2. En la sección **"Acceso a Google"**, busca **"Contraseñas de aplicaciones"**
   - Si no lo ves, busca directamente: https://myaccount.google.com/apppasswords
3. Te pedirá tu contraseña de Google (ingrésala)
4. En "Seleccionar app", elige: **"Correo"**
5. En "Seleccionar dispositivo", elige: **"Otro (nombre personalizado)"**
6. Escribe: **"Auraltune Backend"**
7. Haz clic en **"Generar"**
8. **¡IMPORTANTE!** Copia la contraseña de 16 caracteres que aparece (ejemplo: `abcd efgh ijkl mnop`)
   - Guárdala en un lugar seguro
   - Solo se muestra una vez
   - Los espacios no importan, puedes copiarla con o sin ellos

---

## 🗂️ Paso 2: Crear el archivo .env

Ahora necesitas crear un archivo de configuración con tus credenciales de email.

1. Abre tu terminal
2. Ve a la carpeta del servidor:
   ```bash
   cd /Users/miguelgarnica/auraltune_landing_page/server
   ```

3. Crea el archivo `.env` copiando el ejemplo:
   ```bash
   cp .env.example .env
   ```

4. Abre el archivo `.env` con un editor de texto:
   ```bash
   open .env
   ```
   O usa tu editor favorito (VS Code, Sublime, etc.)

5. Edita el archivo `.env` y reemplaza con tus valores:
   ```env
   PORT=3001
   NODE_ENV=development
   EMAIL_USER=tuneaural@gmail.com
   EMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

   **⚠️ IMPORTANTE:**
   - Reemplaza `abcdefghijklmnop` con la contraseña de 16 caracteres que copiaste
   - Puedes escribirla con o sin espacios
   - NO uses tu contraseña de Gmail regular

6. Guarda el archivo `.env`

---

## 📦 Paso 3: Instalar Dependencias del Servidor

Si aún no lo has hecho, instala las dependencias del servidor:

```bash
cd /Users/miguelgarnica/auraltune_landing_page/server
npm install
```

Esto instalará:
- Express (servidor web)
- Nodemailer (envío de emails)
- CORS (seguridad)
- dotenv (variables de entorno)

---

## 🚀 Paso 4: Iniciar el Backend

### Opción A: Modo Desarrollo (con auto-reload)

```bash
cd /Users/miguelgarnica/auraltune_landing_page/server
npm run dev
```

### Opción B: Modo Producción

```bash
cd /Users/miguelgarnica/auraltune_landing_page/server
npm start
```

**✅ Si todo está bien, verás:**
```
🎵 ============================================
   AURALTUNE API Server
   ============================================
   🚀 Server running on port 3001
   📧 Email service: Configured ✓
   🌍 Environment: development
   ============================================
```

**❌ Si ves una advertencia:**
```
⚠️  WARNING: Email credentials not configured!
```
Significa que el archivo `.env` no está bien configurado. Revisa el Paso 2.

---

## 🌐 Paso 5: Iniciar el Frontend

En una nueva terminal (mantén el backend corriendo):

```bash
cd /Users/miguelgarnica/auraltune_landing_page/client
npm run dev
```

El cliente se conectará automáticamente al backend gracias al proxy configurado en `vite.config.js`.

---

## 🧪 Paso 6: Probar el Sistema

1. Abre tu navegador en: http://localhost:5173 (o el puerto que muestre Vite)
2. Ve al **Cotizador** (botón "Arma tu paquete")
3. Completa todos los pasos:
   - Selecciona número de invitados
   - Arma tu paquete (audio, pantallas, etc.)
   - Selecciona staff
   - Completa el formulario de contacto (usa tu email real para recibir confirmación)
4. Haz clic en **"Solicitar Cotización"**

### ✅ Resultado Esperado:

1. **En el navegador:**
   - Aparecerá un modal verde: "¡Cotización Enviada!"
   - Mensaje de confirmación

2. **En la terminal del servidor:**
   ```
   📩 Nueva cotización recibida: { customer: 'Nombre', email: '...', timestamp: '...' }
   ✅ Emails enviados exitosamente
   ```

3. **En tu bandeja de entrada (tuneaural@gmail.com):**
   - Recibirás un email con el asunto: **"Nueva Cotización - [Nombre del Cliente] - [Fecha]"**
   - El email tendrá:
     - ✅ Información completa del cliente (nombre, email, teléfono)
     - ✅ Detalles del evento (fecha, horario, duración)
     - ✅ **Dirección completa del evento**
     - ✅ **Botón "Ver ubicación en Google Maps"** (clickeable)
     - ✅ Todos los servicios seleccionados
     - ✅ Desglose de precios completo
     - ✅ Diseño profesional y limpio

4. **El cliente recibirá:**
   - Email de confirmación en su bandeja
   - Mensaje de que recibirá respuesta en 24-48 horas

---

## 🎨 Características del Email

El email que recibirás en **tuneaural@gmail.com** incluye:

### 📍 Ubicación con Google Maps
- **Dirección completa** del evento
- **Botón azul clickeable**: "Ver ubicación en Google Maps"
- Al hacer clic, se abre Google Maps con la dirección exacta
- También incluye el municipio (Monterrey, San Pedro, etc.)

### 👤 Información del Cliente
- Nombre completo
- Email (clickeable para responder)
- Teléfono (clickeable para llamar)

### 📅 Detalles del Evento
- Fecha del evento
- Hora de inicio y fin
- Duración total (en horas)
- Número de invitados
- Tipo de evento (Interior/Exterior)
- Si es 2º piso sin elevador

### 🎛️ Paquete Detallado
- Sistema de audio seleccionado
- Pantallas LED o DJ Booth
- Pista de baile (con dimensiones)
- Iluminación (con cantidades)
- Efectos especiales
- Staff contratado

### 💰 Desglose de Precios
- Subtotal de equipo
- Costo de staff
- Flete
- Horas extra (si aplica)
- **TOTAL ESTIMADO** destacado

### 🎨 Diseño Profesional
- Gradientes de color azul (brand de Auraltune)
- Emojis para fácil lectura
- Formato responsive (se ve bien en móvil y desktop)
- Secciones bien organizadas

---

## 🐛 Solución de Problemas

### Problema 1: "Email credentials not configured"

**Causa:** El archivo `.env` no existe o está mal configurado.

**Solución:**
1. Verifica que el archivo `.env` existe en `/server/`
2. Abre el archivo y verifica que tiene:
   ```env
   EMAIL_USER=tuneaural@gmail.com
   EMAIL_APP_PASSWORD=tu-contraseña-de-16-caracteres
   ```
3. Reinicia el servidor

### Problema 2: "Auth failed" o "Invalid login"

**Causa:** La App Password es incorrecta o no se creó correctamente.

**Solución:**
1. Verifica que la verificación en 2 pasos está habilitada en tu cuenta de Google
2. Genera una nueva App Password (Paso 1.2)
3. Actualiza el archivo `.env` con la nueva contraseña
4. **IMPORTANTE:** Usa la App Password, NO tu contraseña regular de Gmail
5. Reinicia el servidor

### Problema 3: El email no llega

**Causa:** Puede estar en spam o el email está mal escrito.

**Solución:**
1. Revisa la carpeta de **Spam** en tuneaural@gmail.com
2. Verifica en la terminal del servidor que dice: `✅ Emails enviados exitosamente`
3. Verifica que `EMAIL_USER=tuneaural@gmail.com` está correcto en `.env`
4. Si usas un correo diferente, actualiza la línea 58 de `server.js`:
   ```javascript
   to: 'tuneaural@gmail.com',  // Cambia esto si usas otro email
   ```

### Problema 4: "Cannot POST /api/quotes"

**Causa:** El backend no está corriendo o hay un error en el proxy.

**Solución:**
1. Verifica que el servidor está corriendo: `npm run dev` en `/server/`
2. Verifica que el puerto 3001 está libre:
   ```bash
   lsof -i :3001
   ```
3. Si el puerto está ocupado, cambia PORT en `.env`:
   ```env
   PORT=3002
   ```
   Y actualiza `vite.config.js` en el cliente para que apunte al nuevo puerto.

### Problema 5: "CORS error"

**Causa:** Problema de configuración entre frontend y backend.

**Solución:**
1. Verifica que ambos servidores están corriendo (frontend en 5173, backend en 3001)
2. Verifica que `vite.config.js` tiene el proxy configurado:
   ```javascript
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3001',
         changeOrigin: true
       }
     }
   }
   ```
3. Reinicia ambos servidores

### Problema 6: El botón de Google Maps no funciona

**Causa:** La dirección no se está pasando correctamente.

**Solución:**
1. Verifica que el usuario completó la dirección en el formulario
2. Verifica en el email que la sección "Ubicación del Evento" aparece
3. Si no aparece, revisa que `customerInfo.address` tiene un valor

---

## 🔒 Seguridad

### ⚠️ IMPORTANTE: NO SUBAS EL .env A GIT

El archivo `.env` contiene tu contraseña y **nunca** debe subirse a Git/GitHub.

**Ya está protegido** porque:
- El archivo `.gitignore` ya incluye `.env`
- Solo existe en tu computadora local

**Para verificar:**
```bash
cd /Users/miguelgarnica/auraltune_landing_page/server
cat .gitignore
```

Debes ver una línea que dice:
```
.env
```

### 🔐 Límites de Gmail

Gmail con App Password tiene estos límites:
- **500 emails por día** (más que suficiente para cotizaciones)
- Si necesitas más, considera usar SendGrid (3,000 emails/mes gratis)

---

## 🚀 Despliegue a Producción (Vercel)

Cuando estés listo para publicar tu sitio:

### Backend (Vercel)

1. Crea un proyecto en Vercel para el backend
2. En la configuración del proyecto, añade las variables de entorno:
   - `NODE_ENV=production`
   - `EMAIL_USER=tuneaural@gmail.com`
   - `EMAIL_APP_PASSWORD=tu-contraseña-de-16-caracteres`
3. Despliega la carpeta `/server`

### Frontend (Vercel)

1. Crea otro proyecto en Vercel para el frontend
2. Actualiza el archivo `Cotizador.jsx` para que use la URL de producción del backend:
   ```javascript
   const response = await fetch('https://tu-backend.vercel.app/api/quotes', {
   ```
3. Despliega la carpeta `/client`

---

## 📊 Monitoreo

### Ver logs del servidor

Mientras el servidor está corriendo, verás en la terminal:

```
📩 Nueva cotización recibida: { customer: 'Juan Pérez', email: 'juan@example.com', timestamp: '...' }
✅ Emails enviados exitosamente
```

### Verificar que los emails se están enviando

1. Cada vez que alguien solicita una cotización, verás los logs arriba
2. Recibirás el email en **tuneaural@gmail.com**
3. El cliente recibirá su email de confirmación

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisa los logs** en la terminal del servidor
2. **Revisa la sección de Solución de Problemas** arriba
3. **Verifica que:**
   - ✅ Verificación en 2 pasos está habilitada
   - ✅ App Password fue creada correctamente
   - ✅ Archivo `.env` tiene los valores correctos
   - ✅ Ambos servidores están corriendo

---

## ✅ Checklist Final

Antes de dar por completada la configuración:

- [ ] Verificación en 2 pasos habilitada en Gmail
- [ ] App Password de 16 caracteres creada
- [ ] Archivo `.env` creado con las credenciales correctas
- [ ] Dependencias del servidor instaladas (`npm install`)
- [ ] Servidor backend corriendo sin errores
- [ ] Cliente frontend corriendo
- [ ] Prueba completa realizada (cotización enviada y recibida)
- [ ] Email recibido en tuneaural@gmail.com con:
  - [ ] Información del cliente
  - [ ] Dirección completa
  - [ ] Botón de Google Maps funcionando
  - [ ] Desglose de precios
  - [ ] Diseño profesional
- [ ] Cliente recibió email de confirmación

---

## 🎉 ¡Listo!

Tu sistema de cotizaciones está configurado y funcionando. Ahora cada vez que un cliente solicite una cotización:

1. ✅ Recibirás un email profesional en **tuneaural@gmail.com**
2. ✅ Con toda la información necesaria para contactar al cliente
3. ✅ Con un botón directo a Google Maps para ver la ubicación
4. ✅ Con el desglose completo de servicios y precios
5. ✅ El cliente recibirá una confirmación automática

**¡Auraltune está listo para recibir cotizaciones! 🎵**
