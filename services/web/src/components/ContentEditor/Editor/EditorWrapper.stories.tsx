import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import largePostFixture from './fixtures/large-post.json'

import EditorWrapper from './EditorWrapper'

export default {
  title: 'Editor/EditorWrapper',
  component: EditorWrapper,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditorWrapper>

const Template: ComponentStory<typeof EditorWrapper> = (args) => (
  <EditorWrapper {...args} />
)

export const VeryLargePost = Template.bind({})
VeryLargePost.args = {
  primary: true,
  content: largePostFixture,
  label: 'EditorWrapper',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'EditorWrapper',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'EditorWrapper',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'EditorWrapper',
}
