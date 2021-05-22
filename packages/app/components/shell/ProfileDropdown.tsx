import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue as mode,
  useMenuButton,
  UseMenuButtonProps,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import * as React from "react";

const UserAvatar = () => {
  const [session, loading] = useSession();

  return (
    <Avatar
      size="sm"
      src={loading && session.profile?.metadata?.avatar}
      name={loading && (session.profile?.displayName || session.user?.email)}
    />
  );
};

const ProfileMenuButton = (props: UseMenuButtonProps) => {
  const buttonProps = useMenuButton(props);
  return (
    <Flex
      {...buttonProps}
      as="button"
      flexShrink={0}
      rounded="full"
      outline="0"
      _focus={{ shadow: "outline" }}
    >
      <Box srOnly>Open user menu</Box>
      <UserAvatar />
    </Flex>
  );
};

export const ProfileDropdown = () => {
  const [session, loading] = useSession();

  if (!session && loading) {
    return null;
  }

  console.log(session);
  return (
    <Menu>
      <ProfileMenuButton />
      <MenuList
        rounded="md"
        shadow="lg"
        py="1"
        color={mode("gray.600", "inherit")}
        fontSize="sm"
      >
        <HStack px="3" py="4">
          <UserAvatar />
          <Box lineHeight="1">
            <Text fontWeight="semibold">{session.profile?.displayName}</Text>
            <Text mt="1" fontSize="xs" color="gray.500">
              {session.profile?.email}
            </Text>
          </Box>
        </HStack>
        <Link href={`/${encodeURIComponent(session.profile?.id)}`} passHref>
          <MenuItem fontWeight="medium">Your Profile</MenuItem>
        </Link>
        <Link
          href={`/${encodeURIComponent(session.profile?.id)}/create-product`}
          passHref
        >
          <MenuItem fontWeight="medium">Create Product</MenuItem>
        </Link>
        <Link
          href={`/${encodeURIComponent(session.profile?.id)}/customize`}
          passHref
        >
          <MenuItem fontWeight="medium">Customize Shop</MenuItem>
        </Link>
        <Link
          href={`/${encodeURIComponent(session.profile?.id)}/earnings`}
          passHref
        >
          <MenuItem fontWeight="medium">Earnings</MenuItem>
        </Link>
        <Link
          href={`/${encodeURIComponent(session.profile?.id)}/integrations`}
          passHref
        >
          <MenuItem fontWeight="medium">Workflows & Integrations</MenuItem>
        </Link>
        <Link
          href={`/${encodeURIComponent(session.profile?.id)}/payouts`}
          passHref
        >
          <MenuItem fontWeight="medium">Payouts</MenuItem>
        </Link>
        <Link
          href={`/${encodeURIComponent(session.profile?.id)}/settings`}
          passHref
        >
          <MenuItem fontWeight="medium">Settings (SHOP)</MenuItem>
        </Link>

        <Link
          href={`/${encodeURIComponent(session.profile?.id)}/stats`}
          passHref
        >
          <MenuItem fontWeight="medium">Stats</MenuItem>
        </Link>
        <Link href={`/my/orders`} passHref>
          <MenuItem fontWeight="medium">Purchased</MenuItem>
        </Link>
        <Link href={`/my/settings`} passHref>
          <MenuItem fontWeight="medium">Settings</MenuItem>
        </Link>
        <MenuItem
          fontWeight="medium"
          color={mode("red.500", "red.300")}
          onClick={() => signOut()}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
