import { PlusIcon } from '@heroicons/react/outline'

import CreatorPageSlug from 'components/Dashboard/Common/Inputs/CreatorPageSlug'

import useCreatorSpace from 'hooks/useCreatorSpace'
import { NextSeo } from 'next-seo'
import 'twin.macro'

import { useFormContext } from 'react-hook-form'
import React from 'react'
import {
  ButtonLink,
  Card,
  CardSection,
  Text,
  Stack,
} from '@kiwicom/orbit-components'

export default function CreatorDashboardLinkCustomizeScreen() {
  const methods = useFormContext()

  const { creator } = useCreatorSpace()

  return (
    <main>
      <NextSeo title="Customize" />
      <div tw="mb-5">
        <Card
          actions={
            <ButtonLink onClick={() => console.log('onClick')} size="small">
              Expand all
            </ButtonLink>
          }
          title="Custom Domains"
        >
          <CardSection
            expandable
            onClose={() => console.log('onClose')}
            onExpand={() => console.log('onExpand')}
            title="Yasmin Karenth – closed"
          >
            <Stack direction="column" spacing="XSmall">
              <Text type="secondary">January 20, 1978</Text>
              <Text type="secondary">yas.karenth@example.com</Text>
            </Stack>
          </CardSection>
          <CardSection
            expandable
            onClose={() => console.log('onClose')}
            onExpand={() => console.log('onExpand')}
            title="Robin Kask – closed"
          >
            <Stack direction="column" spacing="XSmall">
              <Text type="secondary">June 11, 1985</Text>
              <Text type="secondary">robin2fly@example.com</Text>
            </Stack>
          </CardSection>
        </Card>
      </div>
    </main>
  )
}
