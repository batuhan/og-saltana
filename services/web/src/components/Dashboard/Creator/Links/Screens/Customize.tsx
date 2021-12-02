import { PlusIcon } from '@heroicons/react/outline'

import CreatorPageSlug from 'components/Dashboard/Common/Inputs/CreatorPageSlug'

import useCreatorSpace from 'hooks/useCreatorSpace'

import { useFormContext } from 'react-hook-form'
import React from 'react'
export default function CreatorDashboardLinkCustomizeScreen() {
  const methods = useFormContext()

  const { creator } = useCreatorSpace()

  return (
    <main>

    </main>
  )
}
