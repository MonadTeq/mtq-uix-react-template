import type { ReactNode } from 'react'
import { SidebarProvider } from '@/features/sidebar'

const AppProviders = ({ children }: { children: ReactNode }) => (
  <SidebarProvider>{children}</SidebarProvider>
)

export default AppProviders
