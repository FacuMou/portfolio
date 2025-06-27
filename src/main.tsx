import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import App from './App.tsx'
import i18n from './i18n.ts'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback="loading">
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Suspense>
)
