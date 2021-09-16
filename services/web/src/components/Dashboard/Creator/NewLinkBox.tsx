import _ from 'lodash'
import { CreatorDashboardLinksLink } from 'components/Links'
import linkTypes from '@/common/link-types'
export default function CreatorDashboardNewLinkBox() {
  const actionsMap = linkTypes.map(({ name, description, type }, actionIdx) => (
    <li key={name} className="flow-root">
      <div className="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <CreatorDashboardLinksLink href={`/create/${type}`} passHref>
              <a href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {name}
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </CreatorDashboardLinksLink>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </li>
  ))

  return (
    <section aria-labelledby="quick-links-title">
      <ul
        role="list"
        className="mt-6 px-4 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"
      >
        {actionsMap}
      </ul>
    </section>
  )
}
