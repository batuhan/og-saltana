import Link from 'next/link'
import { useRouter } from 'next/router'
import useApi from 'hooks/useApi'
import useCurrentUser from 'hooks/useCurrentUser'

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

export function UserDashboardLink({ children, href = '/assets' }) {
  return <Link href={`/my${href}`}>{children}</Link>
}

export function CurrentCreatorSpaceLink({ children, href = '' }) {
  const { query } = useRouter()
  const creator = useApi('users', 'read', query.creator)
  return <Link href={`/${creator.data.username}/${href}`}>{children}</Link>
}

export function DefaultLink({ children }) {
  const user = useCurrentUser()

  if (!user) {
    // if a guest, go to homepage
    return <Link href={`/`}>{children}</Link>
  }

  if (user.data.roles.includes('provider')) {
    // if a creator, go to creator dashboard homepage
    return <CreatorDashboardLink>{children}</CreatorDashboardLink>
  }

  // if a regular user, go to user dashboard homepage
  return <UserDashboardLink>{children}</UserDashboardLink>
}
