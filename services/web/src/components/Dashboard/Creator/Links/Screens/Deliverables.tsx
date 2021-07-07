import { PlusIcon } from '@heroicons/react/outline'
import CreatorSlugField from 'components/Dashboard/Common/Fields/CreatorSlugField'
import useCreatorSpace from 'hooks/useCreatorSpace'
import React from 'react'
import 'twin.macro'

import { useFormContext } from 'react-hook-form'
import RichContentField from 'components/Dashboard/Common/Fields/RichContentField'

export default function CreatorDashboardLinkDeliverablesScreen() {
  const methods = useFormContext()

  console.log('methods', methods)
  const { creator } = useCreatorSpace()

  return (
    <main>
      <RichContentField {...methods} />
    </main>
  )
}
