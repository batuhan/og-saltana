import Link from 'next/link'
import { useCurrentUser } from '../../modules/api'
const getDashboardLink = (basePath = '') =>
  function _DashboardLink({ children, href = '' }) {
    const user = useCurrentUser()

    return (
      <Link href={`/${user.data.username}/dashboard${basePath}/${href}`}>
        {children}
      </Link>
    )
  }

export const CreatorDashboardLink = getDashboardLink('/')
export const CreatorDashboardLinksLink = getDashboardLink('/links')
export const CreatorDashboardAssetsLink = getDashboardLink('/assets')
export const CreatorDashboardCustomizeLink = getDashboardLink('/customize')
