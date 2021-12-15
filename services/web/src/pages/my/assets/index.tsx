import getServerSidePropsForUserDashboardPages from '@/server/getServerSidePropsForUserDashboardPages'
import DashboardShell from 'components/Dashboard/Common/Shell'



export default function MyAssetView() {
  return <DashboardShell>My asset view</DashboardShell>
}

export const getServerSideProps = getServerSidePropsForUserDashboardPages()
