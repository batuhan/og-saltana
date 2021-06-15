import {
  HStack,
  Icon,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { HiCalendar, HiFire, HiLocationMarker } from "react-icons/hi";

interface UserInfoProps extends StackProps {
  location: string;
  website: string;
  memberSince: string;
}

export const UserInfo = (props: UserInfoProps) => {
  const { location, website, memberSince, ...stackProps } = props;
  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      spacing={{ base: "1", sm: "6" }}
      mt="4"
      fontSize="sm"
      fontWeight="medium"
      color={useColorModeValue("blue.600", "blue.300")}
      {...stackProps}
    >
      <HStack>
        <Icon as={HiLocationMarker} />
        <Text>{location}</Text>
      </HStack>
      <HStack>
        <Icon as={HiCalendar} />
        <Text>{memberSince}</Text>
      </HStack>
      <HStack>
        <Icon as={HiFire} />
        <Text>Top %1 creator on Saltana</Text>
      </HStack>
    </Stack>
  );
};
