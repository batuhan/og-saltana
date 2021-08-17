import { NextSeo } from 'next-seo'
import 'twin.macro'

import ContentEditor from 'components/ContentEditor/ContentEditor'
import useCreatorSpace from 'hooks/useCreatorSpace'

export default function CreatorDashboardLinkDeliverablesScreen() {
  const { creator, asset } = useCreatorSpace()

  return (
    <main>
      <NextSeo title="Deliverables" />
      <div tw="bg-gray-50 sm:rounded-lg mb-5">
        <div tw="px-4 py-5 sm:p-6">
          <h3 tw="text-lg leading-6 font-medium text-gray-900">
            Add anything you want.
          </h3>
          <div tw="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Content you'll create below will be available to anyone who buys
              this asset. You can upload files, embed Notion pages and more. See
              help for more info.
            </p>
            <p>
              If you want to provide automatic access to a third party service
              like Thinkific, Zapier, IFTT, check Workflows
            </p>
          </div>
          <div tw="mt-5">
            <button
              type="button"
              tw="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Some action
            </button>
          </div>
        </div>
      </div>
      <ContentEditor fieldName="asset.metadata.deliverables" />
    </main>
  )
}
