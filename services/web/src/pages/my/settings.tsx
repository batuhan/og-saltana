import DashboardShell from '../../components/DashboardShell'

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  ButtonGroup,
  Radio,
} from '@chakra-ui/react'
import { HiCloudUpload } from 'react-icons/hi'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { FieldGroup } from '../../components/FieldGroup'
import { CurrencySelect } from '../../components/CurrencySelect'
import { useCurrentUser, useApiMutation } from '../../modules/api'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useApiInstance } from '../../modules/api/useApi'
import React, { useEffect } from 'react'
import { Formik } from 'formik'
import {
  CheckboxContainer,
  CheckboxControl,
  CheckboxSingleControl,
  InputControl,
  NumberInputControl,
  PercentComplete,
  RadioGroupControl,
  ResetButton,
  SelectControl,
  SliderControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from 'formik-chakra-ui'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  displayName: Yup.string().required(),
  email: Yup.string().email().required(),
  metadata: Yup.object({
    instant: Yup.object({
      bio: Yup.string(),
    }),
    _private: Yup.object({
      notification_WHEN_PURCHASED_CONTENT_UPDATED: Yup.boolean().default(true),
      notification_WEEKLY_UPDATES: Yup.boolean().default(true),
    }),
  }),
}).noUnknown(false)

export default function DashboardUserSettings() {
  const user = useCurrentUser()

  const { instance } = useApiInstance()

  const updateUserSettings = useMutation((data) =>
    instance.users.update(user.data.id, data)
  )

  function onSubmit(data) {
    return updateUserSettings.mutateAsync(data)
  }

  return (
    <DashboardShell>
      <Box px={{ base: '4', md: '10' }} py="16" maxWidth="3xl" mx="auto">
        {user.data?.id ? (
          <Formik
            initialValues={validationSchema.cast(
              { ...user.data },
              { stripUnknown: true }
            )}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing="4" divider={<StackDivider />}>
                  <Heading size="lg" as="h1" paddingBottom="4">
                    Account Settings
                  </Heading>
                  <FieldGroup title="Personal Info">
                    <VStack width="full" spacing="6">
                      <FormControl id="name">
                        <InputControl name="displayName" label="Name" />
                      </FormControl>

                      <FormControl id="email">
                        <InputControl name="email" label="E-mail" />
                      </FormControl>

                      <FormControl id="bio">
                        <TextareaControl
                          name="metadata.instant.bio"
                          label="Bio"
                        />
                      </FormControl>
                    </VStack>
                  </FieldGroup>
                  <FieldGroup title="Profile Photo">
                    <Stack
                      direction="row"
                      spacing="6"
                      align="center"
                      width="full"
                    >
                      <Avatar
                        size="xl"
                        name="Alyssa Mall"
                        src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                      />
                      <Box>
                        <HStack spacing="5">
                          <Button leftIcon={<HiCloudUpload />}>
                            Change photo
                          </Button>
                          <Button variant="ghost" colorScheme="red">
                            Delete
                          </Button>
                        </HStack>
                        <Text
                          fontSize="sm"
                          mt="3"
                          color={useColorModeValue(
                            'gray.500',
                            'whiteAlpha.600'
                          )}
                        >
                          .jpg, .gif, or .png. Max file size 700K.
                        </Text>
                      </Box>
                    </Stack>
                  </FieldGroup>
                  <FieldGroup title="Notifications">
                    <Stack width="full" spacing="4">
                      <SwitchControl
                        name="metadata._private.notification_WHEN_PURCHASED_CONTENT_UPDATED"
                        label="Get updates when a content you purchased is updated"
                      />

                      <SwitchControl
                        name="metadata._private.notification_WEEKLY_UPDATE"
                        label="Get updates when a content you purchased is updated"
                      />
                    </Stack>
                  </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                  <HStack width="full">
                    <SubmitButton>Submit</SubmitButton>
                  </HStack>
                </FieldGroup>
              </form>
            )}
          </Formik>
        ) : (
          'Loading'
        )}
      </Box>
    </DashboardShell>
  )
}
