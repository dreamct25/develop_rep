import { createRoot } from 'react-dom/client'
import GlobalStyle from './globalStyles'
import App from './App'
import './i18Init'

const root = document.getElementById('root')

if(root) {

  createRoot(root).render(
    <div className={GlobalStyle}>
      <App />
    </div>
  )
}
