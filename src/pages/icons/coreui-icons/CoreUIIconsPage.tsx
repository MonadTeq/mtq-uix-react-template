import { CCard, CCardBody, CCardHeader, CRow, freeSet } from '@mtq/design-system'
import { DocsIcons, getIconsView } from '@/shared'

const CoreUIIconsPage = () => {
  return (
    <>
      <DocsIcons />
      <CCard className="mb-4">
        <CCardHeader>Free Icons</CCardHeader>
        <CCardBody>
          <CRow className="text-center">{getIconsView(freeSet)}</CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CoreUIIconsPage
