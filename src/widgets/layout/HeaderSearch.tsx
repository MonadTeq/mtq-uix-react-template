import { useState } from 'react'
import {
  CBadge,
  CFormInput,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CSearchButton,
} from '@coreui/react'

const recentSearches = [
  'MTQ UiX components overview',
  'Modal dialog examples',
  'Sidebar navigation customization',
]

const HeaderSearch = () => {
  const [searchVisible, setSearchVisible] = useState(false)

  return (
    <>
      <CSearchButton
        onTrigger={() => setSearchVisible(true)}
        aria-label="Open search dialog"
        aria-controls="app-header-search-modal"
      />
      <CModal
        id="app-header-search-modal"
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        aria-labelledby="app-header-search-modal-title"
      >
        <CModalHeader>
          <CModalTitle id="app-header-search-modal-title" className="w-100">
            <CFormInput type="search" placeholder="Search" aria-label="Search" />
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="text-body-secondary small mb-2">Recent searches</p>
          <CListGroup flush>
            {recentSearches.map((label) => (
              <CListGroupItem
                key={label}
                as="button"
                type="button"
                className="d-flex justify-content-between align-items-center"
              >
                {label}
                <CBadge color="secondary" shape="rounded-pill">
                  Open
                </CBadge>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CModalBody>
      </CModal>
    </>
  )
}

export default HeaderSearch
