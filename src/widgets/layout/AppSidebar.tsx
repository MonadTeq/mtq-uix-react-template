import { memo } from 'react'
import { Link } from 'react-router-dom'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import { CIcon, logo, sygnet } from '@mtq/design-system'

import { useSidebar } from '@/features/sidebar'
import { navigation } from '@/entities/navigation'
import AppSidebarNav from './AppSidebarNav'

const AppSidebar = () => {
  const { state, setVisible, toggleUnfoldable } = useSidebar()

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={state.unfoldable}
      visible={state.visible}
      onVisibleChange={setVisible}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand as={Link} to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton className="d-lg-none" dark onClick={() => setVisible(false)} />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={toggleUnfoldable} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default memo(AppSidebar)
