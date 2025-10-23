import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './globalStyles.ts'
import WaitingI18NInit from './i18nextInit.ts'

WaitingI18NInit(() => 
  createRoot(document.getElementById('root')!).render(
    <div className={GlobalStyles}>
      <App />
    </div>
  )
)
