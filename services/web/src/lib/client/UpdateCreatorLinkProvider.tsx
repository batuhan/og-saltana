import 'twin.macro'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import useApiMutation from 'hooks/useApiMutation'
import useCreatorSpace from 'hooks/useCreatorSpace'
import _ from 'lodash'
import { DevTool } from '@hookform/devtools'
import { useMutation } from 'react-query'
import { getSaltanaInstance } from '@/client/api'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
})

export default function UpdateCreatorLinkProvider({
  children,
  creator,
  asset,
  link,
}) {
  console.log('got link', link)
  const methods = useForm({
    defaultValues: {
      link: _.pick(link.data, [
        'destination',
        'linkType',
        'assetId',
        'slug',
        'content',
        // 'username',
      ]),
      asset: _.pick(asset.data || {}, [
        'name',
        'price',
        'categoryId',
        'assetTypeId',
      ]),
    },
    resolver: yupResolver(schema),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const updateLink = useMutation(async (data) => {
    const saltanaInstance = await getSaltanaInstance()
    const [linkResult, assetResult] = await Promise.all([
      saltanaInstance.links.update(data.link),
      saltanaInstance.assets.update(data.asset),
    ])

    return { link: linkResult, asset: assetResult }
  }, {})

  async function onSubmit(data) {
    await updateLink.mutateAsync(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      <DevTool control={methods.control} />
    </FormProvider>
  )
}
