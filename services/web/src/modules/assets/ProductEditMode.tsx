import React from 'react'
import { useCMS, useForm, usePlugin } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'

import { heroBlock } from './ProductBlocks/Hero'
import { paragraphBlock } from './ProductBlocks/Paragraph'
import { imagesBlock } from './ProductBlocks/Images'
import { featureListBlock } from './ProductBlocks/FeatureList'
import { useApiMutation } from '../api'
import { useApiInstance } from '../api/useApi'
import { useMutation } from 'react-query'

const HOME_BLOCKS = {
  hero: heroBlock,
  images: imagesBlock,
  paragraph: paragraphBlock,
  features: featureListBlock,
}

export default function ProductEditMode(props) {
  const { instance } = useApiInstance()
  const saveAsset = useMutation((data) =>
    instance.assets.update(props.id, data)
  )

  const cms = useCMS()

  const formConfig = {
    id: props.id,
    initialValues: {
      name: props.name,
      description: props.description,
      price: props.price,
      active: props.active,
      metadata: props.metadata
    },
    fields: [
      {
        name: 'name',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'description',
        label: 'Description',
        component: 'textarea',
      },
      {
        name: 'price',
        label: 'Price',
        component: 'number',
      },
      {
        name: 'metadata.available_after',
        label: 'Available after',
        component: 'date',
        dateFormat: 'MMMM DD YYYY',
        timeFormat: false,
      },
      {
        name: 'active',
        component: 'toggle',
        label: 'Active',
        description: 'Check to mark this to publish the product.',
      },
    ],
    async onSubmit(data) {
      await saveAsset.mutateAsync(data)
      cms.alerts.success('Saved!')
    },
  }
  const [, form] = useForm(formConfig)
  usePlugin(form)

  return (
    <div className="home">
      <InlineForm form={form}>
        <InlineBlocks name="metadata.blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
    </div>
  )
}
