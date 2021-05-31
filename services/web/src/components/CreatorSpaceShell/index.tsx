import {
  Box,
  Grid,
} from '@chakra-ui/react'
import { TinaProvider, TinaCMS } from 'tinacms'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useCurrentUser } from '../../modules/api'
import CreatorInfoBox from './CreatorInfoBox'
import AssetInfoBox from './AssetInfoBox'

const CreatorSpaceShell = ({ children, creatorId, assetId }) => {
  const { query: { mode } } = useRouter()
  const { is, session } = useCurrentUser()
  const [editModeEnabled, setEditModeEnabled] = React.useState(false)

  React.useEffect(() => {
    setEditModeEnabled(is(creatorId) && mode === 'edit')
  }, [session, mode])

  const cms = React.useMemo(
    () => new TinaCMS({ enabled: editModeEnabled, sidebar: true, toolbar: true }),
    [editModeEnabled]
  )

  return (
    <TinaProvider cms={cms}>
      <Grid templateColumns="70% 30%">
        <Box border={0}>{children}</Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          border={0}
        >
          <CreatorInfoBox creatorId={creatorId} assetId={assetId} />
          {assetId && <AssetInfoBox assetId={assetId} />}
        </Box>
      </Grid>
    </TinaProvider>
  )
}

export default CreatorSpaceShell
