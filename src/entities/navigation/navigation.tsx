import { Fragment } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBug,
  cilCalculator,
  cilChartPie,
  cilDescription,
  cilExternalLink,
  cilLockLocked,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import type { NavEntry } from './types'

const externalLink = (label: string) => (
  <Fragment>
    {label}
    <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  </Fragment>
)

const proBadge = { color: 'danger', text: 'PRO' } as const

const navigation: NavEntry[] = [
  {
    type: 'item',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: { color: 'info', text: 'NEW' },
  },
  { type: 'title', name: 'UI Elements' },
  {
    type: 'item',
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    type: 'group',
    name: 'Components',
    to: '/components',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      { type: 'item', name: 'Accordion', to: '/components/accordion' },
      { type: 'item', name: 'Alerts', to: '/components/alerts' },
      { type: 'item', name: 'Badge', to: '/components/badge' },
      { type: 'item', name: 'Breadcrumb', to: '/components/breadcrumb' },
      { type: 'item', name: 'Buttons', to: '/components/buttons' },
      { type: 'item', name: 'Buttons Group', to: '/components/button-group' },
      {
        type: 'item',
        name: externalLink('Calendar'),
        href: 'https://coreui.io/react/docs/components/calendar/',
        badge: proBadge,
      },
      { type: 'item', name: 'Cards', to: '/components/cards' },
      { type: 'item', name: 'Carousel', to: '/components/carousel' },
      { type: 'item', name: 'Chip', to: '/components/chip' },
      { type: 'item', name: 'Chip Set', to: '/components/chip-set' },
      { type: 'item', name: 'Collapse', to: '/components/collapse' },
      { type: 'item', name: 'Dropdowns', to: '/components/dropdowns' },
      { type: 'item', name: 'List group', to: '/components/list-group' },
      {
        type: 'item',
        name: externalLink('Loading Buttons'),
        href: 'https://coreui.io/react/docs/components/loading-button/',
        badge: proBadge,
      },
      { type: 'item', name: 'Modals', to: '/components/modals' },
      { type: 'item', name: 'Navs & Tabs', to: '/components/navs-tabs' },
      { type: 'item', name: 'Pagination', to: '/components/pagination' },
      { type: 'item', name: 'Placeholders', to: '/components/placeholders' },
      { type: 'item', name: 'Popovers', to: '/components/popovers' },
      { type: 'item', name: 'Progress', to: '/components/progress' },
      { type: 'item', name: 'Search Button', to: '/components/search-button' },
      {
        type: 'item',
        name: 'Smart Pagination',
        href: 'https://coreui.io/react/docs/components/smart-pagination/',
        badge: proBadge,
      },
      {
        type: 'item',
        name: externalLink('Smart Table'),
        href: 'https://coreui.io/react/docs/components/smart-table/',
        badge: proBadge,
      },
      { type: 'item', name: 'Spinners', to: '/components/spinners' },
      { type: 'item', name: 'Tables', to: '/components/tables' },
      { type: 'item', name: 'Tabs', to: '/components/tabs' },
      { type: 'item', name: 'Toasts', to: '/components/toasts' },
      { type: 'item', name: 'Tooltips', to: '/components/tooltips' },
      {
        type: 'item',
        name: externalLink('Virtual Scroller'),
        href: 'https://coreui.io/react/docs/components/virtual-scroller/',
        badge: proBadge,
      },
    ],
  },
  {
    type: 'group',
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        type: 'item',
        name: externalLink('Autocomplete'),
        href: 'https://coreui.io/react/docs/forms/autocomplete/',
        badge: proBadge,
      },
      { type: 'item', name: 'Checks & Radios', to: '/forms/checks-radios' },
      { type: 'item', name: 'Chip Input', to: '/forms/chip-input' },
      {
        type: 'item',
        name: externalLink('Date Picker'),
        href: 'https://coreui.io/react/docs/forms/date-picker/',
        badge: proBadge,
      },
      {
        type: 'item',
        name: 'Date Range Picker',
        href: 'https://coreui.io/react/docs/forms/date-range-picker/',
        badge: proBadge,
      },
      { type: 'item', name: 'Floating Labels', to: '/forms/floating-labels' },
      { type: 'item', name: 'Form Control', to: '/forms/form-control' },
      { type: 'item', name: 'Input Group', to: '/forms/input-group' },
      {
        type: 'item',
        name: externalLink('Multi Select'),
        href: 'https://coreui.io/react/docs/forms/multi-select/',
        badge: proBadge,
      },
      {
        type: 'item',
        name: externalLink('OTP Input'),
        href: 'https://coreui.io/react/docs/forms/one-time-password-input/',
        badge: proBadge,
      },
      {
        type: 'item',
        name: externalLink('Password Input'),
        href: 'https://coreui.io/react/docs/forms/password-input/',
        badge: proBadge,
      },
      { type: 'item', name: 'Range', to: '/forms/range' },
      {
        type: 'item',
        name: externalLink('Range Slider'),
        href: 'https://coreui.io/react/docs/forms/range-slider/',
        badge: proBadge,
      },
      {
        type: 'item',
        name: externalLink('Rating'),
        href: 'https://coreui.io/react/docs/forms/rating/',
        badge: proBadge,
      },
      { type: 'item', name: 'Select', to: '/forms/select' },
      {
        type: 'item',
        name: externalLink('Stepper'),
        href: 'https://coreui.io/react/docs/forms/stepper/',
        badge: proBadge,
      },
      {
        type: 'item',
        name: externalLink('Time Picker'),
        href: 'https://coreui.io/react/docs/forms/time-picker/',
        badge: proBadge,
      },
      { type: 'item', name: 'Layout', to: '/forms/layout' },
      { type: 'item', name: 'Validation', to: '/forms/validation' },
    ],
  },
  {
    type: 'group',
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      { type: 'item', name: 'CoreUI Free', to: '/icons/coreui-icons' },
      { type: 'item', name: 'CoreUI Flags', to: '/icons/flags' },
      { type: 'item', name: 'CoreUI Brands', to: '/icons/brands' },
    ],
  },
  {
    type: 'item',
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: { color: 'info', text: 'NEW' },
  },
  { type: 'title', name: 'Extras' },
  {
    type: 'group',
    name: 'Authentication',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
    items: [
      { type: 'item', name: 'Login', to: '/authentication/login' },
      { type: 'item', name: 'Register', to: '/authentication/register' },
      { type: 'item', name: 'Check Email', to: '/authentication/check-email' },
      {
        type: 'group',
        name: 'Forgot password',
        items: [
          { type: 'item', name: 'Reset Password', to: '/authentication/reset-password' },
          { type: 'item', name: 'Change Password', to: '/authentication/change-password' },
          { type: 'item', name: 'Password Changed', to: '/authentication/password-changed' },
        ],
      },
    ],
  },
  {
    type: 'group',
    name: 'Error pages',
    icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
    items: [
      { type: 'item', name: 'Error 404', to: '/error-pages/404' },
      { type: 'item', name: 'Error 500', to: '/error-pages/500' },
    ],
  },
  {
    type: 'item',
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default navigation
