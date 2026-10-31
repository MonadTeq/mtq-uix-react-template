import { useEffect, useRef } from 'react'
import { CContainer, CHeader, CHeaderNav, CHeaderToggler, CNavItem, CNavLink } from '@coreui/react'
import { CIcon } from '@mtq/design-system'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { useSidebar } from '@/features/sidebar'
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdown from './AppHeaderDropdown'
import HeaderSearch from './HeaderSearch'
import ThemeSwitcher from './ThemeSwitcher'

const AppHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const { state, toggleVisible } = useSidebar()

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current?.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={toggleVisible}
          aria-expanded={state.visible}
          aria-label="Toggle sidebar"
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <HeaderSearch />
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75" />
          </li>
          <ThemeSwitcher />
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75" />
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
