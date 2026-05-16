import { createContext } from 'react'
import { Main } from '@/container/Main'
import $ from '@/lib/Library'

const NewContext = createContext<{
    $: $,
    isPWA: boolean,
    isDesktop: boolean
}>({ $: $, isPWA: false, isDesktop: false })

const App: FC = ():TSX => {
    
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || navigator?.standalone === true

    const isDesktop = !navigator.userAgent.toLocaleLowerCase().includes('mobile') || !navigator.userAgent.toLocaleLowerCase().includes('iphone')

    const provider = { $, isPWA, isDesktop }

    return (
        <NewContext.Provider value={provider}>
            <Main />
        </NewContext.Provider>
    )
}

export { App, NewContext }
