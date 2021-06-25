import { Badge, Box, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'
import { SiNotion } from 'react-icons/si'
import { GrLink } from 'react-icons/gr'
import { AiOutlineFileZip } from 'react-icons/ai'
import { ButtonRadioGroup } from './ButtonRadioGroup'

export default function TypeSelector() {
  return (
    <Box as="section" py="12">
      <Box
      >
        <Box textAlign="center" mb="10">
          <Badge px="3" py="1" variant="solid" colorScheme="blue">
            Step 1
          </Badge>
          <Heading size="lg" fontWeight="extrabold" mt="6" mb="2">
            Add a new...
          </Heading>
          <Text maxW="md" mx="auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
        </Box>
        <Box maxW="xl" mx="auto">
          <ButtonRadioGroup
            defaultValue="analytics"
            options={[
              {
                label: 'Smart Link',
                description:
                  'Create a custom, trackable redirections to anywhere',
                icon: <GrLink />,
                value: 'link',
              },
              {
                label: 'Digital Product',
                description: 'Sell e-books, video courses, data and more',
                icon: <AiOutlineFileZip />,
                value: 'asset',
              },
              {
                label: 'Notion',
                description:
                  'Embed a Notion document, customize styles and track visitors',
                icon: <SiNotion />,
                value: 'notion',
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  )
}
