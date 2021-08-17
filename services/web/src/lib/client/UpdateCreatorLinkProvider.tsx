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
import { useBeforeUnload } from 'react-use'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
})

const validFields = {
  link: [
    'destination',
    'slug',
    'content',
    // 'username',
  ],
  asset: [
    'name',
    'price',
    'categoryId',
    'assetTypeId',
    'metadata.deliverables',
  ],
}
export default function UpdateCreatorLinkProvider({
  children,
  creator,
  asset,
  link,
}) {
  const methods = useForm({
    defaultValues: {
      link: _.pick(link.data, [...validFields.link, 'assetId', 'linkType']),
      asset: _.pick(asset.data || {}, validFields.asset),
    },
    //resolver: yupResolver(schema),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const updateLink = useMutation(async (data) => {
    const saltanaInstance = await getSaltanaInstance()
    const [linkResult, assetResult] = await Promise.all([
      saltanaInstance.links.update(
        link.data.id,
        _.pick(data.link, validFields.link),
      ),
      saltanaInstance.assets.update(
        asset.data.id,
        _.pick(data.asset, validFields.asset),
      ),
    ])

    return { link: linkResult, asset: assetResult }
  }, {})

  async function onSubmit(data) {
    await updateLink.mutateAsync(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      {process.env.NODE_ENV === 'development' && <DevTool control={control} />}
    </FormProvider>
  )
}
