import * as React from "react"
import {useCart} from "react-use-cart";
import {
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    PopoverTrigger,
    PopoverContent,
    Text,
    Heading,
    Portal,
    PopoverArrow,
    PopoverCloseButton,
    Divider,
    PopoverBody,
    Popover,
    Tr,
    StackDivider,
    Stack,
    Box, HStack, IconButton, useColorModeValue as mode, chakra, useColorModeValue, VisuallyHidden,
} from '@chakra-ui/react'
import { HiLocationMarker, HiPencilAlt, HiTrash } from 'react-icons/hi'
import {AiOutlineShoppingCart} from "react-icons/ai";

interface ProductLineProps {
    name: string
    price: number
    children?: React.ReactNode
    id: string
}

export const ProductLine = (props: ProductLineProps) => {
    const { name, id, price } = props
    const { removeItem  } = useCart();

    return (
        <HStack spacing="3">
            <Box flex="1">
                <Text fontWeight="bold">{name}</Text>
                <Text fontSize="sm">Delivered digitally</Text>
            </Box>
            <Box fontWeight="bold" color={mode('blue.600', 'blue.400')}>
                ${price}
            </Box>

            <Box
                fontSize="2xl"
                color={mode('gray.300', 'whiteAlpha.400')}
            >
                <IconButton aria-label="Delete" icon={<HiTrash />} rounded="full" size="sm" onClick={() => removeItem(id)} />
            </Box>
        </HStack>
    )
}

export function CheckoutToDeliveryModal() {
    return (<Popover>
        <PopoverTrigger>
            <chakra.a
                p={3}
                color={useColorModeValue("gray.800", "inherit")}
                rounded="sm"
                _hover={{ color: useColorModeValue("gray.800", "gray.600") }}
            >
                <AiOutlineShoppingCart />
                <VisuallyHidden>Cart</VisuallyHidden>
            </chakra.a>
        </PopoverTrigger>
        <Portal>
            <PopoverContent>
                <PopoverArrow/>
                <PopoverCloseButton/>
                <PopoverBody>
                   <CheckoutToDelivery />
                </PopoverBody>
            </PopoverContent>
        </Portal>
    </Popover>)
}


export function CheckoutToDelivery() {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        cartTotal
    } = useCart();

    if (isEmpty) return <p>Your cart is empty</p>;

    return (
        <Box maxW="xl" mx="auto" width="full" >
            <Heading size="lg" mb="8" fontWeight="extrabold">
                Cart ({totalUniqueItems})
            </Heading>
            <Stack spacing="5" justify="flex-start">
                {items.map((item) => (
                    <ProductLine key={item.id} {...item} />
                ))}
            </Stack>

            <Divider />

            <Box fontWeight="bold" color={mode('blue.600', 'blue.400')}>
                ${cartTotal}
            </Box>



        </Box>
    );
}
