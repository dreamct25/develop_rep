import { FC,createContext } from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import { t } from 'i18next'
import { Main } from './container'
import { $,PickerUtils } from './utils'

export const NewContext = createContext<{
    $:$,
    PickerUtils:PickerUtils,
    formatLanguage:TFunction<"translation", undefined>
}>({
    $:$,
    PickerUtils:new PickerUtils(),
    formatLanguage:t
})

const App:FC = ():JSX.Element => {
    const { t:formatLanguage }: { t: TFunction<"translation", undefined> } = useTranslation()

    return (
        <NewContext.Provider value={{ $,PickerUtils:new PickerUtils(),formatLanguage }}>
            <Main />
        </NewContext.Provider>
    )
}

export default App
