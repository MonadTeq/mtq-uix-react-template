import type { CSSProperties } from 'react'
import { CCol, CWidgetStatsD, CRow } from '@mtq/design-system'
import { CIcon, brandColorTokens } from '@mtq/design-system'
import { cibFacebook, cibLinkedin, cibYoutube } from '@coreui/icons'

type DashboardBrandProps = {
  className?: string
}

const brandBackground = (token: string): CSSProperties =>
  ({ '--cui-card-cap-bg': token }) as CSSProperties

const DashboardBrand = ({ className }: DashboardBrandProps) => (
  <CRow className={className} xs={{ gutter: 4 }}>
    <CCol sm={6} lg={4}>
      <CWidgetStatsD
        icon={<CIcon icon={cibFacebook} height={52} className="my-4 text-white" />}
        values={[
          { title: 'friends', value: '89k' },
          { title: 'feeds', value: '459' },
        ]}
        style={brandBackground(brandColorTokens.facebook)}
      />
    </CCol>
    <CCol sm={6} lg={4}>
      <CWidgetStatsD
        icon={<CIcon icon={cibYoutube} height={52} className="my-4 text-white" />}
        values={[
          { title: 'subscribers', value: '973k' },
          { title: 'new comments', value: '1.792' },
        ]}
        style={brandBackground(brandColorTokens.youtube)}
      />
    </CCol>
    <CCol sm={6} lg={4}>
      <CWidgetStatsD
        icon={<CIcon icon={cibLinkedin} height={52} className="my-4 text-white" />}
        values={[
          { title: 'contacts', value: '500+' },
          { title: 'feeds', value: '292' },
        ]}
        style={brandBackground(brandColorTokens.linkedin)}
      />
    </CCol>
  </CRow>
)

export default DashboardBrand
