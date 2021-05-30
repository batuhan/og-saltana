import * as React from 'react'
import { useForm, usePlugin } from 'tinacms'
import ProductPage from './ProductPage'

export default function Page(props) {
  const formConfig = {
    id: props.id,
    label: 'Edit product',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'description',
        label: 'Description',
        component: 'textarea',
      },
    ],
    initialValues: {
      title: props.name,
      description: props.description,
    },
    onSubmit: async (formData) => {
      // save the new form data
    },
  }
  const [modifiedValues, form] = useForm(formConfig)

  usePlugin(form)

  return <ProductPage {...props} {...modifiedValues} />
}
