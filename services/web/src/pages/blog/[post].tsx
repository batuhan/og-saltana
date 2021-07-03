import { CheckIcon } from '@heroicons/react/outline'
import tw, { styled } from 'twin.macro'
import { NextSeo } from 'next-seo'
import MarketingShell from 'components/Marketing/Shell'
const features = [
  'Vitae in pulvinar odio id utobortis in inter.',
  'Sed sed id viverra viverra augue eget massa.',
  'Urna, gravida amet, a, integer venenatis.',
  'Lobortis sed pharetra amet vitae eleifend.',
  'Ullamcorper blandit a consequat donec elit aoreet.',
  'Dolor quo assumenda.',
  'Esse rerum distinctio maiores maiores.',
  'Eos enim officiis ratione.',
  'Tempore molestiae aliquid excepturi.',
  'Perspiciatis eveniet inventore eum et aliquam.',
]

export default function BlogPost() {
  return (
    <MarketingShell>
      <NextSeo title="Pricing" />

      <div tw="bg-white">
        <div tw="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div tw="pb-16 xl:flex xl:items-center xl:justify-between">
            <div>
              <h1 tw="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
                <span tw="text-gray-900">Everything you need for </span>
                <span tw="text-indigo-600">$99 a month</span>
              </h1>
              <p tw="mt-5 text-xl text-gray-500">
                Includes every feature we offer plus unlimited projects and
                unlimited users.
              </p>
            </div>
            <a
              href="#"
              tw="mt-8 w-full bg-indigo-600 border border-transparent px-5 py-3 inline-flex items-center justify-center text-base font-medium rounded-md text-white hover:bg-indigo-700 sm:mt-10 sm:w-auto xl:mt-0"
            >
              Get started today
            </a>
          </div>
          <div tw="border-t border-gray-200 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
            <div>
              <h2 tw="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                Everything you need
              </h2>
              <p tw="mt-2 text-3xl font-extrabold text-gray-900">
                All-in-one platform
              </p>
              <p tw="mt-4 text-lg text-gray-500">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
                Malesuada adipiscing sagittis vel nulla nec. Urna, sed a lectus
                elementum blandit et.
              </p>
            </div>
            <div tw="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:mt-0 xl:col-span-2">
              <ul tw="divide-y divide-gray-200">
                {features.slice(0, 5).map((feature, featureIdx) =>
                  featureIdx === 0 ? (
                    <li key={feature} tw="py-4 flex md:py-0 md:pb-4">
                      <CheckIcon
                        tw="flex-shrink-0 h-6 w-6 text-green-500"
                        aria-hidden="true"
                      />
                      <span tw="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  ) : (
                    <li key={feature} tw="py-4 flex">
                      <CheckIcon
                        tw="flex-shrink-0 h-6 w-6 text-green-500"
                        aria-hidden="true"
                      />
                      <span tw="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  )
                )}
              </ul>
              <ul tw="border-t border-gray-200 divide-y divide-gray-200 md:border-t-0">
                {features.slice(5).map((feature, featureIdx) =>
                  featureIdx === 0 ? (
                    <li
                      key={feature}
                      tw="py-4 flex md:border-t-0 md:py-0 md:pb-4"
                    >
                      <CheckIcon
                        tw="flex-shrink-0 h-6 w-6 text-green-500"
                        aria-hidden="true"
                      />
                      <span tw="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  ) : (
                    <li key={feature} tw="py-4 flex">
                      <CheckIcon
                        tw="flex-shrink-0 h-6 w-6 text-green-500"
                        aria-hidden="true"
                      />
                      <span tw="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MarketingShell>
  )
}
