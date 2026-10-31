import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

import { getRouteName } from '@/entities/navigation'

type Breadcrumb = {
  pathname: string
  name: string
  active: boolean
}

const getBreadcrumbs = (pathname: string): Breadcrumb[] => {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: Breadcrumb[] = []

  segments.reduce((prev: string, curr: string, index: number) => {
    const currentPathname = `${prev}/${curr}`
    const name = getRouteName(currentPathname)
    if (name) {
      breadcrumbs.push({
        pathname: currentPathname,
        name,
        active: index + 1 === segments.length,
      })
    }
    return currentPathname
  }, '')

  return breadcrumbs
}

const AppBreadcrumb = () => {
  const { pathname } = useLocation()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb) => (
        <CBreadcrumbItem
          {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
          key={breadcrumb.pathname}
        >
          {breadcrumb.name}
        </CBreadcrumbItem>
      ))}
    </CBreadcrumb>
  )
}

export default memo(AppBreadcrumb)
