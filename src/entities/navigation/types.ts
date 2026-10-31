import type { ReactNode } from 'react'

export type NavBadge = {
  color: string
  text: string
}

export type NavItem = {
  type: 'item'
  name: ReactNode
  to?: string
  href?: string
  icon?: ReactNode
  badge?: NavBadge
}

export type NavGroup = {
  type: 'group'
  name: ReactNode
  to?: string
  icon?: ReactNode
  items: NavEntry[]
}

export type NavTitle = {
  type: 'title'
  name: ReactNode
}

export type NavEntry = NavItem | NavGroup | NavTitle
