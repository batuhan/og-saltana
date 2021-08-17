import tw, { styled } from 'twin.macro'

import dynamic from 'next/dynamic'
import { useFormContext, useForm, Controller } from 'react-hook-form'
import largePostFixture from './Editor/fixtures/large-post.json'

import EditorWrapper from './Editor/EditorWrapper'
import { useEffect } from 'react'
import { useState } from 'react'

export function ContentEditor2({ fieldName, defaultValue }) {
  const { control } = useFormContext()
  return (
    <div tw="w-full pl-8">
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <EditorWrapper
              onChange={onChange}
              onBlur={onBlur}
              content={largePostFixture}
            />
          )
        }}
      />
    </div>
  )
}

export default function ContentEditor({ fieldName }: { fieldName: string }) {
  const { register, setValue, watch } = useFormContext()
  const value = watch(fieldName)
  const [hasContent, setHasContent] = useState(false)

  useEffect(() => {
    register(fieldName, { required: true })
    if (
      hasContent === false &&
      value &&
      typeof value === 'object' &&
      value.blocks.length > 0
    ) {
      setHasContent(true)
    }
  }, [register, fieldName, hasContent, value, setHasContent])
  const onChange = (newValue) =>
    setValue(fieldName, newValue, {
      shouldDirty: true,
    })

  return (
    <div tw="w-full pl-8">
      {hasContent && <EditorWrapper onChange={onChange} content={value} />}
    </div>
  )
}
