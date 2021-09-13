import 'twin.macro'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
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

const validFields = [
  'name',
  'price',
  'categoryId',
  'assetTypeId',
  'metadata.deliverables',
]

export default function UpdateCreatorAssetProvider({
  children,
  creator,
  asset,
}) {
  const methods = useForm({
    defaultValues: _.pick(asset.data || {}, validFields),
    //resolver: yupResolver(schema),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const updateAsset = useMutation(async (data) => {
    const saltanaInstance = await getSaltanaInstance()
    const assetResult = await saltanaInstance.assets.update(
      asset.data.id,
      _.pick(data.asset, validFields.asset),
    )

    return { asset: assetResult }
  }, {})

  async function onSubmit(data) {
    await updateAsset.mutateAsync(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      {process.env.NODE_ENV === 'development' && <DevTool control={control} />}
    </FormProvider>
  )
}
