import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ContentEditor from './ContentEditor'
import 'twin.macro'
import { useForm, FormProvider } from 'react-hook-form'
import _ from 'lodash'
import { DevTool } from '@hookform/devtools'
import { Layout, LayoutColumn, Text } from '@kiwicom/orbit-components'

function MockFormProvider({ children, content }) {
  const methods = useForm({
    defaultValues: {
      content: content || [],
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  async function onSubmit(data) {
    console.log('on submit', data)
  }

  return (
    <FormProvider {...methods}>
      <Layout type="Booking">
        <LayoutColumn>
          <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
        </LayoutColumn>
        <LayoutColumn>
          <div
            style={{
              background: '#F5F7F9',
              minHeight: '200px',
            }}
          >
            {process.env.NODE_ENV === 'development' && (
              <DevTool control={control} placement="bottom-right" />
            )}
          </div>
        </LayoutColumn>
      </Layout>
    </FormProvider>
  )
}

export default {
  title: 'Editor/ContentEditor',
  component: ContentEditor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ContentEditor>

const Template: ComponentStory<typeof ContentEditor> = (args) => (
  <MockFormProvider content={[]}>
    <ContentEditor {...args} fieldName="content" />
  </MockFormProvider>
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'ContentEditor',
}

export const TextOnly = Template.bind({})
TextOnly.args = {
  label: 'ContentEditor',
}

export const BlocksOnly = Template.bind({})
BlocksOnly.args = {
  size: 'large',
  label: 'ContentEditor',
}

export const KitchenSink = Template.bind({})
KitchenSink.args = {
  size: 'small',
  label: 'ContentEditor',
}
