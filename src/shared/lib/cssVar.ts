import { getStyle } from '@coreui/utils'

export const cssVar = (name: string): string => getStyle(name) ?? ''
