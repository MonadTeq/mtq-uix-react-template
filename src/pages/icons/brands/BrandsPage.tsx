import { CCard, CCardBody, CCardHeader, CRow, brandSet } from '@mtq/design-system'
import { DocsIcons, getIconsView } from '@/shared'

const BrandsPage = () => {
  return (
    <>
      <DocsIcons />
      <CCard className="mb-4">
        <CCardHeader>Brand Icons</CCardHeader>
        <CCardBody>
          <CRow className="text-center">{getIconsView(brandSet)}</CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BrandsPage
