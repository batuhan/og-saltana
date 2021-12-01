import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ContentViewer from './ContentViewer'

export default {
  title: 'Editor/ContentViewer',
  component: ContentViewer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ContentViewer>

const Template: ComponentStory<typeof ContentViewer> = (args) => (
  <ContentViewer {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'ContentViewer',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'ContentViewer',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'ContentViewer',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'ContentViewer',
}
