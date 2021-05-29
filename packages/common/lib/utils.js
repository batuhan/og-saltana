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
