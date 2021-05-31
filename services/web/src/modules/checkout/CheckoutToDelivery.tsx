import * as React from 'react'
import { useCart } from 'react-use-cart'

import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../stripe'
import {
  Box,
  chakra,
  Heading,
  HStack,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  useColorModeValue as mode,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { HiTrash } from 'react-icons/hi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ElementsForm from '../stripe/components/ElementsForm'
import { Card } from './components/Card'
import { Logo } from '../../components/Logo'

interface ProductLineProps {
  name?: string
  price: number
  children?: React.ReactNode
  id: string
}

export const ProductLine = (props: ProductLineProps) => {
  const { name, id, price, quantity } = props
  const { removeItem } = useCart()

  return (
    <HStack spacing="3">
      <Box flex="1">
        <Text fontWeight="bold">{name} ({quantity})</Text>
        <Text fontSize="sm">Delivered digitally</Text>
      </Box>
      <Box fontWeight="bold" color={mode('blue.600', 'blue.400')}>
        ${price}
      </Box>

      <Box fontSize="2xl" color={mode('gray.300', 'whiteAlpha.400')}>
        <IconButton
          aria-label="Delete"
          icon={<HiTrash />}
          rounded="full"
          size="sm"
          onClick={() => removeItem(id)}
        />
      </Box>
    </HStack>
  )
}

export function CheckoutToDeliveryModal() {
  return (
    <Popover>
      <PopoverTrigger>
        <chakra.a
          p={3}
          color={useColorModeValue('gray.800', 'inherit')}
          rounded="sm"
          _hover={{ color: useColorModeValue('gray.800', 'gray.600') }}
        >
          <AiOutlineShoppingCart />
          <VisuallyHidden>Cart</VisuallyHidden>
        </chakra.a>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <CheckoutToDelivery />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export function CheckoutToDelivery() {
  const { isEmpty, totalUniqueItems, items, cartTotal } = useCart()

  if (isEmpty) return <p>Your cart is empty</p>

  return (
    <>
      <Card maxW="2xl" mx="auto" textAlign="center">
        <Stack maxW="xs" mx="auto" spacing="8">
          <Logo />
          <Stack spacing="3">
            <Heading size="lg" mb="8" fontWeight="extrabold">
              Cart ({totalUniqueItems})
            </Heading>
          </Stack>

          <Stack>
            {items.map((item) => (
              <ProductLine key={item.id} {...item} />
            ))}
          </Stack>

          <Elements stripe={getStripe()}>
            <ElementsForm cartTotal={cartTotal} />
          </Elements>

          <Text
            mt="16"
            fontSize="xs"
            mx="auto"
            maxW="md"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            By continuing, you acknowledge that you have read, understood, and
            agree to our terms and condition
          </Text>
        </Stack>
      </Card>
    </>
  )
}
