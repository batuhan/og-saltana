import React from "react"

import { Popover, PopoverTrigger, Button, Portal, PopoverContent } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

function CreateProductButton() {
  const initialFocusRef = React.useRef(null)
  useApiMutation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Popover initialFocusRef={initialFocusRef} isOpen>
      <PopoverTrigger>
        <Button variant="outline">Feedback</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent boxShadow="xl" p="3" _focus={{ outline: 'none' }}>
        <form onSubmit={handleSubmit(loginMutation.onSubmit)}>

      <Stack spacing="3">
        <Textarea
          ref={forwardedRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Feedback"
          required
          focusBorderColor={useColorModeValue('blue.500', 'blue.300')}
          _placeholder={{
            opacity: 1,
            color: useColorModeValue('gray.500', 'whiteAlpha.700'),
          }}
          resize="none"
        />
        <Flex justifyContent="space-between">
          <Button type="submit" size="sm" variant="outline">
            Send
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
