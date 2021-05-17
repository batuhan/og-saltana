import { createInstance } from 'stelace'

const apiBaseURL = process.env.SALTANA_CORE_API_BASE
const apiKey = process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY

const apiVersion = '2019-05-20'

const MAX_RESULTS_PER_PAGE = 100 // cf. Saltana API reference for pagination details

if (!apiKey) throw new Error('Missing Saltana publishable API key')

const api = initSaltanaCoreSdk({ apiBaseURL, apiKey })

export default api

/**
 * Use this function to fetch all results, it will automatically go through the pagination results
 * @param {Function} fetchFn({ page, nbResultsPerPage, ...params }) - fetch results factory, should return a promise
 * @param {Object} [params]
 * @return {Object[]} allResults
 */
export async function fetchAllResults (fetchFn, params = {}) {
    const nbResultsPerPage = MAX_RESULTS_PER_PAGE
    let page = 1
    let allResults = []
    let results

    do {
        const passedParameters = Object.assign({}, params, { page, nbResultsPerPage })
        results = await fetchFn(passedParameters)
        page += 1

        allResults = allResults.concat(results)
    } while (results.paginationMeta.nbPages > results.paginationMeta.page)

    return allResults
}

export function getSaltanaCoreEnv () {
    return apiKey.includes('_live_') ? 'live' : 'test'
}

export function initSaltanaCoreSdk ({ apiBaseURL, apiKey }) {

    console.warn(apiBaseURL)
    const saltanaCore = createInstance({ apiKey, apiVersion })

    if (apiBaseURL) {
        const parsedUrl = new URL(apiBaseURL)

        const host = parsedUrl.hostname
        const port = parsedUrl.port
        const protocol = parsedUrl.protocol.slice(0, -1)

        saltanaCore.setHost(host, port, protocol)
        console.log(host, port, protocol)
    }

    return saltanaCore
}
