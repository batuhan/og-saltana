import Link from 'next/link'
import useCurrentUser from 'hooks/useCurrentUser'
import useCreatorSpace from 'hooks/useCreatorSpace'

const getCreatorDashboardLink = (basePath = '') =>
  function _DashboardLink({ children, href = '', ...props }) {
    const { user } = useCurrentUser()

    return (
      <Link
        href={`/dashboard/${user?.username || user?.id || "me"}${basePath}${href}`}
        {...props}
        passHref
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

export function UserDashboardLink({ children, href = '/assets', ...props }) {
  return (
    <Link href={`/my${href}`} {...props} passHref>
      {children}
    </Link>
  )
}

export function CurrentCreatorSpaceLink({ children, href = '', ...props }) {
  const { creator } = useCreatorSpace()
  return (
    <Link href={`/${creator.data.username}/${href}`} {...props} passHref>
      {children}
    </Link>
  )
}

export function DefaultLink({ children, ...props }) {
  const user = useCurrentUser()

  if (!user) {
    // if a guest, go to homepage
    return (
      <Link href="/" {...props} passHref>
        {children}
      </Link>
    )
  }

  if (user?.roles?.includes('provider')) {
    // if a creator, go to creator dashboard homepage
    return <CreatorDashboardLink>{children}</CreatorDashboardLink>
  }

  // if a regular user, go to user dashboard homepage
  return <UserDashboardLink>{children}</UserDashboardLink>
}
