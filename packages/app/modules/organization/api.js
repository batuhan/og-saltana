import {useQuery} from 'react-query'
import api from "../api/instance"

export function useOrganization({userId}) {
    const {isLoading, isError, data, error} = useQuery(`organization/${userId}`, () => api.users.read(userId))
    return {isLoading, isError, data, error}
}

export function useAssets(params) {
    const {ownerId} = params

    const maxNbResultsPerPage = 100 // retrieve all assets at once

    const {isLoading, isError, data, error} = useQuery(`assets/${ownerId}`, () => api.assets.list({
        ownerId,
        nbResultsPerPage: maxNbResultsPerPage
    }))
    return {isLoading, isError, data, error}

}
