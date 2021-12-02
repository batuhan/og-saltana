import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import useApiMutation from 'hooks/useApiMutation'
import useCreatorSpace from 'hooks/useCreatorSpace'
import _ from 'lodash'
import { useMutation, useQueryClient } from 'react-query'
import { getSaltanaInstance } from '@/common/api'
import HookFormDevTools from '@/client/devtools'

const validFields = [
  'destination',
  'slug',
  'content',
  'linkType',
  'assetIds',
  // 'username',
]

export default function UpdateCreatorLinkProvider({
  children,
  creator,
  link,
  ...props
}) {
  const queryClient = useQueryClient()

  const defaultValues = { content: '', ..._.pick(link.data, [...validFields]) }

  const methods = useForm({
    defaultValues,
    //resolver: yupResolver(schema),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const updateLink = useMutation(
    async (data) => {
      const saltanaInstance = await getSaltanaInstance()
      const linkResult = await saltanaInstance.links.update(link.data.id, {
        ...defaultValues,
        ..._.pick(data, validFields),
      })

      return { ...linkResult }
    },
    {
      onSuccess: (data, variables) => {
        // queryClient.invalidateQueries('links')
        queryClient.setQueryData(['links', 'read', link.data.id], data)
        queryClient.invalidateQueries('links')
      },
    },
  )

  async function onSubmit(data) {
    await updateLink.mutateAsync(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {children}
        <HookFormDevTools control={control} />
      </form>
    </FormProvider>
  )
}
