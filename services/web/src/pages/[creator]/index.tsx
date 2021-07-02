import * as React from 'react'
import CreatorSpaceShell from '../../components/CreatorSpaceShell'
import getServerSidePropsForCreatorSpaces from '../../modules/server/getServerSidePropsForCreatorSpacePages'

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
