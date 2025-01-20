import { createRoot } from 'react-dom/client'
import App from './App';
import '@/i18n_F_Set'
import GlobalStyle from '@/UI/GlobalStyles';

const root = createRoot(document.querySelector("#root"))

document.querySelector("#root").classList.add(GlobalStyle)

root.render(<App />)