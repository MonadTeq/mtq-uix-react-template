import type { ReactNode } from 'react'
import navigation from '../navigation'
import type { NavEntry } from '../types'

const toLabel = (name: ReactNode): string | undefined =>
  typeof name === 'string' ? name : undefined

let routeMap: Map<string, string> | null = null

const buildRouteMap = (): Map<string, string> => {
  const map = new Map<string, string>()

  const walk = (entries: NavEntry[]): void => {
    for (const entry of entries) {
      if (entry.type === 'item' && entry.to) {
        const label = toLabel(entry.name)
        if (label) {
          map.set(entry.to, label)
        }
      }
      if (entry.type === 'group') {
        if (entry.to) {
          const label = toLabel(entry.name)
          if (label) {
            map.set(entry.to, label)
          }
        }
        walk(entry.items)
      }
    }
  }

  walk(navigation)
  return map
}

export const getRouteName = (pathname: string): string | undefined => {
  if (!routeMap) {
    routeMap = buildRouteMap()
  }
  return routeMap.get(pathname)
}
