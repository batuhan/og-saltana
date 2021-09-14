import useApi from 'hooks/useApi'
import * as React from 'react'
import { useCart } from 'react-use-cart'

const AssetInfoBox = ({ assetId }) => {
  const { addItem } = useCart()

  return (
    <section className="text-blueGray-700 ">
      <div className="container px-5 py-12 lg:px-20">
        <div className="flex flex-wrap items-end justify-start w-full bg-white border rounded-lg shadow-xl ">
          <div className="w-full xl:w-1/4 md:w-1/4">
            <div className="relative flex flex-col h-full p-8 ">
              <h2 className="mb-4 text-sm font-medium tracking-widest text-blueGray-700 uppercase title-font">
                Sponsorships
              </h2>
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                adsfsdfsd
              </p>
              <p className="flex items-center mb-2 text-base font-normal tracking-tight text-blueGray-500">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blueGray-500 rounded-full">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
                1 Newsletter Issue.
              </p>
              <p className="flex items-center mb-2 text-base font-normal tracking-tight text-blueGray-500">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blueGray-500 rounded-full">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1.6k+ Readers.
              </p>
            </div>
          </div>
          <div className="w-full xl:w-1/4 md:w-1/4">
            <div className="relative flex flex-col h-full p-8 ">
              <p className="flex items-center mb-2 text-base font-normal tracking-tight text-blueGray-500">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blueGray-500 rounded-full">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Newsletterasdass Top.
              </p>
              <p className="flex items-center mb-2 text-base font-normal tracking-tight text-blueGray-500">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blueGray-500 rounded-full">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1 Newsletter Issue.
              </p>
              <p className="flex items-center mb-2 text-base font-normal tracking-tight text-blueGray-500">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blueGray-500 rounded-full">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1.6k+ Readers.
              </p>
            </div>
          </div>
          <div className="w-full xl:w-1/4 md:w-1/4">
            <div className="relative flex flex-col h-full p-8 ">
              <p className="flex items-center mb-2 text-base font-normal tracking-tight text-blueGray-500">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blueGray-500 rounded-full">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Newsletterasfds Top.
              </p>
              <p className="flex items-center mb-2 text-base font-normal tracking-tight text-blueGray-500">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blueGray-500 rounded-full">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1 Newsletter Issue.
              </p>
              <p className="flex items-center mb-2 text-base font-normal tracking-tight text-blueGray-500">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white bg-blueGray-500 rounded-full">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1.6k+ Readers.
              </p>
            </div>
          </div>
          <div className="w-full xl:w-1/4 md:w-1/4 lg:ml-auto">
            <div className="relative flex flex-col h-full p-8">
              <strong className="flex items-end mx-auto text-3xl font-black leading-none text-black ">
                <span>$10 </span>
              </strong>
              <button
                role="button"
                className="w-full px-4 py-2 mx-auto mt-3 text-base font-medium text-blue-600 transition duration-500 ease-in-out transform bg-blue-100 rounded-lg hover:bg-blue-300 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
              >
                Buy Now{' '}
              </button>
              <p className="mx-auto mt-6 text-xs text-blueGray-500">
                Only once within 6 months
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-start w-full mt-10 bg-white border rounded-lg shadow-xl ">
          <div className="w-full xl:w-1/4 md:w-1/4">
            <div className="relative flex flex-col h-full p-8 ">
              <h2 className="mb-4 text-sm font-medium tracking-widest text-blueGray-700 uppercase title-font">
                {' '}
                Sponsorships{' '}
              </h2>
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Newsletterasfds Top.
              </p>
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1 Newsletter Issue.
              </p>
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1.6k+ Readers.
              </p>
            </div>
          </div>
          <div className="w-full xl:w-1/4 md:w-1/4">
            <div className="relative flex flex-col h-full p-8 ">
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Newsletterasfds Top.
              </p>
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1 Newsletter Issue.
              </p>
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1.6k+ Readers.
              </p>
            </div>
          </div>
          <div className="w-full xl:w-1/4 md:w-1/4">
            <div className="relative flex flex-col h-full p-8 ">
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Newsletterasfds Top.
              </p>
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1 Newsletter Issue.
              </p>
              <p className="flex items-center mb-2 text-base font-medium leading-relaxed text-blueGray-700">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                1.6k+ Readers.
              </p>
            </div>
          </div>
          <div className="w-full xl:w-1/4 md:w-1/4 lg:ml-auto">
            <div className="relative flex flex-col h-full p-8">
              <strong className="flex items-end mx-auto text-3xl font-black leading-none text-black ">
                <span>$50 </span>
              </strong>
              <button
                role="button"
                className="w-full px-4 py-2 mx-auto mt-3 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md items-centerw-full focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-700 "
              >
                Buy Now{' '}
              </button>
              <p className="mx-auto mt-6 text-xs text-blueGray-500">
                Only once within 6 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AssetInfoBox
