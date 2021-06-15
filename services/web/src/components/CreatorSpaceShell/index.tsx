import { useRouter } from 'next/router'
import * as React from 'react'
import { useCurrentUser, useApi } from '../../modules/api'
import Shell from './Shell'
import OwnerShell from './OwnerShell'
import { NextSeo } from 'next-seo'

const CreatorSpaceShell = ({ children, creatorId }) => {
  const { data = {}, isLoading } = useApi('users', 'read', creatorId)
  const {
    query: { mode },
  } = useRouter()
  const { is, session } = useCurrentUser()
  const [editModeEnabled, setEditModeEnabled] = React.useState(false)
  const [canEdit, setCanEdit] = React.useState(false)

  React.useEffect(() => {
    const isOwner = is(creatorId)
    setCanEdit(isOwner)
    setEditModeEnabled(isOwner && mode === 'edit')
  }, [session, mode])

  const shell = editModeEnabled ? (
    <OwnerShell
      isLoading={isLoading}
      editModeEnabled={editModeEnabled}
      creatorId={creatorId}
      canEdit={canEdit}
      {...data}
    >
      {children}
    </OwnerShell>
  ) : (
    <Shell
      isLoading={isLoading}
      creatorId={creatorId}
      canEdit={canEdit}
      {...data}
    >
      {children}
    </Shell>
  )

  return (<>
    <NextSeo
      title={data.displayName}
    />
  {shell}</>)
}

export default CreatorSpaceShell
