import * as React from 'react'
import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'

const CreatorLinkOrderDetails = () => {
  return (
    <CreatorSpaceShell>
      <div>sdcs</div>
    </CreatorSpaceShell>
  )
}

export const getStaticProps = getStaticPropsForCreatorSpacePages()

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default CreatorLinkOrderDetails
