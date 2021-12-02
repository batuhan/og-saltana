import React, { useRef, useState } from 'react'
import {
  RichContentEditor,
  RichContentEditorProps,
} from 'wix-rich-content-editor'
import {
  DraftContent,
  RicosEditor,
  RicosEditorProps,
  RicosEditorType,
  RicosTheme,
  ToolbarSettings,
} from 'ricos-editor'
import {
  pluginLinkButton,
  pluginActionButton,
} from 'wix-rich-content-plugin-button'
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block'
import {
  pluginDivider,
  createDividerPlugin,
} from 'wix-rich-content-plugin-divider'

import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud'

import { pluginEmoji } from 'wix-rich-content-plugin-emoji'
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload'
import { pluginGallery } from 'wix-rich-content-plugin-gallery'
import { pluginGiphy } from 'wix-rich-content-plugin-giphy'
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag'
import { pluginHeadings } from 'wix-rich-content-plugin-headings'
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler'
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list'
import { pluginTable } from 'wix-rich-content-plugin-table'
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown'
import { pluginHtml } from 'wix-rich-content-plugin-html'
import { pluginImage } from 'wix-rich-content-plugin-image'
import { pluginIndent } from 'wix-rich-content-plugin-indent'
import {
  pluginLineSpacing,
  createLineSpacingPlugin,
} from 'wix-rich-content-plugin-line-spacing'
import { pluginLink } from 'wix-rich-content-plugin-link'
import { pluginMap, createMapPlugin } from 'wix-rich-content-plugin-map'
import { pluginMentions } from 'wix-rich-content-plugin-mentions'
import { pluginUndoRedo } from 'wix-rich-content-plugin-undo-redo'
import { pluginVideo, videoButtonsTypes } from 'wix-rich-content-plugin-video'
import { pluginPoll } from 'wix-rich-content-plugin-social-polls'
import {
  pluginLinkPreview,
  LinkPreviewProviders,
} from 'wix-rich-content-plugin-link-preview'
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed'
import { mockFetchUrlPreviewData } from './linkPreviewUtil'
import {
  pluginTextColor,
  pluginTextHighlight,
  createTextColorPlugin,
} from 'wix-rich-content-plugin-text-color'
import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import Instagram from '@uppy/instagram'
import Url from '@uppy/url'
import Dropbox from '@uppy/dropbox'
import GoogleDrive from '@uppy/google-drive'
import Facebook from '@uppy/facebook'
import Zoom from '@uppy/zoom'
import DragDrop from '@uppy/drag-drop'
import UppyDashboard from '@uppy/dashboard'

import ImageEditor from '@uppy/image-editor'
import Transloadit from '@uppy/transloadit'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/webcam/dist/style.css'

import { DashboardModal, useUppy } from '@uppy/react'

const defOpts = {
  companionUrl: Transloadit.COMPANION,
  companionAllowedHosts: Transloadit.COMPANION_PATTERN,
}

function getUppy(id, { allowMultipleUploads = true, allowedFileTypes, template_id, steps = {} }, pluginOpts) {

  console.log('getUppy', { id, allowMultipleUploads, allowedFileTypes, template_id, steps, pluginOpts })
  return new Uppy({
    id,
    restrictions: {
      allowedFileTypes
    },
  })
    .use(Transloadit, {
      params: {
        auth: {
          key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY,
        },
        // It’s more secure to use a template_id and enable
        // Signature Authentication
        steps
      },
      waitForEncoding: true,
    })
    .use(Webcam)
    .use(DragDrop)
    .use(Dropbox, defOpts)
    .use(GoogleDrive, defOpts)
    .use(Facebook, defOpts)
    .use(Zoom, defOpts)
    .use(Url, defOpts)
    .use(ImageEditor, {
      quality: 0.8,
    })
    .use(UppyDashboard, {
      id: 'Dashboard',
      target: 'body',
      metaFields: [],
      trigger: null,
      inline: false,
      width: 750,
      height: 550,
      thumbnailWidth: 280,
      showLinkToFileUploadResult: true,
      showProgressDetails: true,
      hideUploadButton: false,
      hideRetryButton: false,
      hidePauseResumeButton: false,
      hideCancelButton: false,
      hideProgressAfterFinish: false,
      doneButtonHandler: () => {
        this.uppy.reset()
        this.requestCloseModal()
      },
      note: null,
      closeModalOnClickOutside: false,
      closeAfterFinish: false,
      disableStatusBar: false,
      disableInformer: false,
      disableThumbnailGenerator: false,
      disablePageScrollWhenModalOpen: true,
      animateOpenClose: true,
      fileManagerSelectionType: 'files',
      proudlyDisplayPoweredByUppy: true,
      onRequestCloseModal: () => this.closeModal(),
      showSelectedFiles: true,
      showRemoveButtonAfterComplete: false,
      browserBackButtonClose: false,
      theme: 'light',
      autoOpenFileEditor: true,
      disableLocalFiles: false,
      allowMultipleUploads
    })
}

