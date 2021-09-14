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

const validFields = [
  'destination',
  'slug',
  'content',
  // 'username',
]

export default function UpdateCreatorLinkProvider({
  children,
  creator,
  asset,
  link,
  ...props
}) {
  const methods = useForm({
    defaultValues: _.pick(link.data, [...validFields, 'assetId', 'linkType']),
    //resolver: yupResolver(schema),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const updateLink = useMutation(async (data) => {
    const saltanaInstance = await getSaltanaInstance()
    const linkResult = await saltanaInstance.links.update(
      link.data.id,
      _.pick(data, validFields),
    )

    return { link: linkResult }
  }, {})

  async function onSubmit(data) {
    await updateLink.mutateAsync(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
      {process.env.NODE_ENV === 'development' && <DevTool control={control} />}
    </FormProvider>
  )
}
