import { createInstance } from "@saltana/sdk";

const apiVersion = "2019-05-20";

const MAX_RESULTS_PER_PAGE = 100; // cf. Saltana API reference for pagination details

/**
 * Use this function to fetch all results, it will automatically go through the pagination results
 * @param {Function} fetchFn({ page, nbResultsPerPage, ...params }) - fetch results factory, should return a promise
 * @param {Object} [params]
 * @return {Object[]} allResults
 */
export async function fetchAllResults(fetchFn, params = {}) {
  const nbResultsPerPage = MAX_RESULTS_PER_PAGE;
  let page = 1;
  let allResults = [];
  let results;

  do {
    const passedParameters = { ...params, page, nbResultsPerPage };
    results = await fetchFn(passedParameters);
    page += 1;

    allResults = allResults.concat(results);
  } while (results.paginationMeta.nbPages > results.paginationMeta.page);

  return allResults;
}

export function initSaltanaCoreSdk({ apiKey }) {
  /*
  let apiHost, apiPort, apiProtocol

  const parsedUrl = new URL(
    apiBaseURL || process.env.SALTANA_CORE_API_BASE || 'http://localhost:4100'
  )

  const host = parsedUrl.hostname
  const { port } = parsedUrl
  const protocol = parsedUrl.protocol.slice(0, -1)

  apiHost = host
  apiPort = port
  apiProtocol = protocol
  // saltanaCore.setHost(host, port, protocol)
  */

  const saltanaCore = createInstance({
    apiKey,
    apiVersion,
    //apiHost,
    //apiPort,
    //apiProtocol,
  });

  return saltanaCore;
}
