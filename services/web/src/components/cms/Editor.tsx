import dynamic from 'next/dynamic'
import { TOOLBARS } from 'wix-rich-content-editor-common';

const EditorComponent = dynamic(
  () => import('@saltana/editor/shared/editor/Editor'),
  { ssr: false }
)


export default function Editor(props) {
  return (<EditorComponent
    isMobile={false}
    shouldNativeUpload={false}
    staticToolbar={true}
    externalToolbarToShow={TOOLBARS.INLINE}
    locale="tr"
  />)

}
