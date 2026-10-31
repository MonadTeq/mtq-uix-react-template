import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { CIcon } from '@mtq/design-system'
import {
  cilBell,
  cilCommentSquare,
  cilCreditCard,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import avatar8 from '@mtq/design-system/assets/images/avatars/8.jpg'

import { UserAvatar } from '@/entities/user'
import type { User } from '@/entities/user'

const currentUser: User = {
  id: '1',
  name: 'Admin',
  email: 'admin@example.com',
  avatarUrl: avatar8,
}

const AppHeaderDropdown = () => (
  <CDropdown variant="nav-item" placement="bottom-end">
    <CDropdownToggle className="py-0 pe-0" caret={false}>
      <UserAvatar user={currentUser} />
    </CDropdownToggle>
    <CDropdownMenu className="pt-0">
      <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
      <CDropdownItem href="#">
        <CIcon icon={cilBell} className="me-2" />
        Updates
        <CBadge color="info" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon icon={cilEnvelopeOpen} className="me-2" />
        Messages
        <CBadge color="success" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon icon={cilTask} className="me-2" />
        Tasks
        <CBadge color="danger" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon icon={cilCommentSquare} className="me-2" />
        Comments
        <CBadge color="warning" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
      <CDropdownItem href="#">
        <CIcon icon={cilUser} className="me-2" />
        Profile
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon icon={cilSettings} className="me-2" />
        Settings
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon icon={cilCreditCard} className="me-2" />
        Payments
        <CBadge color="secondary" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon icon={cilFile} className="me-2" />
        Projects
        <CBadge color="primary" className="ms-2">
          42
        </CBadge>
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem href="#">
        <CIcon icon={cilLockLocked} className="me-2" />
        Lock Account
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
)

export default AppHeaderDropdown
