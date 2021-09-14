import useCreatorSpace from 'hooks/useCreatorSpace'
import { NextSeo } from 'next-seo'

import { useFormContext } from 'react-hook-form'

export default function CreatorDashboardLinkDiscountsScreen() {
  const methods = useFormContext()
  const { creator } = useCreatorSpace()

  return (
    <main>
      <NextSeo title="Discounts" />
    </main>
  )
}
