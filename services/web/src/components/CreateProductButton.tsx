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

function CreateProductButton() {
  const router = useRouter()
  const { data } = useCurrentUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const addProduct = useApiMutation('assets', 'create', {
    onSuccess: ({ id }) => {
      router.push(`/${data.username}/${id}/?mode=edit`)
    },
  })

  function onSubmit({ name }) {
    addProduct.mutate({ name })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="blue" leftIcon={<HiPlus />} fontSize="sm">
          Add product
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
                isReadOnly={addProduct.isLoading}
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
                  disabled={addProduct.isLoading}
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
export default CreateProductButton
