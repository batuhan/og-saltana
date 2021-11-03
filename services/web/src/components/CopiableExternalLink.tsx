import { useState } from 'react'
import { useCopyToClipboard } from 'react-use'

export default function CopiableExternalLink({ href }) {
  const [state, copyToClipboard] = useCopyToClipboard()

  return (
    <div>
      <input value={href} disabled />
      <button type="button" onClick={() => copyToClipboard(href)}>
        copy text
      </button>
      <button type="button" onClick={() => window.open(href)}>
        open in new tab
      </button>
      {state.error ? (
        <p>Unable to copy value: {state.error.message}</p>
      ) : (
        state.value && <p>Copied {state.value}</p>
      )}
    </div>
  )
}
