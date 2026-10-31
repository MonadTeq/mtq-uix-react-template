import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavGroup, CNavItem, CNavLink, CNavTitle, CSidebarNav } from '@coreui/react'
import type { NavBadge, NavEntry, NavGroup, NavItem } from '@/entities/navigation'

type AppSidebarNavProps = {
  items: NavEntry[]
}

const NavBadgeView = ({ badge }: { badge?: NavBadge }) =>
  badge ? (
    <CBadge color={badge.color} className="ms-auto" size="sm">
      {badge.text}
    </CBadge>
  ) : null

const NavIcon = ({ icon, indent }: { icon?: ReactNode; indent: boolean }) => {
  if (icon) {
    return <Fragment>{icon}</Fragment>
  }
  if (indent) {
    return (
      <span className="nav-icon">
        <span className="nav-icon-bullet" />
      </span>
    )
  }
  return null
}

const NavItemView = ({ item, indent }: { item: NavItem; indent: boolean }) => {
  const { name, icon, badge, to, href } = item
  const content = (
    <Fragment>
      <NavIcon icon={icon} indent={indent} />
      {name}
      <NavBadgeView badge={badge} />
    </Fragment>
  )

  return (
    <CNavItem as="div">
      {to ? (
        <CNavLink as={NavLink} to={to}>
          {content}
        </CNavLink>
      ) : href ? (
        <CNavLink href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </CNavLink>
      ) : (
        content
      )}
    </CNavItem>
  )
}

const NavGroupView = ({ item }: { item: NavGroup }) => {
  const { name, icon, items } = item
  return (
    <CNavGroup
      compact
      as="div"
      toggler={
        <Fragment>
          {icon}
          {name}
        </Fragment>
      }
    >
      {items.map((child, index) => (
        <NavEntryView key={index} item={child} indent />
      ))}
    </CNavGroup>
  )
}

const NavEntryView = ({ item, indent = false }: { item: NavEntry; indent?: boolean }) => {
  switch (item.type) {
    case 'item':
      return <NavItemView item={item} indent={indent} />
    case 'group':
      return <NavGroupView item={item} />
    case 'title':
      return <CNavTitle as="div">{item.name}</CNavTitle>
  }
}

const AppSidebarNav = ({ items }: AppSidebarNavProps) => (
  <CSidebarNav as={SimpleBar}>
    {items.map((item, index) => (
      <NavEntryView key={index} item={item} />
    ))}
  </CSidebarNav>
)

export default AppSidebarNav
