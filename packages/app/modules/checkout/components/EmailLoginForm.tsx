import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/system'
import * as React from 'react'

export const EmailLoginForm = (props: HTMLChakraProps<'form'>) => (
  <chakra.form width="full" {...props}>
    <FormControl>
      <Input
        placeholder="Email address"
        _placeholder={{ color: useColorModeValue('gray.600', 'gray.400') }}
      />
    </FormControl>
    <Button mt="3" isFullWidth fontSize="sm" fontWeight="bold" colorScheme="gray" isDisabled>
      Continue
    </Button>
  </chakra.form>
)
