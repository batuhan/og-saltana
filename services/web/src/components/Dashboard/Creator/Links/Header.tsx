import 'twin.macro'
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
import tw from 'twin.macro'
export default function SubHeader({ link, isLink }) {
  const {
    register,
    formState: { isDirty, isSubmitting, isValid },
  } = useFormContext()

  return (
    <div tw="bg-black text-white">
      <div tw="max-w-3xl mx-auto px-4 pb-5 sm:px-6 lg:max-w-5xl lg:px-8">
        <div tw="relative">
          <div>
            <nav tw="hidden sm:flex" aria-label="Breadcrumb">
              <ol tw="flex items-center space-x-4">
                <li>
                  <div>
                    <CreatorDashboardLink>
                      <a tw="text-sm font-medium text-gray-400 hover:text-gray-200">
                        Dashboard
                      </a>
                    </CreatorDashboardLink>
                  </div>
                </li>
                <li>
                  <div tw="flex items-center">
                    <ChevronRightIcon
                      tw="flex-shrink-0 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                    <CreatorDashboardLinksLink>
                      <a tw="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200">
                        Links
                      </a>
                    </CreatorDashboardLinksLink>
                  </div>
                </li>
                {isLink && (
                  <li>
                    <div tw="flex items-center">
                      <ChevronRightIcon
                        tw="flex-shrink-0 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                      <CreatorDashboardLinksLink href={`/${link.data.id}`}>
                        <a
                          aria-current="page"
                          tw="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                        >
                          /{link.data.slug}
                        </a>
                      </CreatorDashboardLinksLink>
                    </div>
                  </li>
                )}
              </ol>
            </nav>
          </div>
          {isLink && (
            <div tw="mt-2 md:flex md:items-center md:justify-between">
              <div tw="flex-1 min-w-0">
                <h2 tw="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                  /{link.data.slug}
                </h2>
              </div>
              <div tw="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                <button
                  type="button"
                  tw="ml-1 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 hover:bg-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  <ViewListIcon
                    tw="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Orders
                </button>
                <button
                  type="button"
                  tw="ml-1 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 hover:bg-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  <TrendingUpIcon
                    tw="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Analytics
                </button>
                <button
                  type="button"
                  tw="ml-1 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 hover:bg-gray-800 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  <ExternalLinkIcon
                    tw="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  See live
                </button>
                <button
                  type="submit"
                  disabled={!isDirty || isSubmitting}
                  css={[
                    (!isDirty || isSubmitting) && tw`disabled:opacity-50`,
                    tw`ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500`,
                  ]}
                >
                  Publish changes {!isValid && "SOMETHING IS WRONG"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
