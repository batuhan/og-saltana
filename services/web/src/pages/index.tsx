import { Container, Heading, VStack, Text } from '@chakra-ui/react'
import tw, { styled } from 'twin.macro'

function Home() {
  return (
    <Container>
      <section tw="relative pb-20">
        <div tw="relative container pt-12 px-4 mx-auto text-center">
          <span tw="text-blue-400 font-semibold">
            For the creators, by the creators
          </span>
          <h2 tw="mt-8 mb-8 lg:mb-12 text-4xl lg:text-6xl font-semibold">
            Selling digital products is easy with Saltana
          </h2>
          <p tw="max-w-3xl mx-auto mb-8 lg:mb-12 text-xl text-gray-500">
            Creator economy is the future, get ready to seize it! Saltana
            provides creators with easy checkouts and hassle-free delivery.
          </p>
          <a
            tw="inline-block w-full md:w-auto mb-2 md:mb-0 px-8 py-4 mr-4 text-lg font-medium leading-normal bg-red-400 hover:bg-red-300 text-white rounded transition duration-200"
            href="https://form.typeform.com/to/pEOpVF3E"
            data-mode="drawer_right"
            target="_blank"
          >
            Get early access
          </a>
        </div>
      </section>

      <section tw="relative py-20 overflow-x-hidden">
        <div tw="container px-4 mx-auto">
          <div tw="relative max-w-2xl mx-auto">
            <div tw="absolute top-0 left-0 lg:-ml-20">
              <svg
                width="552"
                height="414"
                viewbox="0 0 552 414"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M299 269.675C299 151.65 388.187 28.1937 528.224 0.154258C528.676 0.0636969 529.136 0.294669 529.33 0.713275L551.18 47.9217C551.424 48.449 551.174 49.0702 550.633 49.2812C500.445 68.8437 456.451 134.368 450.998 180.121C450.935 180.651 451.309 181.121 451.836 181.208C508.665 190.617 552 239.966 552 299.483C552 372.669 492.568 414 432.423 414C363.078 414 299 360.985 299 269.675ZM0 269.675C0 151.65 89.1865 28.1937 229.224 0.154258C229.676 0.0636969 230.136 0.294669 230.33 0.713274L252.18 47.9217C252.424 48.449 252.174 49.0702 251.633 49.2812C201.445 68.8437 157.451 134.368 151.998 180.121C151.935 180.651 152.309 181.121 152.836 181.208C209.665 190.617 253 239.966 253 299.483C253 372.669 193.568 414 133.423 414C64.078 414 0 360.985 0 269.675Z"
                  fill="url(#paint0_linear)"
                ></path>
                <defs>
                  <lineargradient
                    id="paint0_linear"
                    x1="648"
                    y1="-418.5"
                    x2="107.461"
                    y2="354.11"
                    gradientunits="userSpaceOnUse"
                  >
                    <stop stop-color="white" stop-opacity="0">
                      <stop offset="1" stop-color="#F2F5FA"></stop>
                    </stop>
                  </lineargradient>
                </defs>
              </svg>
            </div>
            <div tw="relative z-10 lg:py-10">
              <p tw="mb-10 text-2xl leading-loose">
                Saltana helps you create branded checkout experiences just for
                the purpose of selling digital products online. Turn your side
                hustle into a business with end-to-end sales process from hosted
                payment pages, checkout, automated promotions to delivery, and
                so much more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section tw="relative py-20">
        <div tw="container px-4 mx-auto">
          <div tw="flex flex-wrap items-start -mx-4">
            <div tw="relative w-full md:w-1/2 px-4 mb-12 md:mb-0">
              <img
                tw="h-96 w-full rounded-xl object-cover"
                style="height:100%;"
                src="images/productive.png"
                alt=""
              />
            </div>
            <div tw="relative w-full md:w-1/2 px-4 pb-20 lg:pb-0">
              <div tw="lg:ml-auto max-w-md">
                <h2 tw="mb-6 lg:mb-10 text-4xl font-semibold">Full-service</h2>
                <p tw="mb-6 lg:mb-10 text-xl text-gray-500">
                  Whether you&rsquo;re selling ebooks, software, online courses,
                  or other digital products, Saltana&rsquo;s full-service
                  product platform makes it easy to sell more, stay lean, and
                  compete big.
                </p>
                <div tw="mb-10 border rounded-lg">
                  <div tw="flex p-4 border-b">
                    <svg
                      tw="mr-4 mt-1"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.43 12.99L14.18 8.24C14.52 7.9 14.52 7.35 14.18 7C13.84 6.66 13.28 6.66 12.94 7L8.81 11.13L7.06 9.38C6.72 9.04 6.16 9.04 5.82 9.38C5.48 9.72 5.48 10.27 5.82 10.62L8.2 12.99C8.37 13.16 8.59 13.24 8.81 13.24C9.04 13.24 9.26 13.16 9.43 12.99Z"
                        fill="#45C1FF"
                      ></path>
                    </svg>
                    <h3 tw="font-semibold">Modern, responsive checkout</h3>
                  </div>
                  <div tw="flex p-4 border-b">
                    <svg
                      tw="mr-4 mt-1"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.43 12.99L14.18 8.24C14.52 7.9 14.52 7.35 14.18 7C13.84 6.66 13.28 6.66 12.94 7L8.81 11.13L7.06 9.38C6.72 9.04 6.16 9.04 5.82 9.38C5.48 9.72 5.48 10.27 5.82 10.62L8.2 12.99C8.37 13.16 8.59 13.24 8.81 13.24C9.04 13.24 9.26 13.16 9.43 12.99Z"
                        fill="#45C1FF"
                      ></path>
                    </svg>
                    <h3 tw="font-semibold">Fast &amp; secure delivery</h3>
                  </div>
                  <div tw="flex p-4">
                    <svg
                      tw="mr-4 mt-1"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.43 12.99L14.18 8.24C14.52 7.9 14.52 7.35 14.18 7C13.84 6.66 13.28 6.66 12.94 7L8.81 11.13L7.06 9.38C6.72 9.04 6.16 9.04 5.82 9.38C5.48 9.72 5.48 10.27 5.82 10.62L8.2 12.99C8.37 13.16 8.59 13.24 8.81 13.24C9.04 13.24 9.26 13.16 9.43 12.99Z"
                        fill="#45C1FF"
                      ></path>
                    </svg>
                    <h3 tw="font-semibold">Full product reports</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section tw="relative py-20 overflow-x-hidden">
        <div tw="container px-4 mx-auto">
          <div tw="relative flex flex-wrap items-center -mx-4">
            <div tw="relative w-full lg:w-1/2 px-4 pb-12 lg:pb-0">
              <div tw="max-w-md">
                <h2 tw="mb-6 lg:mb-10 text-4xl font-semibold">Easy to use</h2>
                <p tw="mb-6 lg:mb-10 text-xl text-gray-500">
                  Saltana is a one-stop platform for creators to sell digital
                  products from selling, delivering, marketing to analytics. A
                  simple and powerful solution.
                </p>
                <div tw="mb-10 border rounded-lg">
                  <div tw="flex p-4 border-b">
                    <svg
                      tw="mr-4 mt-1"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.43 12.99L14.18 8.24C14.52 7.9 14.52 7.35 14.18 7C13.84 6.66 13.28 6.66 12.94 7L8.81 11.13L7.06 9.38C6.72 9.04 6.16 9.04 5.82 9.38C5.48 9.72 5.48 10.27 5.82 10.62L8.2 12.99C8.37 13.16 8.59 13.24 8.81 13.24C9.04 13.24 9.26 13.16 9.43 12.99Z"
                        fill="#45C1FF"
                      ></path>
                    </svg>
                    <h3 tw="font-semibold">Discount &amp; promo codes</h3>
                  </div>
                  <div tw="flex p-4 border-b">
                    <svg
                      tw="mr-4 mt-1"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.43 12.99L14.18 8.24C14.52 7.9 14.52 7.35 14.18 7C13.84 6.66 13.28 6.66 12.94 7L8.81 11.13L7.06 9.38C6.72 9.04 6.16 9.04 5.82 9.38C5.48 9.72 5.48 10.27 5.82 10.62L8.2 12.99C8.37 13.16 8.59 13.24 8.81 13.24C9.04 13.24 9.26 13.16 9.43 12.99Z"
                        fill="#45C1FF"
                      ></path>
                    </svg>
                    <h3 tw="font-semibold">Embedded buttons</h3>
                  </div>
                  <div tw="flex p-4">
                    <svg
                      tw="mr-4 mt-1"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.67 0H14.34C17.73 0 20 2.38 20 5.92V14.091C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0ZM9.43 12.99L14.18 8.24C14.52 7.9 14.52 7.35 14.18 7C13.84 6.66 13.28 6.66 12.94 7L8.81 11.13L7.06 9.38C6.72 9.04 6.16 9.04 5.82 9.38C5.48 9.72 5.48 10.27 5.82 10.62L8.2 12.99C8.37 13.16 8.59 13.24 8.81 13.24C9.04 13.24 9.26 13.16 9.43 12.99Z"
                        fill="#45C1FF"
                      ></path>
                    </svg>
                    <h3 tw="font-semibold">Income analytics</h3>
                  </div>
                </div>
              </div>
            </div>
            <div tw="w-full lg:w-1/2 px-4">
              <img
                tw="w-full h-11 mx-auto mb-6 md:mb-0 rounded-xl object-cover"
                style="height:100%;"
                src="images/easy-to-use.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section tw="py-20">
        <div tw="container mx-auto px-4">
          <div tw="flex flex-wrap -mx-3">
            <div tw="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
              <div tw="p-6 md:p-8 h-full border rounded-lg hover:bg-white hover:shadow-xl hover:border-transparent cursor-pointer">
                <span tw="flex-shrink-0 flex items-center justify-center w-16 h-16 mb-8 md:mb-12 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    tw="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke="white"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 tw="mb-4 text-2xl font-semibold">Sell</h3>
                  <p tw="text-base text-gray-500">
                    You can use our shopping cart and embed button on your
                    website or you can direct your customers to our hosted
                    payment page.
                  </p>
                </div>
              </div>
            </div>
            <div tw="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
              <div tw="p-6 md:p-8 h-full border rounded-lg hover:bg-white hover:shadow-xl hover:border-transparent cursor-pointer">
                <span tw="flex-shrink-0 flex items-center justify-center w-16 h-16 mb-8 md:mb-12 bg-blue-400 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    tw="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="white"
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </span>
                <div>
                  <h3 tw="mb-4 text-2xl font-semibold">Deliver</h3>
                  <p tw="text-base text-gray-500">
                    Sell whatever you want, wherever you want and to whomever
                    you want and we'll deliver your downloadable products fast
                    and safe.
                  </p>
                </div>
              </div>
            </div>
            <div tw="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
              <div tw="p-6 md:p-8 h-full border rounded-lg hover:bg-white hover:shadow-xl hover:border-transparent cursor-pointer">
                <span tw="flex-shrink-0 flex items-center justify-center w-16 h-16 mb-8 md:mb-12 bg-red-400 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    tw="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="white"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 tw="mb-4 text-2xl font-semibold">Market</h3>
                  <p tw="text-base text-gray-500">
                    Saltana has all kinds of marketing automations you can think
                    of. Email marketing automation, coupon codes, upsells,
                    affiliates, etc.
                  </p>
                </div>
              </div>
            </div>
            <div tw="w-full md:w-1/2 lg:w-1/3 px-3 mb-6 lg:mb-0">
              <div tw="p-6 md:p-8 h-full border rounded-lg hover:bg-white hover:shadow-xl hover:border-transparent cursor-pointer">
                <span tw="flex-shrink-0 flex items-center justify-center w-16 h-16 mb-8 md:mb-12 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    tw="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="white"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 tw="mb-4 text-2xl font-semibold">Secure</h3>
                  <p tw="text-base text-gray-500">
                    Saltana protects your intellectual property and customers'
                    data with powerful and reliable management tools.
                  </p>
                </div>
              </div>
            </div>
            <div tw="w-full md:w-1/2 lg:w-1/3 px-3 mb-6 lg:mb-0">
              <div tw="p-6 md:p-8 h-full border rounded-lg hover:bg-white hover:shadow-xl hover:border-transparent cursor-pointer">
                <span tw="flex-shrink-0 flex items-center justify-center w-16 h-16 mb-8 md:mb-12 bg-yellow-400 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    tw="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="white"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </span>
                <div>
                  <h3 tw="mb-4 text-2xl font-semibold">Customize</h3>
                  <p tw="text-base text-gray-500">
                    With Saltana, creators can customize every step of the
                    checkout experience. Custom branding, email templates,
                    embedded buttons...
                  </p>
                </div>
              </div>
            </div>
            <div tw="w-full md:w-1/2 lg:w-1/3 px-3 mb-6 lg:mb-0">
              <div tw="p-6 md:p-8 h-full border rounded-lg hover:bg-white hover:shadow-xl hover:border-transparent cursor-pointer">
                <span tw="flex-shrink-0 flex items-center justify-center w-16 h-16 mb-8 md:mb-12 bg-gray-900 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    tw="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="white"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 tw="mb-4 text-2xl font-semibold">Analyze</h3>
                  <p tw="text-base text-gray-500">
                    Optimize your sales process with top-notch dashboards and
                    boost your revenue with Saltana.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section tw="py-20">
        <div tw="container px-4 mx-auto">
          <h2 tw="mb-8 md:mb-16 text-5xl lg:text-6xl font-semibold">
            Sell quickly &amp; scale efficiently
          </h2>
          <div tw="flex flex-wrap items-center">
            <div tw="inline-block max-w-xl mb-6 md:mb-0">
              <p tw="text-xl text-gray-500">
                Saltana is super simple. You just focus on creating digital
                products, start selling in seconds. Your customers will have a
                world class checkout experience.
              </p>
            </div>
            <a
              tw="inline-block ml-auto w-full md:w-auto px-12 py-4 text-center text-lg text-white font-medium leading-normal bg-red-400 hover:bg-red-300 rounded"
              href="https://form.typeform.com/to/pEOpVF3E"
              data-mode="drawer_right"
              target="_blank"
            >
              Get early acess
            </a>
          </div>
        </div>
      </section>

      <section tw="py-20">
        <div tw="container mx-auto px-4">
          <div tw="pb-6 lg:pb-10 border-b border-gray-100">
            <div tw="flex flex-wrap items-start justify-between">
              <div tw="w-full lg:w-1/5 mb-6 lg:mb-0">
                <a
                  tw="inline-block mb-5 text-gray-900 text-lg font-semibold"
                  href="https://www.saltana.com"
                >
                  <img src="images/logo-dark.png" alt="" width="NaN" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div tw="flex flex-wrap justify-between items-center">
              <p tw="text-sm text-gray-500 mt-8">
                All rights reserved &copy; Copyright 2021 hey@saltana.com
              </p>
              <div tw="flex order-first sm:order-last mt-8">
                <a
                  tw="flex justify-center items-center w-10 h-10 mr-4 bg-gray-50 rounded-full"
                  href="https://www.twitter.com/withSaltana/"
                  target="_blank"
                >
                  <svg
                    tw="text-gray-500"
                    width="13"
                    height="11"
                    viewbox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.5455 2.09728C12.0904 2.29892 11.6022 2.43566 11.0892 2.49671C11.613 2.18304 12.014 1.6855 12.204 1.09447C11.7127 1.38496 11.1703 1.59589 10.5924 1.71023C10.1296 1.21655 9.47138 0.909058 8.74128 0.909058C7.34059 0.909058 6.20489 2.04475 6.20489 3.44467C6.20489 3.64322 6.2273 3.83714 6.27057 4.02257C4.16298 3.91671 2.29411 2.90696 1.0433 1.37259C0.824652 1.74653 0.700269 2.18225 0.700269 2.64736C0.700269 3.52734 1.14837 4.30379 1.82825 4.75805C1.41259 4.74415 1.02166 4.62981 0.67942 4.43975V4.47142C0.67942 5.69983 1.55399 6.72504 2.71362 6.95837C2.50116 7.01554 2.27712 7.04722 2.04534 7.04722C1.88156 7.04722 1.72318 7.031 1.56788 7.00009C1.89081 8.00831 2.8272 8.74148 3.93663 8.76158C3.06902 9.44146 1.97504 9.84552 0.786814 9.84552C0.582087 9.84552 0.38043 9.83316 0.181885 9.81076C1.30445 10.5316 2.63716 10.9519 4.06952 10.9519C8.73514 10.9519 11.2854 7.0874 11.2854 3.73595L11.2769 3.4076C11.7752 3.05219 12.2063 2.60564 12.5455 2.09728Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  tw="flex justify-center items-center w-10 h-10 mr-4 bg-gray-50 rounded-full"
                  href="https://www.instagram.com/withSaltana/"
                  target="_blank"
                >
                  <svg
                    tw="text-gray-500"
                    width="14"
                    height="14"
                    viewbox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.06713 0.454529H9.9328C11.9249 0.454529 13.5456 2.07519 13.5455 4.06715V9.93282C13.5455 11.9248 11.9249 13.5454 9.9328 13.5454H4.06713C2.07518 13.5454 0.45459 11.9249 0.45459 9.93282V4.06715C0.45459 2.07519 2.07518 0.454529 4.06713 0.454529ZM9.9329 12.3839C11.2845 12.3839 12.3841 11.2844 12.3841 9.93282H12.384V4.06714C12.384 2.71563 11.2844 1.61601 9.93282 1.61601H4.06715C2.71564 1.61601 1.61609 2.71563 1.61609 4.06714V9.93282C1.61609 11.2844 2.71564 12.384 4.06715 12.3839H9.9329ZM3.57148 7.00005C3.57148 5.10947 5.10951 3.5714 7.00005 3.5714C8.8906 3.5714 10.4286 5.10947 10.4286 7.00005C10.4286 8.89056 8.8906 10.4285 7.00005 10.4285C5.10951 10.4285 3.57148 8.89056 3.57148 7.00005ZM4.75203 6.99998C4.75203 8.23951 5.76054 9.24788 7.00004 9.24788C8.23955 9.24788 9.24806 8.23951 9.24806 6.99998C9.24806 5.76036 8.23963 4.75191 7.00004 4.75191C5.76046 4.75191 4.75203 5.76036 4.75203 6.99998Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

Home.useGlobalHeader = true

export default Home
