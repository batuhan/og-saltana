import { PlusIcon } from '@heroicons/react/outline'
import CreatorSlugField from 'components/Dashboard/Common/Fields/CreatorSlugField'
import useCreatorSpace from 'hooks/useCreatorSpace'
import React from 'react'
import 'twin.macro'

import { useFormContext } from 'react-hook-form'
import RichContentField from 'components/Dashboard/Common/Fields/RichContentField'
import PricePickerField from 'components/Dashboard/Common/Fields/PricePickerField'

export default function CreatorDashboardLinkBasicScreen() {
  const { register } = useFormContext()

  const { creator } = useCreatorSpace()

  return (
    <main>
      <PricePickerField register={register} />
      <div tw="space-y-6">
        <div>
          <label
            htmlFor="description"
            tw="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div tw="mt-1">
            <RichContentField register={register} />
          </div>
        </div>
      </div>

      <div tw="space-y-6">
        <CreatorSlugField
          username={creator.data.username}
          register={register}
        />
      </div>
    </main>
  )
}
