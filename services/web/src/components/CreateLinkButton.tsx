import React from 'react'

import {
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  useColorModeValue,
  Stack,
  Textarea,
  Flex,
  Input,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useApiMutation, useCurrentUser } from '../modules/api'
import { HiPlus } from 'react-icons/hi'
import { useRouter } from 'next/router'

function CreateLinkButton() {
  const router = useRouter()
  const { data } = useCurrentUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const addLink = useApiMutation('links', 'create', {
    onSuccess: ({ id }) => {
      router.push(`/${data.username}/${id}/?mode=edit`)
    },
  })

  function onSubmit({ name }) {
    addLink.mutate({ name })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="blue" leftIcon={<HiPlus />} fontSize="sm">
          Add link
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent boxShadow="xl" p="3" _focus={{ outline: 'none' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="3">
              <Input
                type="text"
                {...register('name', {
                  required: true,
                })}
                isReadOnly={addLink.isLoading}
                placeholder="Name your product"
                focusBorderColor={useColorModeValue('blue.500', 'blue.300')}
                _placeholder={{
                  opacity: 1,
                  color: useColorModeValue('gray.500', 'whiteAlpha.700'),
                }}
                resize="none"
              />
              <Flex justifyContent="space-between">
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  disabled={addLink.isLoading}
                >
                  Add
                </Button>
              </Flex>
            </Stack>
          </form>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
export default CreateLinkButton
