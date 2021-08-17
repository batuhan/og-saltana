import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LinkInput from './LinkInput'

export default {
  title: 'LinkInput',
  component: LinkInput,
} as ComponentMeta<typeof LinkInput>

const Template: ComponentStory<typeof LinkInput> = (args) => (
  <LinkInput {...args} />
)

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  //...HeaderStories.LoggedIn.args,
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {
  //...HeaderStories.LoggedOut.args,
}
