import { useFormContext } from 'react-hook-form'

import EditorWrapper from './Editor/EditorWrapper'
import { useEffect } from 'react'

function encodeContent(content) {
  return JSON.stringify(content)
}

function decodeContent(content) {
  if (!content) {
    return { blocks: [], entityMap: {} }
  }
  return JSON.parse(content)
}

export default function ContentEditor({ fieldName }: { fieldName: string }) {
  const { register, setValue, watch } = useFormContext()
  const value = watch(fieldName)

  useEffect(() => {
    register(fieldName, { required: true })
  }, [register, fieldName])

  const onChange = (newValue) =>
    setValue(fieldName, encodeContent(newValue), {
      shouldDirty: true,
    })

  return (
    <div className="w-full pl-8">
      <EditorWrapper onChange={onChange} content={decodeContent(value)} />
    </div>
  )
}
