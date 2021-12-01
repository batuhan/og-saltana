import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrendingUpIcon,
  ExternalLinkIcon,
  ViewListIcon,
} from '@heroicons/react/solid'
export default function CreatorDashboardAssetSubHeader({ asset }) {
  return (
    <div className="bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 pb-5 sm:px-6 lg:max-w-5xl lg:px-8">
        <div className="relative">
          <div className="mt-10 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                {asset.data.name}
              </h2>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="ml-1 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 hover:bg-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              >
                <ViewListIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Orders
              </button>
              <button
                type="button"
                className="ml-1 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 hover:bg-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              >
                <TrendingUpIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
