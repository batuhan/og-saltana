import useCreatorSpace from 'hooks/useCreatorSpace'
import { NextSeo } from 'next-seo'
import 'twin.macro'

import { useFormContext } from 'react-hook-form'
import RichContentField from 'components/Dashboard/Common/Fields/RichContentField'

export default function CreatorDashboardLinkDeliverablesScreen() {
  const methods = useFormContext()

  console.log('methods', methods)
  const { creator } = useCreatorSpace()

  return (
    <main>
      <NextSeo title="Deliverables" />

      <RichContentField {...methods} />
    </main>
  )
}
