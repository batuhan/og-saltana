import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useMutation } from 'react-query'
import { Text } from '@chakra-ui/react'
import { getSaltanaInstance } from '../api'
export default function ProductEditMode(props) {
  const saveAsset = useMutation(async (data) =>
    (await getSaltanaInstance()).assets.update(props.id, data)
  )
  const queryClient = useQueryClient()

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
      //  cms.alerts.success('Saved!')
    },
  }
  // const [modifiedValues, form] = useForm(formConfig)
  //usePlugin(form)

  return (
    <Text fontWeight="bold" fontSize="xl" pb="5">
      test
    </Text>
  )
}
