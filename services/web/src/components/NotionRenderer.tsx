import 'twin.macro'

import { NotionRenderer as OriginalNotionRenderer } from 'react-notion-x'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

export default function NotionRenderer({
  pageTitle,
  contentRecordMap,
  ...passProps
}) {
  return (
    <OriginalNotionRenderer
      recordMap={contentRecordMap}
      fullPage
      darkMode={false}
      {...passProps}
    />
  )
}
