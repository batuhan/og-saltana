import {
  Box,
  Flex,
  Text,
  Image,
  Icon,
  Stack,
  Tag,
  Button,
} from '@chakra-ui/react'

import * as React from 'react'
import { HiBadgeCheck } from 'react-icons/hi'
import { useApi } from '../../modules/api'

import { Skeleton } from '@chakra-ui/react'
import { SLink } from '../Link'
import Link from 'next/link'
import { useCMS, useForm, usePlugin } from 'tinacms'
import { useRouter } from 'next/router'
import { InlineForm } from 'react-tinacms-inline'
import { useApiInstance } from '../../modules/api/useApi'
import { useMutation, useQueryClient } from 'react-query'

const CreatorInfoBox = ({ creatorId, assetId }) => {
  const { data = {}, isLoading } = useApi('users', 'read', creatorId)
  const {
    query: { mode },
  } = useRouter()
  const cms = useCMS()
  const { instance } = useApiInstance()
  const saveCreator = useMutation((data) =>
    instance.users.update(creatorId, data)
  )
  const queryClient = useQueryClient()

 const { organizations, id, createdDate, updatedDate, livemode, ...creator } = data
  const formConfig = {
    id: data.id,
    label: 'Creator Profile',
    initialValues: creator,
    fields: [
      {
        name: 'displayName',
        component: 'text',
        label: 'Name',
        description: 'Name.',
      },
      {
        name: 'description',
        component: 'text',
        label: 'Bio',
        description: 'descp.',
      },
    ],
    async onSubmit(data) {
      await saveCreator.mutateAsync(data)
      await queryClient.invalidateQueries(['users', 'read', data.id])
      cms.alerts.success('Saved!')
    },
  }
  const [modifiedValues, form] = useForm(formConfig)
  usePlugin(form)

  return (
    <InlineForm form={form}>
      <Box
        bg="#ffffff"
        borderRadius="lg"
        border="1px solid lightgrey"
        overflow="hidden"
        mb={5}
      >
        <Skeleton isLoaded={!isLoading}>
          <Image
            w="full"
            h={56}
            fit="cover"
            src={modifiedValues?.metadata?.instant?.avatarUrl}
            alt="avatar"
          />
        </Skeleton>
        <Box p={5} pb={8}>
          <Flex
            display="flex"
            justifyContent="space-between"
            alignItems="stretch"
            flexDirection="row"
          >
            <Skeleton isLoaded={!isLoading}>
              <SLink href={`/${data.id}`}>
                <Text fontWeight="bold" fontSize="xl">
                  {modifiedValues.displayName}
                </Text>
              </SLink>
            </Skeleton>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="row"
              justifyContent="flex-start"
              width={25}
            >
              <Icon as={HiBadgeCheck} />
              <Text fontWeight="bold" mr={1}>
                %1
              </Text>
            </Box>
          </Flex>
          <Stack spacing={2} pt={3}>
            <Tag size="md" variant="subtle" colorScheme="yellow">
              About the creator
            </Tag>
            <Skeleton isLoaded={!isLoading}>
              <Text color="gray.600">{modifiedValues.description}</Text>
            </Skeleton>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              p={1}
            ></Box>
            <Text fontSize="sm" mb={3}>
              Joined {data.createdDate}
            </Text>
            {data?.metadata?.instant?.invitedBy && (
              <Text fontSize="sm" mb={3}>
                Invited by {modifiedValues?.metadata?.instant?.invitedBy}
              </Text>
            )}

            <Link
              href={`/${data.id}${assetId ? `/${assetId}` : ''}${
                mode === 'edit' ? '' : '?mode=edit'
              }`}
              passHref
            >
              <Button variant="solid">
                {mode === 'edit' ? 'Save' : 'Customize'}
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </InlineForm>
  )
}

export default CreatorInfoBox