function Uploader({ uppy, showUploader }) {

  return (
    <DashboardModal
      uppy={uppy}
      open={showUploader}
      theme="dark"
      proudlyDisplayPoweredByUppy={false}
      plugins={[
        'Webcam',
        'Instagram',
        'DragDrop',
        'Dropbox',
        'Facebook',
        'Zoom',
        'Url',
        'ImageEditor',
        'GoogleDrive',
      ]}
    />
  )
}

// styles start
import 'wix-rich-content-editor-common/dist/styles.min.css'
import 'wix-rich-content-plugin-commons/dist/styles.min.css'
import 'wix-rich-content-common/dist/styles.min.css'
import 'wix-rich-content-editor/dist/styles.min.css'
import 'wix-rich-content-plugin-button/dist/styles.min.css'
// import 'wix-rich-content-plugin-code-block/dist/styles.min.css';
import 'wix-rich-content-plugin-divider/dist/styles.min.css'
import 'wix-rich-content-plugin-emoji/dist/styles.min.css'
import 'wix-rich-content-plugin-html/dist/styles.min.css'
import 'wix-rich-content-plugin-hashtag/dist/styles.min.css'
import 'wix-rich-content-plugin-line-spacing/dist/styles.min.css'
import 'wix-rich-content-plugin-link/dist/styles.min.css'
import 'wix-rich-content-plugin-link-preview/dist/styles.min.css'
import 'wix-rich-content-plugin-mentions/dist/styles.min.css'
import 'wix-rich-content-plugin-image/dist/styles.min.css'
import 'wix-rich-content-plugin-gallery/dist/styles.min.css'
import 'wix-rich-content-plugin-video/dist/styles.min.css'
import 'wix-rich-content-plugin-giphy/dist/styles.min.css'
import 'wix-rich-content-plugin-map/dist/styles.min.css'
import 'wix-rich-content-plugin-social-polls/dist/styles.min.css'
import 'wix-rich-content-plugin-file-upload/dist/styles.min.css'
import 'wix-rich-content-plugin-spoiler/dist/styles.min.css'
import 'wix-rich-content-plugin-text-color/dist/styles.min.css'
import 'wix-rich-content-plugin-headings/dist/styles.min.css'
import 'wix-rich-content-plugin-vertical-embed/dist/styles.min.css'
import 'wix-rich-content-plugin-collapsible-list/dist/styles.min.css'
import 'wix-rich-content-plugin-unsupported-blocks/dist/styles.min.css'
// styles end

// import { mockFileUploadFunc, mockImageNativeUploadFunc } from './fileUploadUtil'
import { MockVerticalSearchModule } from './verticalEmbedUtil'

const { event, booking, product } = verticalEmbedProviders

const handleFileSelection = (plugin, uppyOpts) => {
  return (index: number,
    multiple: boolean,
    updateEntity,
    removeEntity?: undefined,
    componentData?,
    ...args
  ) => {
    const uppy = getUppy(plugin, {
      ...uppyOpts
    }, {
      plugin,
      index,
      multiple,
      updateEntity,
      removeEntity,
      componentData,
      args
    })

    const dashboard = uppy.getPlugin('Dashboard')
    if (dashboard && typeof dashboard.openModal === 'function') {
      dashboard.openModal()
    }

  }
}

