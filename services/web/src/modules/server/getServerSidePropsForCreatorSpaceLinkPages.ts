import getServerSidePropsForCreatorSpaces from './getServerSidePropsForCreatorSpaces'

export const getServerSideProps = getServerSidePropsForCreatorSpaces(
  async ({ session, instance, queryClient }) => {
    const links = await instance.links.list({
      ownerId: session.user.id,
      nbResultsPerPage: 100,
    })

    queryClient.setQueryData(
      [
        'links',
        'list',
        {
          ownerId: session.user.id,
          nbResultsPerPage: 100,
        },
      ],
      links
    )

    return {}
  }
)
