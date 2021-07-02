import Link from 'next/link'
import { useRouter } from 'next/router'
import { useApi, useCurrentUser } from '../modules/client/api'
const getCreatorDashboardLink = (basePath = '') =>
  function _DashboardLink({ children, href = '' }) {
    const user = useCurrentUser()

    return (
      <Link href={`/${user.data.username}/dashboard${basePath}${href}`}>
        {children}
      </Link>
    )
  }

export const CreatorDashboardLink = getCreatorDashboardLink('/')
export const CreatorDashboardLinksLink = getCreatorDashboardLink('/links')

export function UserDashboardLink({ children, href = '' }) {
  return <Link href={`/my${href}`}>{children}</Link>
}

export function CurrentCreatorSpaceLink({ children, href = '' }) {
  const { query } = useRouter()
  const creator = useApi('users', 'read', query.creator)
  return <Link href={`/${creator.data.username}/${href}`}>{children}</Link>
}
