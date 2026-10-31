export const APP_NAME = 'MTQ UiX'

export const EXTERNAL_LINKS = {
  docs: 'https://coreui.io/react/docs/templates/installation/',
  docsComponents: 'https://coreui.io/react/docs/',
  pricing: 'https://coreui.io/pricing/',
  coreui: 'https://coreui.io',
} as const

export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  login: '/authentication/login',
  register: '/authentication/register',
  checkEmail: '/authentication/check-email',
  resetPassword: '/authentication/reset-password',
  changePassword: '/authentication/change-password',
  passwordChanged: '/authentication/password-changed',
  page404: '/error-pages/404',
  page500: '/error-pages/500',
} as const
