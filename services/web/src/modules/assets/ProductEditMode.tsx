import React from 'react'
import { useCMS, useForm, usePlugin } from 'tinacms'
import { InlineForm, InlineBlocks, InlineText } from 'react-tinacms-inline'
import { useQuery, useQueryClient } from 'react-query'
import { useApiInstance } from '../api/useApi'
import { useMutation } from 'react-query'
import { HOME_BLOCKS } from './ProductBlocks'
import { Text } from '@chakra-ui/react'

export default function ProductEditMode(props) {
  const { instance } = useApiInstance()
  const saveAsset = useMutation((data) =>
    instance.assets.update(props.id, data)
  )
  const queryClient = useQueryClient()

  const cms = useCMS()

  const formConfig = {
    id: props.id,
    label: 'Product',
    initialValues: {
      name: props.name,
      description: props.description,
      price: props.price,
      active: props.active,
      metadata: props.metadata,
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
      await queryClient.invalidateQueries(['assets', 'read', data.id])
      cms.alerts.success('Saved!')
    },
  }
  const [modifiedValues, form] = useForm(formConfig)
  usePlugin(form)

  return (
    <InlineForm form={form}>
      <Text fontWeight="bold" fontSize="xl" pb="5">
        <InlineText name="name" />
      </Text>

      <InlineBlocks name="metadata.blocks" blocks={HOME_BLOCKS} />
    </InlineForm>
  )
}
