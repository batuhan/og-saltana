import { NextSeo } from 'next-seo'
import 'twin.macro'

import RichContentField from 'components/Dashboard/Common/Fields/RichContentField'

export default function CreatorDashboardLinkDeliverablesScreen() {
  return (
    <main>
      <NextSeo title="Deliverables" />

      <RichContentField fieldName="metadata.deliverables" />
    </main>
  )
}
