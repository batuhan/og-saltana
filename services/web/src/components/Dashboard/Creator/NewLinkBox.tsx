import _ from 'lodash'
import { CreatorDashboardLinksLink } from 'components/Links'

const soonActions = [
  {
    name: 'Embed',
    description:
      'Show your content on other platform within your Saltana space. Supports Notion, AirTable, Figma, YouTube, Twich and more!',
    type: 'embed',
  },
  {
    name: 'Live',
    description: 'Show your Notion documents within your Saltana space',
    type: 'embed?type=notion',
  },
  {
    name: 'Music Cover',
    description: 'List your music Spotify, SoundCloud etc',
    type: 'music',
  },
].map((action) => ({ ...action, name: `SOON - ${action.name}` }))

const actions = [
  {
    name: 'Checkout',
    description: 'Sell documents, downloadable files and more',
    type: 'checkout',
  },
  {
    name: 'Link List',
    description: 'List your relevant links all over internet in a simple page',
    type: 'link-list',
  },
  {
    name: 'Notion page',
    description: 'Natively embed Notion content on your Saltana space',
    type: 'embed?type=notion',
  },
  {
    name: 'Redirection',
    description:
      'Create a link you can track and modify to share on social media',
    type: 'redirect',
  },
  ...soonActions,
]

export default function CreatorDashboardNewLinkBox() {
  const actionsMap = actions.map(({ name, description, type }, actionIdx) => (
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
