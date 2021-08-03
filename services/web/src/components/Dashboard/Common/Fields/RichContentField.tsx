import tw, { styled } from 'twin.macro'

import dynamic from 'next/dynamic'
import { useFormContext } from 'react-hook-form'

const Editor = dynamic(() => import('../Editor/Editor'), {
  ssr: false,
})

export default function RichContentField({ fieldName }) {
  const { setValue } = useFormContext()

  return (
    <div tw="ml-4 w-3/6">
      <Editor onRicosEditorChange={(e) => setValue(fieldName, e)} />
    </div>
  )
}
