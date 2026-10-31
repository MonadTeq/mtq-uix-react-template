import type { CSSProperties } from 'react'
import type { ChartOptions } from 'chart.js'
import { CCol, CWidgetStatsD, CRow, CChart } from '@mtq/design-system'
import { CIcon, brandColorTokens } from '@mtq/design-system'
import { cibFacebook, cibLinkedin, cibTwitter, cilCalendar } from '@coreui/icons'

type WidgetsBrandProps = {
  className?: string
  withCharts?: boolean
}

const chartOptions: ChartOptions = {
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
}

const lineChart = (data: number[]) => (
  <CChart
    className="position-absolute w-100 h-100"
    type="line"
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          backgroundColor: 'rgba(255,255,255,.1)',
          borderColor: 'rgba(255,255,255,.55)',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data,
          fill: true,
        },
      ],
    }}
    options={chartOptions}
  />
)

const brandBackground = (token: string): CSSProperties =>
  ({ '--cui-card-cap-bg': token }) as CSSProperties

const WidgetsBrand = ({ className, withCharts = false }: WidgetsBrandProps) => (
  <CRow className={className} xs={{ gutter: 4 }}>
    <CCol sm={6} xl={4} xxl={3}>
      <CWidgetStatsD
        {...(withCharts && { chart: lineChart([65, 59, 84, 84, 51, 55, 40]) })}
        icon={<CIcon icon={cibFacebook} height={52} className="my-4 text-white" />}
        values={[
          { title: 'friends', value: '89K' },
          { title: 'feeds', value: '459' },
        ]}
        style={brandBackground(brandColorTokens.facebook)}
      />
    </CCol>
    <CCol sm={6} xl={4} xxl={3}>
      <CWidgetStatsD
        {...(withCharts && { chart: lineChart([1, 13, 9, 17, 34, 41, 38]) })}
        icon={<CIcon icon={cibTwitter} height={52} className="my-4 text-white" />}
        values={[
          { title: 'followers', value: '973k' },
          { title: 'tweets', value: '1.792' },
        ]}
        style={brandBackground(brandColorTokens.twitter)}
      />
    </CCol>
    <CCol sm={6} xl={4} xxl={3}>
      <CWidgetStatsD
        {...(withCharts && { chart: lineChart([78, 81, 80, 45, 34, 12, 40]) })}
        icon={<CIcon icon={cibLinkedin} height={52} className="my-4 text-white" />}
        values={[
          { title: 'contacts', value: '500' },
          { title: 'feeds', value: '1.292' },
        ]}
        style={brandBackground(brandColorTokens.linkedin)}
      />
    </CCol>
    <CCol sm={6} xl={4} xxl={3}>
      <CWidgetStatsD
        color="warning"
        {...(withCharts && { chart: lineChart([35, 23, 56, 22, 97, 23, 64]) })}
        icon={<CIcon icon={cilCalendar} height={52} className="my-4 text-white" />}
        values={[
          { title: 'events', value: '12+' },
          { title: 'meetings', value: '4' },
        ]}
      />
    </CCol>
  </CRow>
)

export default WidgetsBrand
