import { memo } from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => (
  <CFooter className="px-4">
    <div>
      <span className="fw-semibold">MTQ UiX</span>
      <span className="ms-1">&copy; 2026 MTQ UiX.</span>
    </div>
    <div className="ms-auto">
      <span className="me-1">Built on</span>
      <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
        CoreUI React
      </a>
    </div>
  </CFooter>
)

export default memo(AppFooter)
