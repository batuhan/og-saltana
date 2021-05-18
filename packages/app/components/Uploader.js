import React from 'react'
import Uppy from '@uppy/core'

import { Dashboard } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

export default function Uploader(props) {
  const uppy = React.useMemo(() => Uppy(), [])
  React.useEffect(() => () => uppy.close(), [])

  return <Dashboard uppy={uppy} plugins={['Webcam']} {...props} />
}
