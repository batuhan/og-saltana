import * as React from 'react'
import tw from 'twin.macro'
import NextImage from 'next/image'
import Abstract from './Abstract'
import Airtable from './Airtable'
import Cawemo from './Cawemo'
import ClickUp from './ClickUp'
import Codepen from './Codepen'
import Descript from './Descript'
import Figma from './Figma'
import Framer from './Framer'
import Gist from './Gist'
import GoogleDocs from './GoogleDocs'
import GoogleDrawings from './GoogleDrawings'
import GoogleDrive from './GoogleDrive'
import GoogleSheets from './GoogleSheets'
import GoogleSlides from './GoogleSlides'
import InVision from './InVision'
import Loom from './Loom'
import Lucidchart from './Lucidchart'
import Marvel from './Marvel'
import Mindmeister from './Mindmeister'
import Miro from './Miro'
import ModeAnalytics from './ModeAnalytics'
import Prezi from './Prezi'
import Spotify from './Spotify'
import Trello from './Trello'
import Typeform from './Typeform'
import Vimeo from './Vimeo'
import YouTube from './YouTube'

function matcher(Component) {
  return (url: string) => {
    const regexes = Component.ENABLED
    for (const regex of regexes) {
      const result = url.match(regex)
      if (result) {
        return result
      }
    }
  }
}

