import tw, { styled } from 'twin.macro'
import MarketingShell from 'components/Marketing/Shell'
import {
  ChatAltIcon,
  DocumentReportIcon,
  HeartIcon,
  InboxIcon,
  PencilAltIcon,
  ReplyIcon,
  TrashIcon,
  UsersIcon,
} from '@heroicons/react/outline'

const features = [
  {
    name: 'Unlimited Inboxes',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: InboxIcon,
  },
  {
    name: 'Manage Team Members',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: UsersIcon,
  },
  {
    name: 'Spam Report',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: TrashIcon,
  },
  {
    name: 'Compose in Markdown',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: PencilAltIcon,
  },
  {
    name: 'Team Reporting',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: DocumentReportIcon,
  },
  {
    name: 'Saved Replies',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ReplyIcon,
  },
  {
    name: 'Email Commenting',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ChatAltIcon,
  },
  {
    name: 'Connect with Customers',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: HeartIcon,
  },
]

export default function Features() {
  return (
    <MarketingShell>
      <div tw="bg-black">
        <div tw="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
          <h2 tw="text-3xl font-extrabold text-white tracking-tight">
            Inbox support built for efficiency
          </h2>
          <p tw="mt-4 max-w-3xl text-lg text-indigo-200">
            Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
            magna sit morbi lobortis. Blandit aliquam sit nisl euismod mattis
            in.
          </p>
          <div tw="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name}>
                <div>
                  <span tw="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                    g
                  </span>
                </div>
                <div tw="mt-6">
                  <h3 tw="text-lg font-medium text-white">{feature.name}</h3>
                  <p tw="mt-2 text-base text-indigo-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div tw="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 tw="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span tw="block text-white">Sounds great?</span>
            <span tw="block text-indigo-600">
              Saltana is in private beta for select creators.
            </span>
          </h2>
          <div tw="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div tw="inline-flex rounded-md shadow">
              <a
                href="#"
                tw="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Apply for an invite
              </a>
            </div>
          </div>
        </div>
      </div>
    </MarketingShell>
  )
}
