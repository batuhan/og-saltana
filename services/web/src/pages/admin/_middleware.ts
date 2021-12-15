const isAllowed =
  process.env.NODE_ENV === 'development' ||
  process.env.EXPLICITLY_ALLOW_ADMIN_FEATURES === 'true'

export default function adminMiddleware() {
  if (isAllowed === false) {
    throw new Error('Admin features are not allowed in production')
  }
}
