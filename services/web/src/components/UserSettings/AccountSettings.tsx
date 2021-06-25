import {
  HStack,
  Avatar,
  Box,
  Button,
  FormControl,
  Skeleton,
  FormLabel,
  Select,
  Switch,
  Text,
  Stack,
  StackDivider,
  StackProps,
} from '@chakra-ui/react'
import * as React from 'react'
import { useCurrentUser } from '../../modules/api'
import { Card } from './Card'
import { FieldGroup } from './FieldGroup'
import { HeadingGroup } from './HeadingGroup'

export const AccountSettings = (props: StackProps) => {


  return (
    <Stack as="section" spacing="6" {...props}>
      <HeadingGroup
        title="Account Settings"
        description="Change your profile, request your data, and more"
      />
      <Card>
        <Skeleton isLoaded={!user.loading}>
          <Stack divider={<StackDivider />} spacing="6">
            <FieldGroup
              title="Name &amp; Avatar"
              description="Change your name and profile picture"
            >
              <HStack spacing="4">
                <Avatar
                  src="https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
                  name="Batuhan Icoz"
                />
                <Box>
                  <Text>{user.data.displayName}</Text>
                  <Text color="gray.500" fontSize="sm">
                    Joined {user.data.createdDate}
                  </Text>
                </Box>
              </HStack>
              <HStack mt="5">
                <Button size="sm" fontWeight="normal">
                  Change name
                </Button>
                <Button size="sm" fontWeight="normal">
                  Change avatar
                </Button>
              </HStack>
            </FieldGroup>

            <FieldGroup title="Login details" description="Change your email">
              <Text fontSize="sm">{user.data.email}</Text>
              <HStack mt="5">
                <Button size="sm" fontWeight="normal">
                  Change email
                </Button>
              </HStack>
            </FieldGroup>

            <FieldGroup
              title="Language"
              description="Change your preferred currency"
            >
              <Stack
                direction={{ base: 'column', md: 'row' }}
                width="full"
                spacing="4"
              >
                <FormControl id="currency">
                  <FormLabel fontSize="sm">Currency</FormLabel>
                  <Select size="sm" maxW="2xs">
                    <option>USD ($)</option>
                    <option>TRY (TL)</option>
                    <option>EUR (€)</option>
                  </Select>
                </FormControl>
              </Stack>
              <Button mt="5" size="sm" fontWeight="normal">
                Save Changes
              </Button>
            </FieldGroup>

            <FieldGroup
              title="Communications"
              description="Manage your email preference"
            >
              <Stack spacing="3">
                <FormControl display="flex" alignItems="center">
                  <FormLabel
                    htmlFor="email-marketing"
                    flex="1"
                    fontSize="sm"
                    mb="0"
                  >
                    Product intro, tips, and inspiration
                  </FormLabel>
                  <Switch id="email-marketing" />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
                    Updates about company news and features
                  </FormLabel>
                  <Switch id="email-news" />
                </FormControl>
              </Stack>
              <Button mt="5" size="sm" fontWeight="normal">
                Save Changes
              </Button>
            </FieldGroup>
          </Stack>
        </Skeleton>
      </Card>
    </Stack>
  )
}