const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: handleFileSelection('fileUpload', { allowMultipleUploads: false, allowedFileTypes: null, }),
    // handleFileSelection: (...args) => console.trace(...args),
  },
  giphy: {
    giphySdkApiKey:
      process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
  linkPreview: {
    fetchData: mockFetchUrlPreviewData(),
    exposeEmbedButtons: [LinkPreviewProviders.Instagram, LinkPreviewProviders.Twitter, LinkPreviewProviders.TikTok],
  },
  verticalEmbed: {
    exposeEmbedButtons: [product, event, booking],
    verticalsApi: (type) => new MockVerticalSearchModule(type),
  },
  hashtag: {
    createHref: (decoratedText) =>
      `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: (e) => e.preventDefault(),
  },
  image: {
    innerRCEPlugins: [
      createTextColorPlugin,
      createLineSpacingPlugin,
      createDividerPlugin,
      createMapPlugin,
    ],
  },
}

const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginHeadings(),
  pluginSpoiler(),
  pluginCollapsibleList({
    innerRCEPlugins: [
      pluginTextColor().createPlugin,
      pluginTextHighlight().createPlugin,
      pluginIndent().createPlugin,
      pluginLineSpacing().createPlugin,
      pluginLink().createPlugin,
      pluginCodeBlock().createPlugin,
    ],
  }),
  pluginTable({
    innerRCEPlugins: [
      pluginTextColor().createPlugin,
      pluginTextHighlight().createPlugin,
      pluginIndent().createPlugin,
      pluginLineSpacing().createPlugin,
      pluginLink().createPlugin,
      pluginImage().createPlugin,
      pluginVideo().createPlugin,
      pluginGiphy().createPlugin,
      pluginEmoji().createPlugin,
      pluginFileUpload().createPlugin,
      pluginCodeBlock().createPlugin,
    ],
  }),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(configs.hashtag),
  pluginHtml(),
  pluginImage(configs.image),
  pluginIndent(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginVideo({
    getVideoUrl: (src) => `https://video.wixstatic.com/${src.pathname}`,
    exposeButtons: [videoButtonsTypes.video, videoButtonsTypes.soundCloud],
  }),
  pluginSoundCloud(),
  pluginLinkPreview(configs.linkPreview),
  pluginPoll(),
  pluginUndoRedo(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginVerticalEmbed(configs.verticalEmbed),
]

const pluginsMap = {
  button: pluginLinkButton(),
  codeBlock: pluginCodeBlock(),
  divider: pluginDivider(),
  emoji: pluginEmoji(),
  fileUpload: pluginFileUpload(configs.fileUpload),
  gallery: pluginGallery(),
  gif: pluginGiphy(configs.giphy),
  hashtag: pluginHashtag(),
  html: pluginHtml(),
  image: pluginImage(),
  indent: pluginIndent(),
  headers: pluginHeadersMarkdown(),
  lineSpacing: pluginLineSpacing(),
  link: pluginLink(),
  map: pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  mentions: pluginMentions(),
  video: pluginVideo(),
  socialEmbed: pluginLinkPreview(configs.linkPreview),
  polls: pluginPoll(),
  undoRedo: pluginUndoRedo(),
  textColor: pluginTextColor(),
  spoiler: pluginSpoiler(),
  collapsibleList: pluginCollapsibleList(),
  table: pluginTable(),
  highlight: pluginTextHighlight(),
  soundCloud: pluginSoundCloud(),
  verticalEmbed: pluginVerticalEmbed(configs.verticalEmbed),
}

const addPluginMenuConfig = {
  showSearch: true,
  splitToSections: true,
}
const footerToolbarConfig = {
  morePluginsMenu: {
    splitToSections: true,
    showSearch: true,
  },
}
const getToolbarSettings = () => [
  { name: 'SIDE', addPluginMenuConfig },
  { name: 'MOBILE', addPluginMenuConfig },
  { name: 'FOOTER', footerToolbarConfig },
]

interface Props {
  content?: DraftContent
  injectedContent?: DraftContent
  onChange?: RicosEditorProps['onChange']
  isMobile?: boolean
  pluginsToDisplay?: string[]
  toolbarSettings?: ToolbarSettings
  onBlur?: RichContentEditorProps['onBlur']
  onFocus?: RichContentEditorProps['onFocus']
  theme?: RicosTheme
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rcProps?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experiments?: Record<string, any>
}


const _isMobile = false


function EditorWrapper({
  isMobile: _isMobile,
  toolbarSettings = { getToolbarSettings },
  content,
  injectedContent,
  theme,
  onChange,
  isMobile,
  onBlur,
  onFocus,
  rcProps = {},
  experiments,
  ...props
}) {
  const editorRef = useRef()

  const [showUploader, setShowUploader] = useState(false)
  const [activeUppyInstance, setActiveUppyInstance] = useState<Uppy.Uppy>(null)
  const getToolbarProps = (type) => {
    editorRef.current?.getToolbarProps(type)
  }
  const editorPlugins = props.pluginsToDisplay
    ? props.pluginsToDisplay.map((plugin) => pluginsMap[plugin])
    : plugins


  return (
    <>
      <RicosEditor
        ref={editorRef}
        plugins={editorPlugins}
        theme={theme}
        content={content}
        injectedContent={injectedContent}
        isMobile={isMobile}
        placeholder={'Share something...'}
        // toolbarSettings={toolbarSettings}
        onChange={onChange}
        experiments={experiments}
        _rcProps={rcProps}
        onAtomicBlockFocus={(d) => console.log('onAtomicBlockFocus', d)} // eslint-disable-line
      >
        <RichContentEditor
          onFocus={onFocus}
          onBlur={onBlur}
          helpers={{ handleFileSelection }}
        />
      </RicosEditor>
      {/* <Uploader /> */}
    </>
  )
}

export default EditorWrapper
