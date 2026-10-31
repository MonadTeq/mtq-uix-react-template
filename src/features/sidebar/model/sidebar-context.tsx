import { createContext, useContext, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { SidebarState } from './types'

type SidebarAction =
  | { type: 'set-visible'; visible: boolean }
  | { type: 'toggle-visible' }
  | { type: 'set-unfoldable'; unfoldable: boolean }
  | { type: 'toggle-unfoldable' }

const initialState: SidebarState = {
  visible: true,
  unfoldable: false,
}

const reducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case 'set-visible':
      return { ...state, visible: action.visible }
    case 'toggle-visible':
      return { ...state, visible: !state.visible }
    case 'set-unfoldable':
      return { ...state, unfoldable: action.unfoldable }
    case 'toggle-unfoldable':
      return { ...state, unfoldable: !state.unfoldable }
  }
}

export type SidebarApi = {
  state: SidebarState
  setVisible: (visible: boolean) => void
  toggleVisible: () => void
  setUnfoldable: (unfoldable: boolean) => void
  toggleUnfoldable: () => void
}

const SidebarContext = createContext<SidebarApi | null>(null)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo<SidebarApi>(
    () => ({
      state,
      setVisible: (visible) => dispatch({ type: 'set-visible', visible }),
      toggleVisible: () => dispatch({ type: 'toggle-visible' }),
      setUnfoldable: (unfoldable) => dispatch({ type: 'set-unfoldable', unfoldable }),
      toggleUnfoldable: () => dispatch({ type: 'toggle-unfoldable' }),
    }),
    [state],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export const useSidebar = (): SidebarApi => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
