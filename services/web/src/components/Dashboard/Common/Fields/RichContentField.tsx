import tw, { styled } from 'twin.macro'

import dynamic from 'next/dynamic'
import { useFormContext, useForm, Controller } from 'react-hook-form'

const Editor = dynamic(() => import('../Editor/Editor'), {
  ssr: false,
})

export default function RichContentField({ fieldName, defaultValue }) {
  const { control } = useFormContext()
  return (
    <div tw="w-full pl-8">
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Editor onRicosEditorChange={onChange} />
        )}
      />
    </div>
  )
}
