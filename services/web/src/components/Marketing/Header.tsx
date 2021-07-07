import 'twin.macro'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import { Logo } from '../Logo'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Help', href: '/help' },
]

export default function Header() {
  const [session] = useSession()

  return (
    <header tw="bg-black">
      <nav tw="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div tw="w-full py-6 flex items-center justify-between border-b border-white lg:border-none">
          <div tw="flex items-center">
            <Link href="/" passHref>
              <a>
                <span tw="sr-only">Saltana</span>
                <Logo tw="h-10 w-auto" h="6" fill="#ffffff" />
              </a>
            </Link>
            <div tw="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link key={link.name} href={link.href} passHref>
                  <a tw="text-base font-medium text-white hover:text-indigo-50">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div tw="ml-10 space-x-4">
            {session ? (
              <Link href="/dashboard" passHref>
                <a tw="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">
                  Dashboard
                </a>
              </Link>
            ) : (
              <>
                <Link href="/login" passHref>
                  <a tw="inline-block py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                    Login
                  </a>
                </Link>
                <Link href="/request-invite" passHref>
                  <a tw="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">
                    Request an invite
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
        <div tw="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link key={link.name} href={link.href} passHref>
              <a tw="text-base font-medium text-white hover:text-indigo-50">
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
