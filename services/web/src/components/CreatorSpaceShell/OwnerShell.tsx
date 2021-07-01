import React from 'react'
import Shell from './Shell'
import { useMutation, useQueryClient } from 'react-query'
import { getSaltanaInstance } from '../../modules/api'
const ShellEditWrapper = ({
  creatorId,
  displayName,
  editModeEnabled,
  description,
}) => {
  //const cms = useCMS()
  const saveCreator = useMutation(async (data) =>
    (await getSaltanaInstance()).users.update(creatorId, data)
  )
  const queryClient = useQueryClient()

  const formConfig = {
    id: creatorId,
    label: 'Creator Profile',
    initialValues: {
      displayName: displayName,
      description: description,
      metadata: { instant: { profileLinks: [] } },
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
      //  cms.alerts.success('Saved!')
    },
  }
  //const [modifiedValues, form] = useForm(formConfig)
  //usePlugin(form)
  return <Shell {...{}} editModeEnabled={editModeEnabled} />
}
const OwnerShell = (props) => {
  return <ShellEditWrapper {...props} />
}

export default OwnerShell
