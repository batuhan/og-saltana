// .storybook/preview.js

import React from 'react'
import { ProvidersWithoutExternal } from '../src/lib/client/Providers'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const mockPageProps = {}

export const decorators = [
  (Story) => (
    <ProvidersWithoutExternal pageProps={mockPageProps}>
      <Story />
    </ProvidersWithoutExternal>
  ),
]
