import { CCard, CCardBody, CCardHeader, CRow, flagSet } from '@mtq/design-system'
import { DocsIcons, getIconsView } from '@/shared'

const FlagsPage = () => {
  return (
    <>
      <DocsIcons />
      <CCard className="mb-4">
        <CCardHeader>Flag Icons</CCardHeader>
        <CCardBody>
          <CRow className="text-center">{getIconsView(flagSet)}</CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default FlagsPage
