import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { useMutation } from 'react-query'
import { getSaltanaInstance } from '@/common/api'

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
  ...props
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
      _.pick(data, validFields),
    )

    return { asset: assetResult }
  }, {})

  async function onSubmit(data) {
    await updateAsset.mutateAsync(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}
