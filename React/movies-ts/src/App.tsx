import { createContext } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { store, type Store } from './store'
import routes from './routes'
import $ from 'self-libraries'
import { useShallow } from 'zustand/shallow'

interface ProviderType {
  $: $,
  getReducer: <R>(callBack: (state: ReturnType<Store['getState']>) => R) => R,
  setReducer: (
    state: Parameters<Store['setState']>[0],
    actionName: Parameters<Store['setState']>[2],
    shouldReplace?: Parameters<Store['setState']>[1],
  ) => void
}

export const NewContext = createContext<ProviderType>({
  $,
  getReducer: callBack => store(useShallow(callBack)),
  setReducer: (state, actionName , shouldReplace) => shouldReplace ? store.setState(state, shouldReplace, actionName) : store.setState(state, false, actionName)
})

const App:FC = (): TSX => {

  const getReducer:ProviderType['getReducer'] = callBack => store(useShallow(callBack))
  const setReducer:ProviderType['setReducer'] = (state, actionName, shouldReplace) => shouldReplace ? store.setState(state, shouldReplace, actionName) : store.setState(state, false, actionName)

  const provides: ProviderType = {
    $,
    getReducer,
    setReducer
  }

  return (
    <NewContext.Provider value={provides}>
      <RouterProvider router={routes} />
      {
        import.meta.env.VITE_APP_ENV === 'development' && (
          <TanStackRouterDevtools router={routes} />
        )
      }
    </NewContext.Provider>
  )
}

export default App
