import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LinkListEditor from './LinkListEditor'

export default {
  title: 'Dashboard/LinkListEditor',
  component: LinkListEditor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LinkListEditor>

const Template: ComponentStory<typeof LinkListEditor> = (args) => (
  <LinkListEditor {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'LinkListEditor',
}

export const Empty = Template.bind({})
Empty.args = {
  label: 'LinkListEditor',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'LinkListEditor',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'LinkListEditor',
}
