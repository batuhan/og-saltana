import { Input } from '@chakra-ui/react'
import { useCMS } from 'tinacms'

import * as React from 'react'
import { InlineField, InlineTextProps, FocusRing } from 'react-tinacms-inline'

export default function InlineText({
  name,
  className,
  focusRing = true,
}: InlineTextProps) {
  const cms = useCMS()

  return (
    <InlineField name={name}>
      {({ input }) => {
        /**
         * If the cms is enabled, render the input
         * with the focus ring
         */
        if (cms.enabled) {
          if (!focusRing) {
            return <Input type="text" {...input} className={className} />
          }

          return (
            <FocusRing name={name} options={focusRing}>
              <Input type="text" {...input} className={className} />
            </FocusRing>
          )
        }
        /**
         * Otherwise, pass the input value
         */
        return <>{input.value}</>
      }}
    </InlineField>
  )
}
