import getServerSidePropsForCreatorDashboardPages from "./getServerSidePropsForCreatorDashboardPages"

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages(
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
