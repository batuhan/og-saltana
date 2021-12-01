import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LinkBlocksEditor from './LinkBlocksEditor'

export default {
  title: 'Dashboard/Creator/LinkBlocksEditor',
  component: LinkBlocksEditor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LinkBlocksEditor>

const Template: ComponentStory<typeof LinkBlocksEditor> = (args) => (
  <LinkBlocksEditor {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'LinkBlocksEditor',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'LinkBlocksEditor',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'LinkBlocksEditor',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'LinkBlocksEditor',
}
