import { TinaProvider, TinaCMS, useCMS, useForm, usePlugin } from 'tinacms'
import React from 'react'
import Shell from './Shell'
import { useApiInstance } from '../../modules/api/useApi'
import { useMutation, useQueryClient } from 'react-query'
import { InlineForm } from 'react-tinacms-inline'

const ShellEditWrapper = ({ creatorId, displayName, editModeEnabled, description }) => {
  const cms = useCMS()
  const { instance } = useApiInstance()
  const saveCreator = useMutation((data) =>
    instance.users.update(creatorId, data)
  )
  const queryClient = useQueryClient()

  const formConfig = {
    id: creatorId,
    label: 'Creator Profile',
    initialValues: {
      displayName: displayName,
      description: description,
    },
    fields: [
      {
        name: 'displayName',
        component: 'text',
        label: 'Name',
        description: 'Name.',
      },
      {
        name: 'description',
        component: 'text',
        label: 'Bio',
        description: 'descp.',
      },
    ],
    async onSubmit(data) {
      await saveCreator.mutateAsync(data)
      await queryClient.invalidateQueries(['users', 'read', creatorId])
      cms.alerts.success('Saved!')
    },
  }
  const [modifiedValues, form] = useForm(formConfig)
  usePlugin(form)
  return (
    <InlineForm form={form}>
      <Shell {...modifiedValues} editModeEnabled={editModeEnabled} />
    </InlineForm>
  )
}
const OwnerShell = (props) => {
  const cms = React.useMemo(
    () =>
      new TinaCMS({
        enabled: props.editModeEnabled,
        sidebar: true,
        toolbar: true,
      }),
    [props.editModeEnabled]
  )

  return (
    <TinaProvider cms={cms}>
      <ShellEditWrapper {...props} />
    </TinaProvider>
  )
}

export default OwnerShell
