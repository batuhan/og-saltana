import React from 'react'
import { useCMS, useForm, usePlugin } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'

import { heroBlock } from './ProductBlocks/Hero'
import { paragraphBlock } from './ProductBlocks/Paragraph'
import { imagesBlock } from './ProductBlocks/Images'
import { featureListBlock } from './ProductBlocks/FeatureList'

const HOME_BLOCKS = {
  hero: heroBlock,
  images: imagesBlock,
  paragraph: paragraphBlock,
  features: featureListBlock,
}

export default function ProductEditMode(props) {
  const cms = useCMS()

  const formConfig = {
    id: props.id || './data/data.json',
    initialValues: props,
    onSubmit() {
      cms.alerts.success('Saved!')
    },
  }
  const [, form] = useForm(formConfig)
  usePlugin(form)

  return (
    <div className="home">
      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
    </div>
  )
}
