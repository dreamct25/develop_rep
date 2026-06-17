import { createRoot } from 'react-dom/client'
import GlobalStyles from './globalStyles.ts'
import App from './App.tsx'

const root = document.getElementById('root')

if(root) {
  
  createRoot(root).render(
    <div className={GlobalStyles}>
      <App />
    </div>
  )
}
