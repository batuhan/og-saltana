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
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiChartBar, HiDownload, HiPlus } from 'react-icons/hi'
import DashboardShell from '../../components/DashboardShell'
import CreateProductButton from '../../components/CreateProductButton'
import { useAuthenticatedApi } from '../../modules/api'
import { useSession } from 'next-auth/client'

export const MyPurchases = () => {
  const [session] = useSession()
  const ordersQuery = useAuthenticatedApi('orders', 'list', {
    payerId: session.user.id,
    nbResultsPerPage: 100,
  }, { initialData: []})

  console.log(ordersQuery)
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
                  <Heading size="lg">My Purchases</Heading>
                  <Text color={mode('gray.500', 'gray.300')} fontSize="sm">
                    ({ordersQuery.data.length} purchases)
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
                <TabPanel>
                  <Table variant="simple">
                    <TableCaption>
                      Products
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Updated At</Th>
                        <Th>Created At</Th>
                        <Th isNumeric>Amount Piad</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {ordersQuery.data.map((order) => (
                        <Tr key={order.id}>
                          <Td>
                            <Link
                              href={`/${order.ownerId}/${order.id}?mode=edit`}
                            >
                              {order.name}
                            </Link>
                          </Td>
                          <Td>{order.description}</Td>
                          <Td>{order.createdDate}</Td>
                          <Td>{order.updatedDate}</Td>
                          <Td isNumeric>{order.amountDue}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TabPanel>
                <TabPanel>sdfds</TabPanel>
              </TabPanels>
            </Box>
          </Box>
        </Flex>
      </Tabs>
    </DashboardShell>
  )
}

MyPurchases.auth = {
  role: 'user',
  loading: 'Loading', //direct to this url
}

export default MyPurchases
