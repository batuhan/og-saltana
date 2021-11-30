import { DefaultLink } from 'components/Links'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

export default function ErrorPage({ statusCode }) {
  return (
    <>
      <NextSeo title="Oh no an error!" />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">An error happend :/</span>
          </h2>
          <p>{statusCode && `error code is ${statusCode}`}</p>
          <p>
            error logs and motivational puppies were dispatched to our engineers
            in response
          </p>
          <div className="mt-8 flex justify-center">
            <div className="ml-3 inline-flex">
              <DefaultLink>
                <a className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-indigo-700">
                  Take me out of here
                </a>
              </DefaultLink>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <iframe
              className="w-full "
              src="https://giphy.com/embed/dZRI96NcCiAvjWEKBR"
              width="480"
              height="480"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  )
}
