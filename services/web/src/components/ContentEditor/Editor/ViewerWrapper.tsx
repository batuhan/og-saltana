import React, { FunctionComponent } from 'react'
import {
  DraftContent,
  RicosTheme,
  RicosViewer,
  RicosViewerProps,
} from 'ricos-viewer'
import {
  RichContentViewer,
  RichContentViewerProps,
} from 'wix-rich-content-viewer'
import {
  pluginLinkButton,
  pluginActionButton,
} from 'wix-rich-content-plugin-button/viewer'
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block/viewer'
import { pluginDivider } from 'wix-rich-content-plugin-divider/viewer'
import { pluginEmoji } from 'wix-rich-content-plugin-emoji/viewer'
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/viewer'
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer'
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list/viewer'
import { pluginGiphy } from 'wix-rich-content-plugin-giphy/viewer'
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag/viewer'
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown/viewer'
import { pluginHtml } from 'wix-rich-content-plugin-html/viewer'
import { pluginImage } from 'wix-rich-content-plugin-image/viewer'
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/viewer'
import { pluginLink } from 'wix-rich-content-plugin-link/viewer'
import { pluginMap } from 'wix-rich-content-plugin-map/viewer'
import { pluginMentions } from 'wix-rich-content-plugin-mentions/viewer'
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/viewer'
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer'
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/viewer'
import { pluginVerticalEmbed } from 'wix-rich-content-plugin-vertical-embed/viewer'
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/viewer'
import { mockFileUploadFunc } from './fileUploadUtil'

import 'wix-rich-content-editor-common/dist/styles.min.css'
import 'wix-rich-content-common/dist/styles.min.css'
import 'wix-rich-content-viewer/dist/styles.min.css'
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-button/dist/styles.min.css'
import 'wix-rich-content-plugin-divider/dist/styles.min.css'
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css'
import 'wix-rich-content-plugin-html/dist/styles.min.css'
import 'wix-rich-content-plugin-image/dist/styles.min.css'
import 'wix-rich-content-plugin-gallery/dist/styles.min.css'
import 'wix-rich-content-plugin-link/dist/styles.min.css'
import 'wix-rich-content-plugin-link-preview/dist/styles.min.css'
import 'wix-rich-content-plugin-spoiler/dist/styles.min.css'
import 'wix-rich-content-plugin-mentions/dist/styles.min.css'
import 'wix-rich-content-plugin-video/dist/styles.min.css'
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css'
import 'wix-rich-content-plugin-map/dist/styles.min.css'
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css'
import 'wix-rich-content-plugin-giphy/dist/styles.min.css'
import 'wix-rich-content-text-selection-toolbar/dist/styles.min.css'
import 'wix-rich-content-link-preview-popover/dist/styles.min.css'
import 'wix-rich-content-plugin-social-polls/dist/styles.min.css'
import 'wix-rich-content-plugin-collapsible-list/dist/styles.min.css'
import 'wix-rich-content-plugin-table/dist/styles.min.css'
import 'wix-rich-content-plugin-vertical-embed/dist/styles.min.css'

const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: mockFileUploadFunc,
  },
  giphy: {
    giphySdkApiKey:
      process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  hashtag: {
    createHref: (decoratedText) =>
      `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: (e) => e.preventDefault(),
  },
}

const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(configs.hashtag),
  pluginHtml(),
  pluginImage(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginSoundCloud(),
  pluginVideo(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginLinkPreview(),
  pluginCollapsibleList(),
  pluginVerticalEmbed(),
]

interface Props {
  content?: DraftContent
  isMobile?: boolean
  preview?: RicosViewerProps['preview']
  addAnchors?: RicosViewerProps['addAnchors']
  normalize?: RichContentViewerProps['normalize']
  theme?: RicosTheme
}

const ViewerWrapper: FunctionComponent<Props> = ({
  content,
  theme,
  isMobile = false,
  addAnchors,
  normalize,
  preview,
}) => {
  return (
    <RicosViewer
      plugins={plugins}
      theme={theme}
      content={content}
      isMobile={isMobile}
      preview={preview}
      addAnchors={addAnchors}
      mediaSettings={{
        fullscreenProps: { backgroundColor: 'black', foregroundColor: 'white' },
      }}
    >
      <RichContentViewer normalize={normalize} />
    </RicosViewer>
  )
}

export default ViewerWrapper
