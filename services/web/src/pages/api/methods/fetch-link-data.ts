const metascraper = require('metascraper')([
  require('metascraper-amazon')(),
  require('metascraper-audio')(),
  require('metascraper-author')(),
  require('metascraper-clearbit')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  // require('metascraper-helpers')(),
  require('metascraper-iframe')(),
  require('metascraper-image')(),
  require('metascraper-instagram')(),
  require('metascraper-lang')(),
  require('metascraper-logo-favicon')(),
  require('metascraper-logo')(),
  require('metascraper-media-provider')(),
  require('metascraper-publisher')(),
  require('metascraper-readability')(),
  require('metascraper-soundcloud')(),
  require('metascraper-spotify')(),
  require('metascraper-telegram')(),
  require('metascraper-title')(),
  require('metascraper-uol')(),
  require('metascraper-url')(),
  require('metascraper-video')(),
  require('metascraper-youtube')(),
])

const got = require('got')

export default async function CheckoutIntent(req, res) {
  if (req.method !== 'GET') {
    res.status(400).end({
      success: 0,
    })
    return
  }
  console.log(req.query)

  const { body: html, url } = await got(req.query.url)
  const metadata = await metascraper({ html, url })

  console.log(metadata)
  res.status(200).json({
    success: 1,
    meta: {
      metadata,
      title: metadata.title,
      type: 'website',
      url: metadata.url,
      site_name: 'irrelavent',
      description: metadata.description,
      image: {
        url: metadata.image || metadata.logo,
        width: '100',
        height: '100',
      },
    },
  })
}
