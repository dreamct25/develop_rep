import { createRoot } from 'react-dom/client'
import GlobalStyles from '@/GlobalStyles'
import App from '@/App'

const root = createRoot(document.getElementById('root')!)

document.getElementById('root')?.classList.add(GlobalStyles)

root.render(<App />)