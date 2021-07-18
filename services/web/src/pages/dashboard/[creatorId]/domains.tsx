import { NextSeo } from 'next-seo'
import React from 'react'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import CreatorDashboardSettingsShell from 'components/Dashboard/Creator/SettingsShell'
import tw from 'twin.macro'

export default function CreatorDashboardIntegrations() {
  return (
    <CreatorDashboardSettingsShell>
      <NextSeo title="Integrations" />

      <div tw="container flex  mx-auto w-full">
        <div tw="container flex flex-col mx-5 w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
          <div tw="px-4 py-5 sm:px-6 border-b w-full">
            <h3 tw="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Analytics
            </h3>
            <p tw="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
              lorem ipsum
            </p>
          </div>
          <ul tw="flex flex-col divide divide-y">
            <li tw="flex flex-row">
              <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                  <a href="#" tw="block relative">
                    <img
                      alt="profil"
                      src="/images/person/6.jpg"
                      tw="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
                <div tw="flex-1 pl-1 mr-16">
                  <div tw="font-medium dark:text-white">Jean Marc</div>
                  <div tw="text-gray-600 dark:text-gray-200 text-sm">
                    Developer
                  </div>
                </div>
                <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
                <button tw="w-24 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
            <li tw="flex flex-row">
              <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                  <a href="#" tw="block relative">
                    <img
                      alt="profil"
                      src="/images/person/10.jpg"
                      tw="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
                <div tw="flex-1 pl-1 mr-16">
                  <div tw="font-medium dark:text-white">Designer</div>
                  <div tw="text-gray-600 dark:text-gray-200 text-sm">
                    Charlie Moi
                  </div>
                </div>
                <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
                <button tw="w-24 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
            <li tw="flex flex-row">
              <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                  <a href="#" tw="block relative">
                    <img
                      alt="profil"
                      src="/images/person/3.jpg"
                      tw="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
                <div tw="flex-1 pl-1 mr-16">
                  <div tw="font-medium dark:text-white">CEO</div>
                  <div tw="text-gray-600 dark:text-gray-200 text-sm">
                    Marine Jeanne
                  </div>
                </div>
                <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
                <button tw="w-24 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
            <li tw="flex flex-row">
              <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                  <a href="#" tw="block relative">
                    <img
                      alt="profil"
                      src="/images/person/7.jpg"
                      tw="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
                <div tw="flex-1 pl-1 mr-16">
                  <div tw="font-medium dark:text-white">CTO</div>
                  <div tw="text-gray-600 dark:text-gray-200 text-sm">
                    Boby PArk
                  </div>
                </div>
                <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
                <button tw="w-24 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div tw="container flex flex-col mx-5 w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
          <div tw="px-4 py-5 sm:px-6 border-b w-full">
            <h3 tw="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Analytics
            </h3>
            <p tw="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
              lorem ipsum
            </p>
          </div>
          <ul tw="flex flex-col divide divide-y">
            <li tw="flex flex-row">
              <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                  <a href="#" tw="block relative">
                    <img
                      alt="profil"
                      src="/images/person/6.jpg"
                      tw="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
                <div tw="flex-1 pl-1 mr-16">
                  <div tw="font-medium dark:text-white">Jean Marc</div>
                  <div tw="text-gray-600 dark:text-gray-200 text-sm">
                    Developer
                  </div>
                </div>
                <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
                <button tw="w-24 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
            <li tw="flex flex-row">
              <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                  <a href="#" tw="block relative">
                    <img
                      alt="profil"
                      src="/images/person/10.jpg"
                      tw="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
                <div tw="flex-1 pl-1 mr-16">
                  <div tw="font-medium dark:text-white">Designer</div>
                  <div tw="text-gray-600 dark:text-gray-200 text-sm">
                    Charlie Moi
                  </div>
                </div>
                <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
                <button tw="w-24 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
            <li tw="flex flex-row">
              <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                  <a href="#" tw="block relative">
                    <img
                      alt="profil"
                      src="/images/person/3.jpg"
                      tw="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
                <div tw="flex-1 pl-1 mr-16">
                  <div tw="font-medium dark:text-white">CEO</div>
                  <div tw="text-gray-600 dark:text-gray-200 text-sm">
                    Marine Jeanne
                  </div>
                </div>
                <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
                <button tw="w-24 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
            <li tw="flex flex-row">
              <div tw="select-none cursor-pointer flex flex-1 items-center p-4">
                <div tw="flex flex-col w-10 h-10 justify-center items-center mr-4">
                  <a href="#" tw="block relative">
                    <img
                      alt="profil"
                      src="/images/person/7.jpg"
                      tw="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                </div>
                <div tw="flex-1 pl-1 mr-16">
                  <div tw="font-medium dark:text-white">CTO</div>
                  <div tw="text-gray-600 dark:text-gray-200 text-sm">
                    Boby PArk
                  </div>
                </div>
                <div tw="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
                <button tw="w-24 text-right flex justify-end">
                  <svg
                    width="20"
                    fill="currentColor"
                    height="20"
                    tw="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </CreatorDashboardSettingsShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()