import { createRoot } from 'react-dom/client'
import { WhenStartLoading } from '../../component'
import GlobalStyles from '../GlobalStyles'
import '@/i18n_F_Set'

const root = createRoot(document.querySelector('.root-loading'))

document.querySelector('.root-loading').classList.add(GlobalStyles)

root.render(<WhenStartLoading />)