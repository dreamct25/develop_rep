import { createContext, useEffect } from 'react'
import { TFunction, i18n as i18nType } from 'i18next'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { IndexedDB, $ } from './utiles'
import { MainThem } from './MainThem'

interface ProvideType {
  IndexedDB: typeof IndexedDB,
  formatLanguage: TFunction<"translation", undefined> 
  i18n: i18nType,
  toast: typeof toast
  $: $
}

export const NewContext = createContext<ProvideType>({
  IndexedDB,
  formatLanguage:  {} as TFunction<"translation", undefined>,
  i18n: {} as i18nType,
  toast,
  $
})

const App:FC = (): TSX => {

  const { t: formatLanguage, i18n } = useTranslation()

  const provides: ProvideType = {
    IndexedDB,
    formatLanguage,
    i18n,
    toast,
    $
  }

  return (
    <NewContext.Provider value={provides}>
      <MainThem />
    </NewContext.Provider>
    
  )
}

export default App
