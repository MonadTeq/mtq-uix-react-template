import { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'

import { useTheme } from '@/features/theme'
import { AppProviders } from './providers'
import { AppRoutes } from './router'

import './styles/style.scss'
import './styles/examples.scss'
import '@mtq/design-system/styles/brand.css'

const ThemeBootstrap = () => {
  const { setColorMode, isColorModeSet } = useTheme()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)?.[0]

    if (theme) {
      setColorMode(theme)
      return
    }

    if (!isColorModeSet()) {
      setColorMode('light')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

const App = () => (
  <AppProviders>
    <HashRouter>
      <ThemeBootstrap />
      <AppRoutes />
    </HashRouter>
  </AppProviders>
)

export default App
