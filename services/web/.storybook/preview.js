// .storybook/preview.js

import React from 'react'
import Providers from '../src/lib/client/Providers'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const mockPageProps = {}

export const decorators = [
  (Story) => (
    <Providers pageProps={mockPageProps}>
      <Story />
    </Providers>
  ),
]
