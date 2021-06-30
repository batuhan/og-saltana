import tw, { styled } from 'twin.macro'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]

export default function Breadcrumb() {
  return (
    <nav tw="flex" aria-label="Breadcrumb">
      <ol tw="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" tw="text-gray-400 hover:text-gray-500">
              <HomeIcon tw="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span tw="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div tw="flex items-center">
              <ChevronRightIcon tw="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <a
                href={page.href}
                tw="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
