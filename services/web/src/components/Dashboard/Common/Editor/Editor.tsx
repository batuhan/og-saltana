import { RicosEditor } from 'ricos-editor'
import 'ricos-editor/dist/styles.min.css'
import 'wix-rich-content-plugin-commons/dist/styles.min.css'

import { pluginVideo } from 'wix-rich-content-plugin-video'
import 'wix-rich-content-plugin-video/dist/styles.min.css'

import { pluginDivider } from 'wix-rich-content-plugin-divider'
import 'wix-rich-content-plugin-divider/dist/styles.min.css'

export default function Editor({ placeholder = 'Type here!' }) {
  return (
    <RicosEditor
      placeholder={placeholder}
      plugins={[pluginDivider(), pluginVideo()]}
    />
  )
}
