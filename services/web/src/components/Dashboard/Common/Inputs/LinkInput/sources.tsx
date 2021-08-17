import { AutocompleteComponents } from '@algolia/autocomplete-js'

import { ListChoice } from '@kiwicom/orbit-components'

export const social = {
  sourceId: 'social',
  getItems({ query }) {
    if (query.startsWith('htt')) {
      return []
    }
    return [
      { label: 'Twitter', url: `https://twitter.com/${query}` },
      { label: 'Instagram', url: `https://instagram.com/${query}` },
      { label: 'Facebook', url: `https://www.facebook.com/${query}` },
      { label: 'TikTok', url: `https://tiktok.com/${query}` },
      { label: 'YouTube', url: `https://youtube.com/c/${query}` },
      { label: 'GitHub', url: `https://github.com/${query}` },
    ]
  },
  getItemUrl({ item }) {
    return item.url
  },
  templates: {
    header() {
      return (
        <>
          <span className="aa-SourceHeaderTitle">Products</span>
          <div className="aa-SourceHeaderLine" />
        </>
      )
    },
    item({ item, components }) {
      return <ProductItem hit={item} components={components} />
    },
    noResults() {
      return 'No products for this query.'
    },
  },
}

export const url = {
  sourceId: 'url',
  getItems({ query }) {
    if (query.startsWith('htt')) {
      return []
    }

    const results = [
      { label: 'Suggestion', url: `https://${query}` },
      { label: 'Suggestion2', url: `https://www.${query}.com` },
      { label: 'Suggestion3', url: `https://${query}` },
      { label: 'Suggestion4', url: `https://${query}` },
    ]
    return results
  },
  getItemUrl({ item }) {
    return item.url
  },
  templates: {
    header() {
      return (
        <>
          <span className="aa-SourceHeaderTitle">Products</span>
          <div className="aa-SourceHeaderLine" />
        </>
      )
    },
    item({ item, components }) {
      return <UrlItem hit={item} components={components} />
    },
  },
}

export const email = {
  sourceId: 'email',
  getItems({ query }) {
    if (!query.includes('@')) {
      return []
    }

    const [first, last] = query.split('@')

    const results = [
      { label: 'Gmail', url: `${first}@gmail.com` },
      { label: 'Yahoo', url: `${first}@yahoo.com` },
    ]
    if (!last) {
      return results
    }

    return results.filter(({ label }) =>
      label.toLowerCase().includes(query.split('@')[1].toLowerCase())
    )
  },
  getItemUrl({ item }) {
    return item.url
  },
  templates: {
    header() {
      return (
        <>
          <span className="aa-SourceHeaderTitle">Products</span>
          <div className="aa-SourceHeaderLine" />
        </>
      )
    },
    item({ item, components }) {
      return <UrlItem hit={item} components={components} />
    },
  },
}

type ProductItemProps = {
  hit: ProductHit
  insights: AutocompleteInsightsApi
  components: AutocompleteComponents
}

function UrlItem({ hit: { url }, components }: ProductItemProps) {
  return (
    <ListChoice
      description="Further description"
      icon={<span>sdfs</span>}
      onClick={function () {}}
      selectable
      title={url}
    />
  )
}

function ProductItem({ hit: { label, url }, components }: ProductItemProps) {
  return (
    <ListChoice
      description={url}
      icon={<span>sdfs</span>}
      onClick={function () {}}
      selectable
      title={label}
    />
  )
}
