import type { ReactNode } from 'react'
import { CCol } from '@coreui/react'
import { CIcon } from '@mtq/design-system'

type IconSet = Record<string, string | string[]>

const toKebabCase = (value: string): string =>
  value.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

export const getIconsView = (iconset: IconSet): ReactNode[] =>
  Object.entries(iconset).map(([name, value]) => (
    <CCol className="mb-5" xs={6} sm={4} md={3} xl={2} key={name}>
      <CIcon icon={value} size="xxl" />
      <div>{toKebabCase(name)}</div>
    </CCol>
  ))
