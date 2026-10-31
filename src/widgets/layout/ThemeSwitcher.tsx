import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { CIcon } from '@mtq/design-system'
import { cilContrast, cilMoon, cilSun } from '@coreui/icons'

import { useTheme } from '@/features/theme'

const ThemeSwitcher = () => {
  const { colorMode, setColorMode } = useTheme()

  const icon = colorMode === 'dark' ? cilMoon : colorMode === 'auto' ? cilContrast : cilSun

  return (
    <CDropdown variant="nav-item" placement="bottom-end">
      <CDropdownToggle caret={false}>
        <CIcon icon={icon} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem
          active={colorMode === 'light'}
          className="d-flex align-items-center"
          as="button"
          type="button"
          onClick={() => setColorMode('light')}
        >
          <CIcon className="me-2" icon={cilSun} size="lg" /> Light
        </CDropdownItem>
        <CDropdownItem
          active={colorMode === 'dark'}
          className="d-flex align-items-center"
          as="button"
          type="button"
          onClick={() => setColorMode('dark')}
        >
          <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
        </CDropdownItem>
        <CDropdownItem
          active={colorMode === 'auto'}
          className="d-flex align-items-center"
          as="button"
          type="button"
          onClick={() => setColorMode('auto')}
        >
          <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default ThemeSwitcher
