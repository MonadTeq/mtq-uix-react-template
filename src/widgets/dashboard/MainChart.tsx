import { useEffect, useRef, useState } from 'react'
import type { Chart as ChartJS } from 'chart.js'
import { CChartLine } from '@coreui/react-chartjs'
import { cssVar } from '@/shared'

const random = (min = 0, max = 100): number => Math.floor(Math.random() * (max - min + 1)) + min

type ThemeChartOptions = {
  scales: {
    x: { grid: { borderColor: string; color: string }; ticks: { color: string } }
    y: { grid: { borderColor: string; color: string }; ticks: { color: string } }
  }
}

const MainChart = () => {
  const chartRef = useRef<ChartJS | null>(null)
  const [randomData] = useState(() => [
    Array.from({ length: 7 }, () => random(50, 200)),
    Array.from({ length: 7 }, () => random(50, 200)),
  ])

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chart = chartRef.current
      if (chart) {
        setTimeout(() => {
          const options = chart.options as unknown as ThemeChartOptions
          options.scales.x.grid.borderColor = cssVar('--cui-border-color-translucent')
          options.scales.x.grid.color = cssVar('--cui-border-color-translucent')
          options.scales.x.ticks.color = cssVar('--cui-body-color')
          options.scales.y.grid.borderColor = cssVar('--cui-border-color-translucent')
          options.scales.y.grid.color = cssVar('--cui-border-color-translucent')
          options.scales.y.ticks.color = cssVar('--cui-body-color')
          chart.update()
        })
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)
    return () =>
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
  }, [])

  return (
    <CChartLine
      ref={chartRef}
      style={{ height: '300px', marginTop: '40px' }}
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: `rgba(${cssVar('--cui-info-rgb')}, .1)`,
            borderColor: cssVar('--cui-info'),
            pointHoverBackgroundColor: cssVar('--cui-info'),
            borderWidth: 2,
            data: randomData[0],
            fill: true,
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'transparent',
            borderColor: cssVar('--cui-success'),
            pointHoverBackgroundColor: cssVar('--cui-success'),
            borderWidth: 2,
            data: randomData[1],
          },
          {
            label: 'My Third dataset',
            backgroundColor: 'transparent',
            borderColor: cssVar('--cui-danger'),
            pointHoverBackgroundColor: cssVar('--cui-danger'),
            borderWidth: 1,
            borderDash: [8, 5],
            data: [65, 65, 65, 65, 65, 65, 65],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: cssVar('--cui-border-color-translucent'),
              drawOnChartArea: false,
            },
            ticks: {
              color: cssVar('--cui-body-color'),
            },
          },
          y: {
            beginAtZero: true,
            border: {
              color: cssVar('--cui-border-color-translucent'),
            },
            grid: {
              color: cssVar('--cui-border-color-translucent'),
            },
            max: 250,
            ticks: {
              color: cssVar('--cui-body-color'),
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
            },
          },
        },
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
      }}
    />
  )
}

export default MainChart
