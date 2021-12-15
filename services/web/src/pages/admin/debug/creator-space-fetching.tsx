import * as React from 'react'
import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import { useCreatorSpace } from 'hooks/useCreatorSpace'

const CreatorProfile = () => {
  const { creator, link, asset } = useCreatorSpace({
    creatorId: 'batuhan'
  })
  return (
    <CreatorSpaceShell>
      {link.data && <pre>{JSON.stringify(link.data)}</pre>}
      {asset.data && <pre>{JSON.stringify(asset.data)}</pre>}
      {creator.data && <  pre>{JSON.stringify(creator.data)}</pre>}
    </CreatorSpaceShell>
  )
}

export default CreatorProfile
