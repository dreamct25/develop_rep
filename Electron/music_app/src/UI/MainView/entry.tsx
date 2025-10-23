import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import '@/i18n_F_Set'
import GlobalStyles from '@/UI/GlobalStyles'
import App from './App'
import store from './store'

const root = createRoot(document.querySelector('.app'))

const styles = document.createElement('style')

styles.textContent = `
.app {    
    position: relative;
    height: 100vh;
}
`
document.head.appendChild(styles)

document.querySelector('.app').classList.add(GlobalStyles)

root.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)