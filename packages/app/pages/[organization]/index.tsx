import {Box, Button, Heading, Icon, Text, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'
import {useRouter} from 'next/router'

import {HiBadgeCheck, HiPencilAlt} from 'react-icons/hi'
import {CardContent} from '../../components/organization/CardContent'
import {CardWithAvatar} from '../../components/organization/CardWithAvatar'
import {UserInfo} from '../../components/organization/UserInfo'
import ProductPreviewCard from '../../components/organization/ProductPreviewCard'

import {GridSystemDemo} from "../../components/organization/GridSystem/App";
import {useOrganization} from "../../modules/organization/api"

const OrganizationProfile = () => {
    const router = useRouter()
    const {organization: organizationSlug} = router.query
    const {isLoading, data} = useOrganization({userId: organizationSlug})
    if (isLoading) {
        return "Loading..."
    }
    const {description, metadata, displayName} = data
    return (

        <Box as="section" pt="20" pb="12" position="relative">
            <Box position="absolute" inset="0" height="32" bg="blue.600"/>
            <CardWithAvatar
                maxW="xl"
                avatarProps={{
                    src: metadata.instant.avatarUrl,
                    name: displayName,
                }}
                action={
                    <Button size="sm" leftIcon={<HiPencilAlt/>}>
                        Edit
                    </Button>
                }
            >
                <CardContent>

                    <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
                        {displayName} <Icon as={HiBadgeCheck} color="blue.300"/>

                    </Heading>

                    <Text color={useColorModeValue('gray.600', 'gray.400')}>
                        {description}
                    </Text>
                    <UserInfo location="Memphis, USA" website="esther.com" memberSince="Joined Sept. 2019"/>
                </CardContent>
            </CardWithAvatar>

            <GridSystemDemo ItemComponent={ProductPreviewCard}/>

        </Box>
    )
}
export default OrganizationProfile