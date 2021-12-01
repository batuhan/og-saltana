import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrendingUpIcon,
  ExternalLinkIcon,
  ViewListIcon,
} from '@heroicons/react/solid'
import useCreatorSpace from 'hooks/useCreatorSpace'
import {
  CreatorDashboardLink,
  CreatorDashboardLinksLink,
} from 'components/Links'
import { useFormContext } from 'react-hook-form'
import classNames from '@/common/classnames'
export default function SubHeader({ link, isLink }) {
  const {
    register,
    formState: { isDirty, isSubmitting, isValid },
  } = useFormContext()

  const { creator } = useCreatorSpace()
  return (
    <div className="bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 pb-5 sm:px-6 lg:max-w-5xl lg:px-8">
        <div className="relative">
          {isLink && (
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                  /{link.data.slug}
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
                <a
                  href={`https://${creator.data.username}.dev.saltana.com/${link.data.slug}`}
                  target="_blank"
                  className="ml-1 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 hover:bg-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  <ExternalLinkIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  See live
                </a>
                <button
                  type="submit"
                  disabled={!isDirty || isSubmitting}
                  className={classNames(
                    (!isDirty || isSubmitting) && 'disabled:opacity-50',
                    'ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500',
                  )}
                >
                  Publish changes {!isValid && 'SOMETHING IS WRONG'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
