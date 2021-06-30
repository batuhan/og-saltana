import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import Instagram from '@uppy/instagram'
import Url from '@uppy/url'
import Dropbox from '@uppy/dropbox'
import GoogleDrive from '@uppy/google-drive'
import Facebook from '@uppy/facebook'
import Zoom from '@uppy/zoom'
import Instagram from '@uppy/image-editor'
import Instagram from '@uppy/image-editor'
import Transloadit from '@uppy/transloadit'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { Dashboard } from '@uppy/react'
import React from 'react'

export default function Uploader(props) {
  const uppy = React.useMemo(
    () =>
      Uppy()
        .use(Transloadit, {
          params: {
            auth: {
              key: YOUR_TRANSLOADIT_API_KEY,
            },
            // It’s more secure to use a template_id and enable
            // Signature Authentication
            steps: {
              resize: {
                robot: '/image/resize',
                width: 250,
                height: 250,
                resize_strategy: 'fit',
                text: [
                  {
                    text: '© Transloadit.com',
                    size: 12,
                    font: 'Ubuntu',
                    color: '#eeeeee',
                    valign: 'bottom',
                    align: 'right',
                    x_offset: 16,
                    y_offset: -10,
                  },
                ],
              },
            },
          },
          waitForEncoding: true,
        })
        .use(Instagram, {
          target: Dashboard,

          companionUrl: Transloadit.COMPANION,
          companionAllowedHosts: Transloadit.COMPANION_PATTERN,
        })
        .use(Instagram, {
          target: Dashboard,

          companionUrl: Transloadit.COMPANION,
          companionAllowedHosts: Transloadit.COMPANION_PATTERN,
        })
        .use(Instagram, {
          target: Dashboard,

          companionUrl: Transloadit.COMPANION,
          companionAllowedHosts: Transloadit.COMPANION_PATTERN,
        })
        .use(Dashboard, {
          inline: true,
          maxHeight: 400,
          target: '#uppy-dashboard-container',
          note: 'Images and video only, 1–2 files, up to 1 MB',
        })
        .use(Webcam, { target: Dashboard })
        .on('transloadit:result', (stepName, result) => {
          const file = uppy.getFile(result.localId)
          var resultContainer = document.createElement('div')
          resultContainer.innerHTML = `
      <div>
        <h3>Name: ${file.name}</h3>
        <img src="${result.ssl_url}" /> <br />
        <a href="${result.ssl_url}">View</a>
      </div>
    `
          document
            .getElementById('uppy-transloadit-result')
            .appendChild(resultContainer)
        }),
    []
  )
  React.useEffect(() => () => uppy.close(), [uppy])

  return <Dashboard uppy={uppy} plugins={['Webcam']} {...props} />
}
