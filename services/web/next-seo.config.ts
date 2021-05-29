const title = 'Saltana'
const description = 'Checkout to delivery'

const SEO = {
  title: undefined,
  defaultTitle: 'Saltana',
  titleTemplate: '%s - Saltana',
  description,
  canonical: 'https://www.saltana.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.saltana.com',
    title,
    description,
    images: [
      {
        url: 'https://react2025.com/og.png',
        alt: title,
        width: 1200,
        height: 700,
      },
    ],
  },
  twitter: {
    handle: '@withSaltana',
    site: '@withSaltana',
    cardType: 'summary_large_image',
  },
}

export default SEO
