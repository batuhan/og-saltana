import { DefaultLink } from 'components/Links'
import Link from 'next/link'

function ListItem() {}

export default function LinkListEditor() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">four-oh-four :/</span>
          <span className="block">There&quot;s nothing here, yet.</span>
        </h2>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link href="/request-invite">
              <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Request invite to claim this space
              </a>
            </Link>
          </div>
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
            src="https://giphy.com/embed/26hkhPJ5hmdD87HYA"
            width="480"
            height="480"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
