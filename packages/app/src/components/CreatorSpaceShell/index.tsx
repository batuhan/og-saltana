import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  chakra,
  Container,
  Grid,
  Flex,
  Text,
  Image,
  Icon,
  Stack,
  Tag,
  useColorModeValue,
  Link,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,

  useEditableControls,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import * as React from 'react'
import { HiBadgeCheck, HiPencilAlt } from 'react-icons/hi'
import { useAsset, useUser } from '../../modules/api'

function CustomControlsExample() {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<HiPencilAlt />} {...getSubmitButtonProps()} />
        <IconButton icon={<HiPencilAlt />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <Editable
      textAlign="center"
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable>
  )
}



function DisplayNameInput2() {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<HiPencilAlt />} {...getSubmitButtonProps()} />
        <IconButton icon={<HiPencilAlt />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <Editable
      textAlign="center"
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable>
  )
}


function DisplayNameInput() {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<HiPencilAlt />} {...getSubmitButtonProps()} />
        <IconButton icon={<HiPencilAlt />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <Editable
      textAlign="center"
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable>
  )
}

const CreatorSpaceShell: React.FC = ({ children }) => {
  const router = useRouter()
  const { organization: organizationSlug, product: assetId } = router.query
  const { data = {} } = useUser(organizationSlug)
  const { data: assetData } = useAsset(
    { assetId },
    {
      enabled: !!assetId,
    }
  )
  const [session] = useSession()
  const [canEdit, setCanEdit] = React.useState(session ? true: false)

  React.useEffect(() => {
    setCanEdit(session && session.user && session.user.id && organizationSlug === session.user.id)
  }, [session])

  const { description, metadata = {}, displayName } = data
  return (
    <Grid templateColumns="70% 30%">
      <Box border={0}>{children}</Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        border={0}
      >
        <Box
          bg="#ffffff"
          borderRadius="lg"
          border="1px solid lightgrey"
          overflow="hidden"
          mb={5}
        >
          <CustomControlsExample />
          <Image
            w="full"
            h={56}
            fit="cover"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="avatar"
          />
          <Box p={5} pb={8}>
            <Flex
              display="flex"
              justifyContent="space-between"
              alignItems="stretch"
              flexDirection="row"
            >


              <Text fontWeight="bold" fontSize="xl">
                {displayName}
              </Text>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent="flex-start"
                width={25}
              >
                <Icon as={HiBadgeCheck} />
                <Text fontWeight="bold" mr={1}>
                  %1
                </Text>
              </Box>
            </Flex>
            <Stack spacing={2} pt={3}>
              <Tag size="md" variant="subtle" colorScheme="yellow">
                About the creator
              </Tag>
              <Text color="gray.600">{description} description</Text>
              {metadata.instant?.avatarUrl}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                p={1}
              ></Box>
              <Text fontSize="sm" mb={3}>
                Joined June 2021
              </Text>
              <Text fontSize="sm" mb={3}>
                Invited by Batuhan Icoz
              </Text>
            </Stack>
          </Box>
        </Box>
        {assetData && (
          <Box
            bg="#ffffff"
            borderRadius="lg"
            border="1px solid lightgrey"
            overflow="hidden"
          >
            <Box p={5} pb={8} display="flex" justifyContent="center">
              some information on the product that is not editable by the
              creator
            </Box>

            <Flex alignItems="center" px={6} py={3} bg="gray.900">
              <Icon as={HiBadgeCheck} h={6} w={6} color="white" />

              <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
                GET NOW FOR {assetData.price}
              </chakra.h1>
            </Flex>
          </Box>
        )}
      </Box>
    </Grid>
  )
}

export default CreatorSpaceShell
