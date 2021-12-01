import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuickAssetSelector from './QuickAssetSelector'

export default {
  title: 'Example/QuickAssetSelector',
  component: QuickAssetSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof QuickAssetSelector>

const Template: ComponentStory<typeof QuickAssetSelector> = (args) => (
  <QuickAssetSelector {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'QuickAssetSelector',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'QuickAssetSelector',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'QuickAssetSelector',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'QuickAssetSelector',
}
