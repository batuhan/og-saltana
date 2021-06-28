import tw, { styled } from 'twin.macro'

const navigationFooter = [
  { name: 'Product Updates', href: '/product-updates' },
  { name: 'Blog', href: '/blog' },
  { name: 'API', href: '/docs' },
  { name: 'Support', href: '/help' },
]

export default function Footer() {
  return (
    <footer tw="bg-black">
      <div tw="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav tw="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {navigationFooter.map(({ name, href }) => (
            <div key={name} tw="px-5 py-2">
              <a href={href} tw="text-base text-white hover:text-gray-500">
                {name}
              </a>
            </div>
          ))}
        </nav>
        <p tw="mt-8 text-center text-base text-white">
          &copy; 2021 Saltana, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
