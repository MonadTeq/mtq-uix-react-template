import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import AppFooter from './AppFooter'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'

const DefaultLayout = () => (
  <div>
    <AppSidebar />
    <div className="wrapper d-flex flex-column min-vh-100">
      <AppHeader />
      <div className="body flex-grow-1">
        <CContainer className="px-4" lg>
          <Suspense fallback={<CSpinner color="primary" />}>
            <Outlet />
          </Suspense>
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
)

export default DefaultLayout
