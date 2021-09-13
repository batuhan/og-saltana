import { NextSeo } from 'next-seo'

import ContentEditor from 'components/ContentEditor/ContentEditor'
import useCreatorSpace from 'hooks/useCreatorSpace'
import { RadioGroup, Switch } from '@headlessui/react'
import React from 'react'

export default function CreatorDashboardLinkDeliverablesScreen({ asset }) {
  return (
    <section aria-labelledby="plan-heading">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h2
              id="plan-heading"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Deliverables
            </h2>
          </div>
          <div className="bg-gray-50 sm:rounded-lg mb-5">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add anything you want.
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Content you'll create below will be available to anyone who
                  buys this asset. You can upload files, embed Notion pages and
                  more. See help for more info.
                </p>
                <p>
                  If you want to provide automatic access to a third party
                  service like Thinkific, Zapier, IFTT, check Workflows
                </p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Some action
                </button>
              </div>
            </div>
          </div>
          <ContentEditor fieldName="asset.metadata.deliverables" />
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  )
}
