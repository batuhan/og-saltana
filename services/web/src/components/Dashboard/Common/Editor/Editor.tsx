import dynamic from 'next/dynamic'
import React from 'react'
import { EDITOR_JS_TOOLS_PROFILE } from './tools'
import EditorJs from 'react-editor-js'

const Editor = ({}) => {
  const instanceRef = React.useRef(null)

  async function handleSave() {
    const savedData = await instanceRef.current.save()

    console.log('savedData', savedData)
    // const edjsParser = EditorHtml();
    // const html = edjsParser.parse(savedData);
    // console.log("ini html", html);
  }

  return (
    <EditorJs
      instanceRef={(instance) => (instanceRef.current = instance)}
      tools={EDITOR_JS_TOOLS_PROFILE}
      defaultBlock="linkTool"
      i18n={{
        messages: {},
      }}
      data={{
        time: 1556098174501,
        blocks: [],
        version: '2.12.4',
      }}
    />
  )
}

export default Editor
