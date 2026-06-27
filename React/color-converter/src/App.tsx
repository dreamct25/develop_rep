import { FC,createContext } from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import { t as formatLanguage } from 'i18next'
import { RouterProvider } from '@tanstack/react-router'
import { $, PickerUtils } from './utils'
import routes from '@/router'

export const NewContext = createContext<{
    $: $,
    PickerUtils: typeof PickerUtils,
    formatLanguage: TFunction<"translation", undefined>
}>({
    $,
    PickerUtils,
    formatLanguage
})

const App: FC = (): TSX => {

    const { t: formatLanguage }: { t: TFunction<"translation", undefined> } = useTranslation()

    return (
        <NewContext.Provider value={{ $, PickerUtils, formatLanguage }}>
            <RouterProvider router={routes} />
        </NewContext.Provider>
    )
}

export default App
