import 'twin.macro'
import DashboardShell from '../../Common/Shell'
import CreatorDashboardLinkSidebar from './Sidebar'
import CreatorDashboardLinkSubHeader from './Header'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import useApiMutation from 'hooks/useApiMutation'
import useCreatorSpace from 'hooks/useCreatorSpace'
import _ from 'lodash'

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
    defaultValues: _.pick(link.data, [
      'destination',
      'linkType',
      'assetId',
      'slug',
      'content',
      // 'username',
    ]),
    resolver: yupResolver(schema),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const updateLink = useApiMutation('links', 'update', link.data.id, {
    onSuccess: ({ id }) => {},
  })

  async function onSubmit({ linkType, assetId, slug, content }) {
    await updateLink.mutateAsync({ linkType, assetId, slug, content })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
