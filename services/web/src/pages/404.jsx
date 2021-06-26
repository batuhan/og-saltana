import tw, { styled } from 'twin.macro'
import MarketingShell from '../components/MarketingShell/MarketingShell'

export default function Custom404() {
  return (
    <MarketingShell>
    <div tw="bg-white">
      <div tw="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 tw="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span tw="block">four-oh-four :/</span>
          <span tw="block">There's nothing here, yet.</span>
        </h2>
        <div tw="mt-8 flex justify-center">
          <div tw="inline-flex rounded-md shadow">
            <a
              href="#"
              tw="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Request invite to claim this space
            </a>
          </div>
          <div tw="ml-3 inline-flex">
            <a
              href="#"
              tw="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-indigo-700"
            >
              Take me out of here
            </a>
          </div>
        </div>
        <div tw="mt-8 flex justify-center">
          <iframe
            tw="w-full "
            src="https://giphy.com/embed/26hkhPJ5hmdD87HYA"
            width="480"
            height="480"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
    </MarketingShell>
  )
}

Custom404.useGlobalHeader = false
