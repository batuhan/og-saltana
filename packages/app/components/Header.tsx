import React from "react";

import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
    Avatar,
} from "@chakra-ui/react";
import {
    AiOutlineShoppingCart,
    AiFillBell
} from "react-icons/ai";
import { BsFillCameraVideoFill, BsPlus } from "react-icons/bs";
import { Logo} from "./Logo"
import {useUser} from '../modules/auth/hooks'
import {ProfileDropdown} from "./ProfileDropdown";
import {CheckoutToDeliveryModal} from "./CheckoutToDelivery";
export default function Header() {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();

    const user = useUser();
    console.log(user)
    return (
        <React.Fragment>
            <chakra.header
                bg={bg}
                w="full"
                px={{ base: 2, sm: 4 }}
                py={4}
                shadow="md"
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} alignItems="center">
                        <chakra.a
                            href="/"
                            title="Choc Home Page"
                            display="flex"
                            alignItems="center"
                        >
                            <Logo />
                            <VisuallyHidden>Saltana</VisuallyHidden>
                        </chakra.a>

                    </HStack>
                    <HStack spacing="3">
                        {user && <Button leftIcon={<BsPlus />}>
                            New Product
                        </Button>}

                        {user && <chakra.a
                            p={3}
                            color={useColorModeValue("gray.800", "inherit")}
                            rounded="sm"
                            _hover={{ color: useColorModeValue("gray.800", "gray.600") }}
                        >
                            <AiFillBell />
                            <VisuallyHidden>Notifications</VisuallyHidden>
                        </chakra.a>}
                        <CheckoutToDeliveryModal />
                        <ProfileDropdown />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    );
}
