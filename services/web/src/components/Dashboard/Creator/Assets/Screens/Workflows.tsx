import { PlusIcon } from '@heroicons/react/outline'
import CreatorSlugField from 'components/Dashboard/Common/Inputs/CreatorPageSlug'
import useCreatorSpace from 'hooks/useCreatorSpace'
import React from 'react'

import { useFormContext } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import {
  Card,
  ButtonLink,
  CardSection,
  Stack,
  Text,
} from '@kiwicom/orbit-components'

export default function CreatorDashboardLinkWorkflowsScreen() {
  return (
    <main>
      <NextSeo title="Workflows" />
      n8n integration with a simple interface but we need to define some
      "templates" for each link type
      <div className="mb-5">
        <Card
          actions={
            <ButtonLink onClick={() => console.log('onClick')} size="small">
              Expand all
            </ButtonLink>
          }
          title="Webhooks"
        >
          <CardSection
            expandable
            onClose={() => console.log('onClose')}
            onExpand={() => console.log('onExpand')}
            title="http://example.com/webhooks"
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
      <Card
        actions={
          <ButtonLink onClick={() => console.log('onClick')} size="small">
            Expand all
          </ButtonLink>
        }
        title="Integrations"
      >
        <CardSection
          expandable
          onClose={() => console.log('onClose')}
          onExpand={() => console.log('onExpand')}
          title="Slack"
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
          title="Zapier"
        >
          <Stack direction="column" spacing="XSmall">
            <Text type="secondary">June 11, 1985</Text>
            <Text type="secondary">robin2fly@example.com</Text>
          </Stack>
        </CardSection>
      </Card>
    </main>
  )
}
