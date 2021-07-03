import 'twin.macro'
import DashboardShell from '../Common/Shell'
import CreatorDashboardSettingsSidebar from './SettingsSidebar'

export default function CreatorDashboardSettingsShell({ children }) {
  return (
    <DashboardShell>
      <div tw="py-6">
        <div tw="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div tw="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav
              aria-label="Sidebar"
              tw="sticky top-6 divide-y divide-gray-300"
            >
              <CreatorDashboardSettingsSidebar />
            </nav>
          </div>
          <main tw="lg:col-span-9 xl:col-span-10">{children}</main>
        </div>
      </div>
    </DashboardShell>
  )
}