import abstractIcon from '../../../../../../public/assets/embed-provider-logos/abstract.png'
import airtableIcon from '../../../../../../public/assets/embed-provider-logos/airtable.png'
import cawemoIcon from '../../../../../../public/assets/embed-provider-logos/cawemo.png'
import clickupIcon from '../../../../../../public/assets/embed-provider-logos/clickup.png'
import codepenIcon from '../../../../../../public/assets/embed-provider-logos/codepen.png'
import descriptIcon from '../../../../../../public/assets/embed-provider-logos/descript.png'
import figmaIcon from '../../../../../../public/assets/embed-provider-logos/figma.png'
import framerIcon from '../../../../../../public/assets/embed-provider-logos/framer.png'
import github_gistIcon from '../../../../../../public/assets/embed-provider-logos/github-gist.png'
import google_drawingsIcon from '../../../../../../public/assets/embed-provider-logos/google-drawings.png'
import google_driveIcon from '../../../../../../public/assets/embed-provider-logos/google-drive.png'
import google_docsIcon from '../../../../../../public/assets/embed-provider-logos/google-docs.png'
import google_sheetsIcon from '../../../../../../public/assets/embed-provider-logos/google-sheets.png'
import google_slidesIcon from '../../../../../../public/assets/embed-provider-logos/google-slides.png'
import invisionIcon from '../../../../../../public/assets/embed-provider-logos/invision.png'
import loomIcon from '../../../../../../public/assets/embed-provider-logos/loom.png'
import lucidchartIcon from '../../../../../../public/assets/embed-provider-logos/lucidchart.png'
import marvelIcon from '../../../../../../public/assets/embed-provider-logos/marvel.png'
import mindmeisterIcon from '../../../../../../public/assets/embed-provider-logos/mindmeister.png'
import miroIcon from '../../../../../../public/assets/embed-provider-logos/miro.png'
import mode_analyticsIcon from '../../../../../../public/assets/embed-provider-logos/mode-analytics.png'
import preziIcon from '../../../../../../public/assets/embed-provider-logos/prezi.png'
import spotifyIcon from '../../../../../../public/assets/embed-provider-logos/spotify.png'
import trelloIcon from '../../../../../../public/assets/embed-provider-logos/trello.png'
import typeformIcon from '../../../../../../public/assets/embed-provider-logos/typeform.png'
import vimeoIcon from '../../../../../../public/assets/embed-provider-logos/vimeo.png'
import youtubeIcon from '../../../../../../public/assets/embed-provider-logos/youtube.png'
export default [
  {
    title: 'Abstract',
    keywords: 'design',
    icon: () => <NextImage width={18} height={18} src={abstractIcon} />,
    component: Abstract,
    matcher: matcher(Abstract),
  },
  {
    title: 'Airtable',
    keywords: 'spreadsheet',
    icon: () => <NextImage width={18} height={18} src={airtableIcon} />,
    component: Airtable,
    matcher: matcher(Airtable),
  },
  {
    title: 'Cawemo',
    keywords: 'bpmn process',
    defaultHidden: true,
    icon: () => <NextImage width={18} height={18} src={cawemoIcon} />,
    component: Cawemo,
    matcher: matcher(Cawemo),
  },
  {
    title: 'ClickUp',
    keywords: 'project',
    defaultHidden: true,
    icon: () => <NextImage width={18} height={18} src={clickupIcon} />,
    component: ClickUp,
    matcher: matcher(ClickUp),
  },
  {
    title: 'Codepen',
    keywords: 'code editor',
    icon: () => <NextImage width={18} height={18} src={codepenIcon} />,
    component: Codepen,
    matcher: matcher(Codepen),
  },
  {
    title: 'Descript',
    keywords: 'audio',
    icon: () => <NextImage width={18} height={18} src={descriptIcon} />,
    component: Descript,
    matcher: matcher(Descript),
  },
  {
    title: 'Figma',
    keywords: 'design svg vector',
    icon: () => <NextImage width={18} height={18} src={figmaIcon} />,
    component: Figma,
    matcher: matcher(Figma),
  },
  {
    title: 'Framer',
    keywords: 'design prototyping',
    icon: () => <NextImage width={18} height={18} src={framerIcon} />,
    component: Framer,
    matcher: matcher(Framer),
  },
  {
    title: 'GitHub Gist',
    keywords: 'code',
    icon: () => <NextImage width={18} height={18} src={github_gistIcon} />,
    component: Gist,
    matcher: matcher(Gist),
  },
  {
    title: 'Google Drawings',
    keywords: 'drawings',
    icon: () => <NextImage width={18} height={18} src={google_drawingsIcon} />,
    component: GoogleDrawings,
    matcher: matcher(GoogleDrawings),
  },
  {
    title: 'Google Drive',
    keywords: 'drive',
    icon: () => <NextImage width={18} height={18} src={google_driveIcon} />,
    component: GoogleDrive,
    matcher: matcher(GoogleDrive),
  },
  {
    title: 'Google Docs',
    icon: () => <NextImage width={18} height={18} src={google_docsIcon} />,
    component: GoogleDocs,
    matcher: matcher(GoogleDocs),
  },
  {
    title: 'Google Sheets',
    keywords: 'excel spreadsheet',
    icon: () => <NextImage width={18} height={18} src={google_sheetsIcon} />,
    component: GoogleSheets,
    matcher: matcher(GoogleSheets),
  },
  {
    title: 'Google Slides',
    keywords: 'presentation slideshow',
    icon: () => <NextImage width={18} height={18} src={google_slidesIcon} />,
    component: GoogleSlides,
    matcher: matcher(GoogleSlides),
  },
  {
    title: 'InVision',
    keywords: 'design prototype',
    defaultHidden: true,
    icon: () => <NextImage width={18} height={18} src={invisionIcon} />,
    component: InVision,
    matcher: matcher(InVision),
  },
  {
    title: 'Loom',
    keywords: 'video screencast',
    icon: () => <NextImage width={18} height={18} src={loomIcon} />,
    component: Loom,
    matcher: matcher(Loom),
  },
  {
    title: 'Lucidchart',
    keywords: 'chart',
    icon: () => <NextImage width={18} height={18} src={lucidchartIcon} />,
    component: Lucidchart,
    matcher: matcher(Lucidchart),
  },
  {
    title: 'Marvel',
    keywords: 'design prototype',
    icon: () => <NextImage width={18} height={18} src={marvelIcon} />,
    component: Marvel,
    matcher: matcher(Marvel),
  },
  {
    title: 'Mindmeister',
    keywords: 'mindmap',
    icon: () => <NextImage width={18} height={18} src={mindmeisterIcon} />,
    component: Mindmeister,
    matcher: matcher(Mindmeister),
  },
  {
    title: 'Miro',
    keywords: 'whiteboard',
    icon: () => <NextImage width={18} height={18} src={miroIcon} />,
    component: Miro,
    matcher: matcher(Miro),
  },
  {
    title: 'Mode',
    keywords: 'analytics',
    defaultHidden: true,
    icon: () => <NextImage width={18} height={18} src={mode_analyticsIcon} />,
    component: ModeAnalytics,
    matcher: matcher(ModeAnalytics),
  },
  {
    title: 'Prezi',
    keywords: 'presentation',
    icon: () => <NextImage width={18} height={18} src={preziIcon} />,
    component: Prezi,
    matcher: matcher(Prezi),
  },
  {
    title: 'Spotify',
    keywords: 'music',
    icon: () => <NextImage width={18} height={18} src={spotifyIcon} />,
    component: Spotify,
    matcher: matcher(Spotify),
  },
  {
    title: 'Trello',
    keywords: 'kanban',
    icon: () => <NextImage width={18} height={18} src={trelloIcon} />,
    component: Trello,
    matcher: matcher(Trello),
  },
  {
    title: 'Typeform',
    keywords: 'form survey',
    icon: () => <NextImage width={18} height={18} src={typeformIcon} />,
    component: Typeform,
    matcher: matcher(Typeform),
  },
  {
    title: 'Vimeo',
    keywords: 'video',
    icon: () => <NextImage width={18} height={18} src={vimeoIcon} />,
    component: Vimeo,
    matcher: matcher(Vimeo),
  },
  {
    title: 'YouTube',
    keywords: 'google video',
    icon: () => <NextImage width={18} height={18} src={youtubeIcon} />,
    component: YouTube,
    matcher: matcher(YouTube),
  },
]
