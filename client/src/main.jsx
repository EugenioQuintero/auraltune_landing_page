import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://9bddc2bbd63b96eef7ed6343e42b71ff@o4507534905835520.ingest.us.sentry.io/4508331331158016",
  integrations: [Sentry.browserTracingIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.2,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", ],
});

createRoot(document.getElementById('root')).render(
  <StrictMode>

      <App />    
  </StrictMode>,
)
