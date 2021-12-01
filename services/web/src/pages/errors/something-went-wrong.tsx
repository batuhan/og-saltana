import { NextSeo } from 'next-seo'
import { DefaultLink } from 'components/Links'
import Link from 'next/link'

export default function ErrorSomethingWentWrong() {
  return (
    <>
      <NextSeo title="Something went wrong:(" />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">something went wrong :/</span>
            <span className="block">we are not sure what happened/.</span>
          </h2>

          <div className="mt-8 flex justify-center">
            <div className="ml-3 inline-flex">
              <DefaultLink>
                <a className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-indigo-700">
                  back to the home page
                </a>
              </DefaultLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
