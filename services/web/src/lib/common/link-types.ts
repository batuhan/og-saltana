const linkTypes = [
  {
    name: 'Embed',
    createTitle: 'Create a new embed',
    description:
      'Show your content on other platform within your Saltana space. Supports Notion, AirTable, Figma, YouTube, Twich and more!',
    type: 'embed',
    createFields: ['destination', 'slug'],
  },
  {
    name: 'Digital Asset',
    description: 'Sell documents, downloadable files and more',
    createTitle: 'Create a new digital asset',
    type: 'asset',
    createFields: [],
  },
  {
    name: 'Redirection',
    createTitle: 'Create a new redirection',
    description:
      'Create a link you can track and modify to share on social media',
    type: 'redirect',
    createFields: ['destination', 'slug'],
  },
  {
    name: 'Notion page',
    createTitle: 'Create a new Notion page',
    description: 'Show your Notion documents within your Saltana space',
    type: 'embed?type=notion',
    createFields: ['destination', 'slug'],
  },
]

export default linkTypes
