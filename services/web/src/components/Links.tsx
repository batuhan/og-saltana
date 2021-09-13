import Link from 'next/link'
import useCurrentUser from 'hooks/useCurrentUser'
import useCreatorSpace from 'hooks/useCreatorSpace'

const getCreatorDashboardLink = (basePath = '') =>
  function _DashboardLink({ children, href = '', ...props }) {
    const user = useCurrentUser()

    return (
      <Link
        href={`/dashboard/${user.data.username}${basePath}${href}`}
        {...props}
      >
        {children}
      </Link>
    )
  }

export const CreatorDashboardLink = getCreatorDashboardLink()
export const CreatorDashboardLinksLink = getCreatorDashboardLink('/links')
export const CreatorDashboardAssetsLink = getCreatorDashboardLink('/assets')
export const CreatorDashboardOrdersLink =
  getCreatorDashboardLink('/assets/orders')

export function UserDashboardLink({ children, href = '/assets' }) {
  return <Link href={`/my${href}`}>{children}</Link>
}

export function CurrentCreatorSpaceLink({ children, href = '' }) {
  const { creator } = useCreatorSpace()
  return <Link href={`/${creator.data.username}/${href}`}>{children}</Link>
}

export function DefaultLink({ children }) {
  const user = useCurrentUser()

  if (!user) {
    // if a guest, go to homepage
    return <Link href="/">{children}</Link>
  }

  if (user.data.roles?.includes('provider')) {
    // if a creator, go to creator dashboard homepage
    return <CreatorDashboardLink>{children}</CreatorDashboardLink>
  }

  // if a regular user, go to user dashboard homepage
  return <UserDashboardLink>{children}</UserDashboardLink>
}
