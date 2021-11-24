import {
  CalendarIcon,
  ClockIcon,
  PhotographIcon,
  TableIcon,
  ViewBoardsIcon,
  ViewListIcon,
} from '@heroicons/react/outline'

const linkTypes = [
  {
    name: 'Link List',
    createTitle: 'Create a new link list',
    description: 'List your relevant links all over internet in a simple page',
    type: 'link-list',
    icon: ({ className }) => <ViewListIcon className={className} />,

    background: 'bg-yellow-500',
    createFields: ['link-list', 'slug'],
  },
  {
    name: 'Checkout',
    description: 'Sell documents, downloadable files and more',
    createTitle: 'Create a new digital asset',
    type: 'checkout',
    icon: ({ className }) => <CalendarIcon className={className} />,
    background: 'bg-green-500',
    createFields: ['asset', 'slug'],
  },
  {
    name: 'Notion page',
    description: 'Natively embed Notion content on your Saltana space',
    createTitle: 'Create a new Notion page',
    type: 'embed?type=notion',
    icon: ({ className }) => <PhotographIcon className={className} />,
    background: 'bg-indigo-500',
    createFields: ['destination', 'slug'],
  },
  {
    name: 'Redirection',
    description:
      'Create a link you can track and modify to share on social media',
    createTitle: 'Create a new redirection',
    type: 'redirect',
    icon: ({ className }) => <ViewBoardsIcon className={className} />,
    createFields: ['destination', 'slug'],
    background: 'bg-purple-500',
  },
  {
    name: 'Embed',
    createTitle: 'Create a new embed',
    description:
      'Show your content on other platform within your Saltana space. Supports Notion, AirTable, Figma, YouTube, Twich and more!',
    type: 'embed',
    icon: ({ className }) => <TableIcon className={className} />,
    background: 'bg-blue-500',
    createFields: ['destination', 'slug'],
  },
]

export default linkTypes
