import * as React from 'react'
import CreatorSpaceShell from '../../components/CreatorSpaceShell'
import { sharedQueryClient, useApi } from '../../modules/api'
import { dehydrate } from 'react-query/hydration'
import AssetBox from '../../modules/assets/AssetBox'
import getServerSidePropsForCreatorSpaces from '../../modules/server/getServerSidePropsForCreatorSpaces'

const CreatorAssets = ({ creatorId: ownerId }) => {
  const { data = [] } = useApi('assets', 'list', { ownerId })
  return data.map((asset) => <AssetBox key={asset.id} {...asset} />)
}

const CreatorProfile = ({ creatorId }) => {
  return (
    <CreatorSpaceShell>
      <div>test</div>
    </CreatorSpaceShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorSpaces()

CreatorProfile.useGlobalHeader = true

export default CreatorProfile
