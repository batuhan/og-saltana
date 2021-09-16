const linkTypes = [
  {
    name: 'Link List',
    createTitle: 'Create a new link list',
    description: 'List your relevant links all over internet in a simple page',
    type: 'link-list',
    createFields: ['link-list', 'slug'],
  },
  {
    name: 'Checkout',
    description: 'Sell documents, downloadable files and more',
    createTitle: 'Create a new digital asset',
    type: 'checkout',
    createFields: ['asset', 'slug'],
  },
  {
    name: 'Notion page',
    description: 'Natively embed Notion content on your Saltana space',
    createTitle: 'Create a new Notion page',
    type: 'embed?type=notion',
    createFields: ['destination', 'slug'],
  },
  {
    name: 'Redirection',
    description:
      'Create a link you can track and modify to share on social media',
    createTitle: 'Create a new redirection',
    type: 'redirect',
    createFields: ['destination', 'slug'],
  },
  {
    name: 'Embed',
    createTitle: 'Create a new embed',
    description:
      'Show your content on other platform within your Saltana space. Supports Notion, AirTable, Figma, YouTube, Twich and more!',
    type: 'embed',
    createFields: ['destination', 'slug'],
  },
]

export default linkTypes
