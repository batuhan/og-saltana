import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue as mode,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiChartBar, HiDownload, HiPlus } from 'react-icons/hi'
import DashboardShell from '../../../components/DashboardShell'
import CreateProductButton from '../../../components/CreateProductButton'

export const CreatorProducts = () => {
  return (
    <DashboardShell>
      <Tabs isFitted>
        <Flex direction="column" align="stretch" minH="100vh">
          <Box bg={mode('gray.50', 'gray.800')} px="8" pt="8">
            <Box maxW="7xl" mx="auto">
              <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align="flex-start"
                mb="10"
              >
                <HStack mb={{ base: '4', md: '0' }}>
                  <Heading size="lg">Products</Heading>
                  <Text color={mode('gray.500', 'gray.300')} fontSize="sm">
                    (42 products)
                  </Text>
                </HStack>

                <HStack spacing={{ base: '2', md: '4' }}>
                  <Button
                    bg={mode('white', 'inherit')}
                    variant="outline"
                    leftIcon={<HiDownload />}
                    fontSize="sm"
                  >
                    Import
                  </Button>
                  <CreateProductButton />
                </HStack>
              </Flex>

              <Flex justify="space-between" align="center">
                <TabList
                  border="0"
                  position="relative"
                  zIndex={1}
                  w={{ base: '100%', md: 'auto' }}
                >
                  <Tab fontWeight="semibold">Manage</Tab>
                  <Tab fontWeight="semibold">New</Tab>
                </TabList>
                <Link
                  href="#"
                  fontWeight="semibold"
                  color={mode('blue.600', 'blue.300')}
                  fontSize="sm"
                  display={{ base: 'none', md: 'block' }}
                >
                  <Box
                    as={HiChartBar}
                    fontSize="sm"
                    display="inline-block"
                    marginEnd="2"
                  />
                  View form analytics
                </Link>
              </Flex>
            </Box>
          </Box>
          <Box pos="relative" zIndex={0}>
            <Divider
              borderBottomWidth="2px"
              opacity={1}
              borderColor={mode('gray.100', 'gray.700')}
            />
          </Box>
          <Box px="8" flex="1">
            <Box maxW="7xl" mx="auto">
              <TabPanels mt="5" h="full">
                <TabPanel>Manage</TabPanel>
                <TabPanel>sdfds</TabPanel>
              </TabPanels>
            </Box>
          </Box>
        </Flex>
      </Tabs>
    </DashboardShell>
  )
}
CreatorProducts.auth = {
  role: 'creator',
  loading: 'Loading', //direct to this url
}

export default CreatorProducts
