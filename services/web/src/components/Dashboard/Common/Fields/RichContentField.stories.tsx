import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import RichContentField from './RichContentField'
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
  title: 'Dashboard/Common/RichContentField',
  component: RichContentField,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RichContentField>

const Template: ComponentStory<typeof RichContentField> = (args) => (
  <MockFormProvider content={[]}>
    <RichContentField {...args} fieldName="content" />
  </MockFormProvider>
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'RichContentField',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'RichContentField',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'RichContentField',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'RichContentField',
}
