import { autocomplete, AutocompleteComponents } from '@algolia/autocomplete-js'

import '@algolia/autocomplete-theme-classic'
import { ListChoice } from '@kiwicom/orbit-components'

import React, { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'

export default function Autocomplete(props) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: containerRef.current,
      placeholder: 'Search',
      autoFocus: true,
      openOnFocus: true,
      plugins: [],
      renderer: { createElement, Fragment },
      getSources({ query, state }) {
        console.log('getSources', query, state)
        return [social, url, email]
      },
      render({ children }, root) {
        render(children, root)
      },
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div ref={containerRef} />
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
