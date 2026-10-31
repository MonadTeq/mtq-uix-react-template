import { useColorModes } from '@coreui/react'

export type ColorMode = 'light' | 'dark' | 'auto'

export const THEME_STORAGE_KEY = 'mtq-uix-theme'

const isColorMode = (value: string | undefined): value is ColorMode =>
  value === 'light' || value === 'dark' || value === 'auto'

export const useTheme = () => {
  const { colorMode, setColorMode, isColorModeSet } = useColorModes(THEME_STORAGE_KEY)

  return {
    colorMode: isColorMode(colorMode) ? colorMode : undefined,
    setColorMode,
    isColorModeSet,
  }
}
