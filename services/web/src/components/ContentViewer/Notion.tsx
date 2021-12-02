// https://www.notion.so/saltana/Terms-of-Service-586d665b14914a1e88f3f076fbd4626d
import { NotionRenderer } from 'react-notion-x'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
// import 'katex/dist/katex.min.css'

export default function NotionBox({ recordMap }) {
  return <NotionRenderer recordMap={recordMap} fullPage darkMode={false} />
}
