import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import { Box } from '@chakra-ui/react'
function Feature({ index }) {
  return (
    <BlocksControls index={index}>
      <Box>
        <h3>
          <InlineTextarea name="heading" focusRing={false} />
        </h3>
        <p>
          <InlineTextarea name="supporting_copy" focusRing={false} />
        </p>
      </Box>
    </BlocksControls>
  )
}

export const featureBlock = {
  Component: Feature,
  template: {
    label: 'Feature',
    defaultItem: {
      _template: 'feature',
      heading: 'Marie Skłodowska Curie',
      supporting_copy:
        'Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ',
    },
    fields: [],
  },
}
