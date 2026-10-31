import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { DefaultLayout } from '@/widgets'

const DashboardPage = lazy(() => import('@/pages/dashboard'))
const ChartsPage = lazy(() => import('@/pages/charts'))
const WidgetsPage = lazy(() => import('@/pages/widgets'))

const AccordionPage = lazy(() => import('@/pages/components/accordion'))
const AlertsPage = lazy(() => import('@/pages/components/alerts'))
const BadgePage = lazy(() => import('@/pages/components/badge'))
const BreadcrumbPage = lazy(() => import('@/pages/components/breadcrumb'))
const ButtonGroupPage = lazy(() => import('@/pages/components/button-group'))
const ButtonsPage = lazy(() => import('@/pages/components/buttons'))
const CardsPage = lazy(() => import('@/pages/components/cards'))
const CarouselPage = lazy(() => import('@/pages/components/carousel'))
const ChipPage = lazy(() => import('@/pages/components/chip'))
const ChipSetPage = lazy(() => import('@/pages/components/chip-set'))
const CollapsePage = lazy(() => import('@/pages/components/collapse'))
const DropdownsPage = lazy(() => import('@/pages/components/dropdowns'))
const ListGroupPage = lazy(() => import('@/pages/components/list-group'))
const ModalsPage = lazy(() => import('@/pages/components/modals'))
const NavsTabsPage = lazy(() => import('@/pages/components/navs-tabs'))
const PaginationPage = lazy(() => import('@/pages/components/pagination'))
const PlaceholdersPage = lazy(() => import('@/pages/components/placeholders'))
const PopoversPage = lazy(() => import('@/pages/components/popovers'))
const ProgressPage = lazy(() => import('@/pages/components/progress'))
const SearchButtonPage = lazy(() => import('@/pages/components/search-button'))
const SpinnersPage = lazy(() => import('@/pages/components/spinners'))
const TablesPage = lazy(() => import('@/pages/components/tables'))
const TabsPage = lazy(() => import('@/pages/components/tabs'))
const ToastsPage = lazy(() => import('@/pages/components/toasts'))
const TooltipsPage = lazy(() => import('@/pages/components/tooltips'))

const ChecksRadiosPage = lazy(() => import('@/pages/forms/checks-radios'))
const ChipInputPage = lazy(() => import('@/pages/forms/chip-input'))
const FloatingLabelsPage = lazy(() => import('@/pages/forms/floating-labels'))
const FormControlPage = lazy(() => import('@/pages/forms/form-control'))
const InputGroupPage = lazy(() => import('@/pages/forms/input-group'))
const FormLayoutPage = lazy(() => import('@/pages/forms/layout'))
const RangePage = lazy(() => import('@/pages/forms/range'))
const SelectPage = lazy(() => import('@/pages/forms/select'))
const ValidationPage = lazy(() => import('@/pages/forms/validation'))

const CoreUIIconsPage = lazy(() => import('@/pages/icons/coreui-icons'))
const FlagsPage = lazy(() => import('@/pages/icons/flags'))
const BrandsPage = lazy(() => import('@/pages/icons/brands'))

const LoginPage = lazy(() => import('@/pages/authentication/login'))
const RegisterPage = lazy(() => import('@/pages/authentication/register'))
const CheckEmailPage = lazy(() => import('@/pages/authentication/check-email'))
const ResetPasswordPage = lazy(() => import('@/pages/authentication/reset-password'))
const ChangePasswordPage = lazy(() => import('@/pages/authentication/change-password'))
const PasswordChangedPage = lazy(() => import('@/pages/authentication/password-changed'))

const Page404Page = lazy(() => import('@/pages/error-pages/page404'))
const Page500Page = lazy(() => import('@/pages/error-pages/page500'))

const AppRoutes = () => (
  <Routes>
    <Route path="/authentication/login" element={<LoginPage />} />
    <Route path="/authentication/register" element={<RegisterPage />} />
    <Route path="/authentication/check-email" element={<CheckEmailPage />} />
    <Route path="/authentication/reset-password" element={<ResetPasswordPage />} />
    <Route path="/authentication/change-password" element={<ChangePasswordPage />} />
    <Route path="/authentication/password-changed" element={<PasswordChangedPage />} />
    <Route path="/error-pages/404" element={<Page404Page />} />
    <Route path="/error-pages/500" element={<Page500Page />} />

    <Route element={<DefaultLayout />}>
      <Route path="*" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="charts" element={<ChartsPage />} />
      <Route path="widgets" element={<WidgetsPage />} />

      <Route path="components" element={<AccordionPage />} />
      <Route path="components/accordion" element={<AccordionPage />} />
      <Route path="components/alerts" element={<AlertsPage />} />
      <Route path="components/badge" element={<BadgePage />} />
      <Route path="components/breadcrumb" element={<BreadcrumbPage />} />
      <Route path="components/button-group" element={<ButtonGroupPage />} />
      <Route path="components/buttons" element={<ButtonsPage />} />
      <Route path="components/cards" element={<CardsPage />} />
      <Route path="components/carousel" element={<CarouselPage />} />
      <Route path="components/chip" element={<ChipPage />} />
      <Route path="components/chip-set" element={<ChipSetPage />} />
      <Route path="components/collapse" element={<CollapsePage />} />
      <Route path="components/dropdowns" element={<DropdownsPage />} />
      <Route path="components/list-group" element={<ListGroupPage />} />
      <Route path="components/modals" element={<ModalsPage />} />
      <Route path="components/navs-tabs" element={<NavsTabsPage />} />
      <Route path="components/pagination" element={<PaginationPage />} />
      <Route path="components/placeholders" element={<PlaceholdersPage />} />
      <Route path="components/popovers" element={<PopoversPage />} />
      <Route path="components/progress" element={<ProgressPage />} />
      <Route path="components/search-button" element={<SearchButtonPage />} />
      <Route path="components/spinners" element={<SpinnersPage />} />
      <Route path="components/tables" element={<TablesPage />} />
      <Route path="components/tabs" element={<TabsPage />} />
      <Route path="components/toasts" element={<ToastsPage />} />
      <Route path="components/tooltips" element={<TooltipsPage />} />

      <Route path="forms" element={<FormControlPage />} />
      <Route path="forms/form-control" element={<FormControlPage />} />
      <Route path="forms/select" element={<SelectPage />} />
      <Route path="forms/checks-radios" element={<ChecksRadiosPage />} />
      <Route path="forms/chip-input" element={<ChipInputPage />} />
      <Route path="forms/range" element={<RangePage />} />
      <Route path="forms/input-group" element={<InputGroupPage />} />
      <Route path="forms/floating-labels" element={<FloatingLabelsPage />} />
      <Route path="forms/layout" element={<FormLayoutPage />} />
      <Route path="forms/validation" element={<ValidationPage />} />

      <Route path="icons" element={<CoreUIIconsPage />} />
      <Route path="icons/coreui-icons" element={<CoreUIIconsPage />} />
      <Route path="icons/flags" element={<FlagsPage />} />
      <Route path="icons/brands" element={<BrandsPage />} />
    </Route>
  </Routes>
)

export default AppRoutes
