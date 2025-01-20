import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './globalStyles.ts'
import './i18nextInit.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className={GlobalStyles}>
    <App />
  </div>
  ,
)
