require('dotenv').config()

const test = require('ava')
const request = require('supertest')
const path = require('path')

// Loading current plugin manually _before_ loading server to run tests
const { loadPlugin } = require('stelace-server/plugins')
loadPlugin(path.resolve(__dirname, '..'))

const {
  testTools: {
    lifecycle,
    auth,
    fixtures: { search: searchFixtures }
  },
  utils: {
    time: { computeDate }
  }
} = require('stelace-server')

const { before, beforeEach, after } = lifecycle
const { getAccessTokenHeaders } = auth
const { initElasticsearch, fixturesParams, isElasticsearchReady } = searchFixtures

let initNow
const savedSearchIds = {}
const {
  ownerId,
  assetsIds,
  basePrice,
  lowSeatingCapacity,
  uniqueSeatingCapacity,
} = fixturesParams

test.before(async (t) => {
  await before({ name: 'filterParser' })(t)
  // await new Promise(resolve => setTimeout(resolve, 20000))
  await isElasticsearchReady({
    platformId: t.context.platformId,
    env: t.context.env,
  })
  await beforeEach()(t)

  initNow = await initElasticsearch({ t })

  const authorizationHeaders = await getAccessTokenHeaders({
    t,
    permissions: ['savedSearch:create:all'],
    userId: ownerId
  })

  const { body: savedSearch1 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      name: 'Saved search with filter DSL',
      // match assets 6 and 8
      filter: 'options["sunroof", "gps", "convertible"]',
      createdBefore: computeDate(initNow, '1h'),
      createdAfter: computeDate(initNow, '-1h'),
      save: true
    })
    .expect(200)

  savedSearchIds.savedSearch1 = savedSearch1.id
})
test.after(after())

// search.spec.js tests are prefixed with `[DSL] ` in this test suite
// and include assertions with and without `filter:`

test('[DSL] returns assets in specified categories', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: search } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      categoryId: 'ctgy_ejQQps1I3a1gJYz2I3a'
    })
    .expect(200)

  t.is(search.results.length, 1)
  t.true(search.results.every(a => a.id === assetsIds.asset6))

  const { body: search2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      categoryId: ['ctgy_ejQQps1I3a1gJYz2I3a', 'ctgy_N1FQps1I3a1gJYz2I3a']
    })
    .expect(200)

  t.is(search2.results.length, 2)
  t.true(search2.results.some(a => a.id === assetsIds.asset6))
  t.true(search2.results.some(a => a.id === assetsIds.asset7))

  const { body: filterSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      categoryId: 'ctgy_ejQQps1I3a1gJYz2I3a',
      filter: '_categoryId["ctgy_N1FQps1I3a1gJYz2I3a"]' // Overrides categoryId
    })
    .expect(200)

  t.is(filterSearch.results.length, 1)
  t.true(filterSearch.results.every(a => a.id === assetsIds.asset7))
})

test('[DSL] returns only assets with the specified asset types', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: legacySearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      assetTypeId: ['typ_RFpfQps1I3a1gJYz2I3a']
    })
    .expect(200)

  t.true(legacySearch.results.length === 2)
  t.truthy(legacySearch.results.find(asset => assetsIds.asset1 === asset.id))
  t.truthy(legacySearch.results.find(asset => assetsIds.asset3 === asset.id))

  const { body: filterDSLSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: '_assetTypeId = "typ_RFpfQps1I3a1gJYz2I3a"'
    })
    .expect(200)

  t.true(filterDSLSearch.results.length === 2)
  t.truthy(filterDSLSearch.results.find(asset => assetsIds.asset1 === asset.id))
  t.truthy(filterDSLSearch.results.find(asset => assetsIds.asset3 === asset.id))

  const { body: filterDSLOverrideSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      assetTypeId: ['typ_MGsfQps1I3a1gJYz2I3a'],
      filter: '_assetTypeId[typ_RFpfQps1I3a1gJYz2I3a]' // Overrides
    })
    .expect(200)

  t.true(filterDSLOverrideSearch.results.length === 2)
  t.truthy(filterDSLOverrideSearch.results.find(asset => assetsIds.asset1 === asset.id))
  t.truthy(filterDSLOverrideSearch.results.find(asset => assetsIds.asset3 === asset.id))
})

test('[DSL] filters assets based on active and validated parameters', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: searchResults } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      validated: true
      // active is true by default
    })
    .expect(200)

  t.falsy(searchResults.results.find(asset => assetsIds.asset9 === asset.id))

  const { body: filterDSLSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: '_validated == true'
      // active is true by default
    })
    .expect(200)

  t.falsy(filterDSLSearch.results.find(asset => assetsIds.asset9 === asset.id))
  t.true(filterDSLSearch.results.every(asset => asset.validated))

  const { body: filterDSLSearchShorthand } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: '_validated' // boolean shorthand
    })
    .expect(200)

  t.falsy(filterDSLSearchShorthand.results.find(asset => assetsIds.asset9 === asset.id))
  t.true(filterDSLSearchShorthand.results.every(asset => asset.validated))

  const { body: filterDSLSearchShorthand2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: '!_active'
    })
    .expect(200)

  t.truthy(filterDSLSearchShorthand2.results.length)
  t.true(filterDSLSearchShorthand2.results.every(asset => !asset.active))

  const { body: searchResults2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      validated: true,
      active: false
    })
    .expect(200)

  t.true(searchResults2.results.length === 1)
  t.truthy(searchResults2.results.find(asset => assetsIds.asset9 === asset.id))

  const { body: filterDSLSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: '_validated && !_active' // overrides default `active: true`
    })
    .expect(200)

  t.true(filterDSLSearch2.results.length === 1)
  t.truthy(filterDSLSearch2.results.find(asset => assetsIds.asset9 === asset.id))

  const { body: searchResults3 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      query: 'Ford',
      validated: true,
      active: false
    })
    .expect(200)

  t.true(searchResults3.results.length === 0)

  const { body: filterDSLSearch3 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      query: 'Ford',
      filter: '(_validated=true) AND NOT _active' // useless parentheses
    })
    .expect(200)

  t.true(filterDSLSearch3.results.length === 0)

  const { body: searchResults4 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ // active filter is disabled
      active: null
    })
    .expect(200)

  t.is(searchResults4.results.length, Object.keys(assetsIds).length - 1) // 1 asset removed before tests
  t.truthy(searchResults4.results.find(asset => asset.active === true))
  t.truthy(searchResults4.results.find(asset => asset.active === false))
  t.truthy(searchResults4.results.find(asset => asset.validated === true))

  const { body: filterDSLSearch4 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      active: null, // active filter is disabled…
      filter: 'NOT(NOT(_active=false))' // and enabled
    })
    .expect(200)

  t.true(filterDSLSearch4.results.length === 1)
  t.truthy(filterDSLSearch4.results.find(asset => assetsIds.asset9 === asset.id))
})

test('[DSL] returns assets with queried custom attributes (strict equality)', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: searchResult1 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        seatingCapacity: uniqueSeatingCapacity
      }
    })
    .expect(200)

  t.true(searchResult1.results.length === 1)
  t.truthy(searchResult1.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch1 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `seatingCapacity = ${uniqueSeatingCapacity}` // also tests than unique equal sign works
    })
    .expect(200)

  t.true(filterDSLSearch1.results.length === 1)
  t.truthy(filterDSLSearch1.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: searchResult2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        automaticTransmission: false
      }
    })
    .expect(200)

  t.true(searchResult2.results.length === 2)
  t.truthy(searchResult2.results.find(asset => assetsIds.asset7 === asset.id))
  t.truthy(searchResult2.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'automaticTransmission == false'
    })
    .expect(200)

  t.true(filterDSLSearch2.results.length === 2)
  t.truthy(filterDSLSearch2.results.find(asset => assetsIds.asset7 === asset.id))
  t.truthy(filterDSLSearch2.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: searchResult3 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        make: 'Chevrolet'
      }
    })
    .expect(200)

  t.true(searchResult3.results.length === 1)
  t.truthy(searchResult3.results.find(asset => assetsIds.asset7 === asset.id))

  const { body: filterDSLSearch3 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'make == Chevrolet'
    })
    .expect(200)

  t.true(filterDSLSearch3.results.length === 1)
  t.truthy(filterDSLSearch3.results.find(asset => assetsIds.asset7 === asset.id))
})

test('[DSL] returns assets with queried custom attributes (range for numbers)', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: { results: searchResults } } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        seatingCapacity: {
          gt: lowSeatingCapacity
        }
      }
    })
    .expect(200)

  let hasOnlyAssetsWithHigherCapacity = searchResults.reduce((has, asset) => {
    return has && asset.customAttributes.seatingCapacity > lowSeatingCapacity
  }, true)

  t.is(hasOnlyAssetsWithHigherCapacity, true)

  const { body: { results: filterDSLResults } } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `seatingCapacity > ${lowSeatingCapacity}`
    })
    .expect(200)

  hasOnlyAssetsWithHigherCapacity = filterDSLResults.reduce((has, asset) => {
    return has && asset.customAttributes.seatingCapacity > lowSeatingCapacity
  }, true)

  t.is(hasOnlyAssetsWithHigherCapacity, true)

  const { body: { results: searchResults2 } } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        seatingCapacity: {
          gte: uniqueSeatingCapacity,
          lt: uniqueSeatingCapacity + 1
        }
      }
    })
    .expect(200)

  t.true(searchResults2.length === 1)
  t.truthy(searchResults2.find(asset => assetsIds.asset8 === asset.id))

  const { body: { results: filterDSLResults2 } } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `seatingCapacity >= ${
        uniqueSeatingCapacity
      } && seatingCapacity < ${uniqueSeatingCapacity + 1}`
    })
    .expect(200)

  t.true(filterDSLResults2.length === 1)
  t.truthy(filterDSLResults2.find(asset => assetsIds.asset8 === asset.id))

  const { body: { results: mixedSyntaxSearch } } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ // using both filter and customAttributes queries implies AND in ElasticSearch `filter` query
      filter: `seatingCapacity >= ${uniqueSeatingCapacity}`,
      customAttributes: {
        seatingCapacity: {
          lt: uniqueSeatingCapacity + 1
        }
      }
    })
    .expect(200)

  t.true(mixedSyntaxSearch.length === 1)
  t.truthy(mixedSyntaxSearch.find(asset => assetsIds.asset8 === asset.id))
})

test('[DSL] returns assets with queried custom attributes of several types', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: searchResult } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        seatingCapacity: uniqueSeatingCapacity,
        automaticTransmission: false
      }
    })
    .expect(200)

  t.true(searchResult.results.length === 1)
  t.truthy(searchResult.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `seatingCapacity = ${uniqueSeatingCapacity} && automaticTransmission = false`
    })
    .expect(200)

  t.true(filterDSLSearch.results.length === 1)
  t.truthy(filterDSLSearch.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: mixedQuerySearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ // filter and customAttributes always implicitly joined with AND
      // User must use only filter to apply OR logic
      filter: `seatingCapacity = ${uniqueSeatingCapacity}`,
      customAttributes: {
        automaticTransmission: false
      }
    })
    .expect(200)

  t.true(mixedQuerySearch.results.length === 1)
  t.truthy(mixedQuerySearch.results.find(asset => assetsIds.asset8 === asset.id))
})

test('[DSL] returns assets with queried custom attribute of "tags" type (one element match)', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: legacySearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        options: 'sunroof'
      }
    })
    .expect(200)

  t.true(legacySearch.results.length === 2)
  t.truthy(legacySearch.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(legacySearch.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options[sunroof]' // can skip quotes since there are no white space or special chars
    })
    .expect(200)

  t.true(filterDSLSearch.results.length === 2)
  t.truthy(filterDSLSearch.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(filterDSLSearch.results.find(asset => assetsIds.asset8 === asset.id))
})

test('[DSL] returns assets with queried custom attribute of "select" type (match one of provided elements)', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: legacySearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        make: ['Toyota', 'Chevrolet']
      }
    })
    .expect(200)

  t.true(legacySearch.results.length === 3)
  t.truthy(legacySearch.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(legacySearch.results.find(asset => assetsIds.asset7 === asset.id))
  t.truthy(legacySearch.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'make[Toyota,Chevrolet]' // omit quotes and space
    })
    .expect(200)

  t.true(filterDSLSearch.results.length === 3)
  t.truthy(filterDSLSearch.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(filterDSLSearch.results.find(asset => assetsIds.asset7 === asset.id))
  t.truthy(filterDSLSearch.results.find(asset => assetsIds.asset8 === asset.id))
})

test('[DSL] returns assets with queried custom attribute of "tags" type (match all, some or exact number of elements)', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: legacySearch1 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        options: ['sunroof', 'gps']
      }
    })
    .expect(200)

  t.true(legacySearch1.results.length === 1)
  t.truthy(legacySearch1.results.find(asset => assetsIds.asset6 === asset.id))

  const { body: filterDSLSearch1 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof", "gps"] = 2' // could use '==' or '>=' too
    })
    .expect(200)

  t.true(filterDSLSearch1.results.length === 1)
  t.truthy(filterDSLSearch1.results.find(asset => assetsIds.asset6 === asset.id))

  const { body: filterDSLSearch1a } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof", "gps"]>=2' // can omit space
    })
    .expect(200)

  t.true(filterDSLSearch1a.results.length === 1)
  t.truthy(filterDSLSearch1a.results.find(asset => assetsIds.asset6 === asset.id))

  const { body: filterDSLSearch1b } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof", "gps"] > 1.5' // can use '>' and/or float (cast to floor integer internally)
    })
    .expect(200)

  t.true(filterDSLSearch1b.results.length === 1)
  t.truthy(filterDSLSearch1b.results.find(asset => assetsIds.asset6 === asset.id))

  const { body: searchResult2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        options: ['sunroof']
      }
    })
    .expect(200)

  t.true(searchResult2.results.length === 2)
  t.truthy(searchResult2.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(searchResult2.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof"]'
    })
    .expect(200)

  t.true(filterDSLSearch2.results.length === 2)
  t.truthy(filterDSLSearch2.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(filterDSLSearch2.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch4 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof", "gps", "convertible"] == 2'
    })
    .expect(200)

  // only one asset matches "sunroof" and "gps" but it has "convertible" too
  t.true(filterDSLSearch4.results.length === 0)

  const { body: filterDSLSearch4a } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof", "gps", "convertible"] >= 3' // could use '== 3' or '> 2 too
    })
    .expect(200)

  t.true(filterDSLSearch4a.results.length === 1)
  t.truthy(filterDSLSearch4a.results.find(asset => assetsIds.asset6 === asset.id))

  const { body: filterDSLSearch4b } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof", "gps", "convertible"]' // implicit '>= 1'
    })
    .expect(200)

  t.true(filterDSLSearch4b.results.length === 2)
  t.truthy(filterDSLSearch4b.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(filterDSLSearch4b.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch4c } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof", "gps", "convertible"] >= 1'
    })
    .expect(200)

  t.true(filterDSLSearch4c.results.length === 2)
  t.truthy(filterDSLSearch4c.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(filterDSLSearch4c.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: filterDSLSearch4d } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'options["sunroof", "gps", "convertible"] < 3'
    })
    .expect(200)

  t.true(filterDSLSearch4d.results.length > 2)
  t.falsy(filterDSLSearch4d.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(filterDSLSearch4d.results.find(asset => assetsIds.asset8 === asset.id))
  t.truthy(filterDSLSearch4d.results.find(asset => assetsIds.asset1 === asset.id))
})

test('[DSL] returns assets with queried custom attributes (match an exact text)', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: searchResult1 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      customAttributes: {
        licensePlate: '123456789'
      }
    })
    .expect(200)

  t.true(searchResult1.results.length === 1)
  t.truthy(searchResult1.results.find(asset => assetsIds.asset6 === asset.id))

  const { body: filterDSLSearch1 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'licensePlate == "123456789"'
    })
    .expect(200)

  t.true(filterDSLSearch1.results.length === 1)
  t.truthy(filterDSLSearch1.results.find(asset => assetsIds.asset6 === asset.id))

  const { body: filterDSLSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'licensePlate == 123456789' // parsed as a string
    })
    .expect(200)

  t.true(filterDSLSearch2.results.length === 1)
  t.truthy(filterDSLSearch2.results.find(asset => assetsIds.asset6 === asset.id))
})

test('[DSL-only] returns assets that match exact price query', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: priceSearch1 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `_price == ${basePrice}`,
      quantity: 2
    })
    .expect(200)

  t.true(priceSearch1.results.length === 1)
  t.truthy(priceSearch1.results.find(asset => assetsIds.asset5 === asset.id))

  const { body: priceSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `_price == "${basePrice}"`,
      // Note that parser casts to String anyway
      // and ElasticSearch back to internal number type (float, int…)
      quantity: 2
    })
    .expect(200)

  t.true(priceSearch2.results.length === 1)
  t.truthy(priceSearch2.results.find(asset => assetsIds.asset5 === asset.id))

  const { body: priceSearch3 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `_price == ${Number.isInteger(basePrice) ? basePrice + '.' : basePrice}`,
      // just check that floats are handled appropriately
      quantity: 2
    })
    .expect(200)

  t.true(priceSearch3.results.length === 1)
  t.truthy(priceSearch3.results.find(asset => assetsIds.asset5 === asset.id))

  const { body: priceSearch4 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: '_price == 9999909'
    })
    .expect(200)

  t.true(priceSearch4.results.length === 0)
})

test('[DSL-only] returns assets that match price range query', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: priceSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      query: 'Chevrolet',
      filter: `_price > ${basePrice - 1}`
    })
    .expect(200)

  t.truthy(priceSearch.results.find(asset => assetsIds.asset5 === asset.id))

  const { body: priceSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `_price < ${basePrice}`
    })
    .expect(200)

  t.falsy(priceSearch2.results.find(asset => assetsIds.asset5 === asset.id))
})

test('[DSL-only] returns assets that match complex filter using built-ins', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: complexSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `(_price >= ${basePrice + 7} || _price < ${// useless price filter on purpose
        basePrice + 8
      }) && _name="大車" && _assetTypeId=typ_MnkfQps1I3a1gJYz2I3a` // 'Big car' in Chinese
    })
    .expect(200)

  t.true(complexSearch.results.length === 1)
  t.truthy(complexSearch.results.find(asset => assetsIds.asset13 === asset.id))

  const { body: complexSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `_price >= ${basePrice} && _assetTypeId['typ_MnkfQps1I3a1gJYz2I3a']` +
        ' && _ownerId == "usr_Y0tfQps1I3a1gJYz2I3a"' // This makes the match unique
    })
    .expect(200)

  t.true(complexSearch2.results.length === 1)
  t.truthy(complexSearch2.results.find(asset => assetsIds.asset13 === asset.id))
})

test('[DSL-only] returns assets that match complex filter with top level negation', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: topLevelNot } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      active: null, // considering all assets including inactive ones
      filter: 'NOT (options[sunroof] && automaticTransmission == false)'
    })
    .expect(200)

  // Another asset was removed before tests
  t.is(topLevelNot.results.length, Object.keys(assetsIds).length - 2)
  t.falsy(topLevelNot.results.find(asset => assetsIds.asset8 === asset.id))

  const { body: topLevelNot2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      active: null,
      filter: 'NOT (options[sunroof] || automaticTransmission == false)'
    })
    .expect(200)

  t.true(topLevelNot2.results.length === Object.keys(assetsIds).length - 4)
  t.falsy(topLevelNot2.results.find(asset => assetsIds.asset6 === asset.id))
  t.falsy(topLevelNot2.results.find(asset => assetsIds.asset7 === asset.id))
  t.falsy(topLevelNot2.results.find(asset => assetsIds.asset8 === asset.id))
})

test('[DSL-only] returns assets that match built-in _id filter', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: idSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `_id == ${assetsIds.asset13}`
    })
    .expect(200)

  t.true(idSearch.results.length === 1)
  t.truthy(idSearch.results.find(asset => assetsIds.asset13 === asset.id))

  const { body: idSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `_id[${assetsIds.asset13}, ${assetsIds.asset14}]` // _id is of select type
    })
    .expect(200)

  t.true(idSearch2.results.length === 2)
  t.truthy(idSearch2.results.find(asset => assetsIds.asset13 === asset.id))
  t.truthy(idSearch2.results.find(asset => assetsIds.asset14 === asset.id))
})

test('[DSL-only] trims filter white spaces automatically', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: idSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: ` _id == ${assetsIds.asset13}${' '.repeat(5)}`
    })
    .expect(200)

  t.true(idSearch.results.length === 1)
  t.truthy(idSearch.results.find(asset => assetsIds.asset13 === asset.id))
})

test('[DSL-only] returns assets that match complex filter using several custom attributes types', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: complexSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: `(seatingCapacity=${uniqueSeatingCapacity} || seatingCapacity>${
        lowSeatingCapacity // useless on purpose again
      }) && options[sunroof] && automaticTransmission == false`
    })
    .expect(200)

  t.true(complexSearch.results.length === 1)
  t.truthy(complexSearch.results.find(asset => assetsIds.asset8 === asset.id))
})

test('[DSL-only] doesn’t return assets that match select filter if requiring multiple matches', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: selectFilterSearch } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'make[Toyota, \'Chevrolet\', BMW] == 2'
      // make is a select customAttribute so there can’t be 2 matches
      // And implicit fallbacks could be confusing <= Explicit is better than implicit
    })
    .expect(200)
  // Two makes
  t.falsy(selectFilterSearch.results.find(asset => assetsIds.asset6 === asset.id))
  t.falsy(selectFilterSearch.results.find(asset => assetsIds.asset7 === asset.id))

  const { body: selectFilterSearch2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({
      filter: 'make[Toyota, \'Chevrolet\', BMW] == 1'
      // '== 1 can be omitted' as it’s default for both select and tags (OR)
    })
    .expect(200)

  t.truthy(selectFilterSearch2.results.find(asset => assetsIds.asset6 === asset.id))
  t.truthy(selectFilterSearch2.results.find(asset => assetsIds.asset7 === asset.id))
})

test('[DSL-only] throws appropriate error when using bad filter format', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: booleanError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: '_validated == tru' })
    .expect(400)

  t.true(booleanError.message.includes('boolean')) // of input

  const { body: truncatedError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'make[Toyota, "Chevrolet", BMW] &&' })
    .expect(400)

  t.true(truncatedError.message.includes('end')) // of input
  t.truthy(truncatedError.data.location) // native PEG.js error

  const { body: unknownListAttributeError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'unkn0wn[Toyota, BMW] == 1' })
    .expect(400)

  t.true(unknownListAttributeError.message.includes('select'))
  t.true(unknownListAttributeError.message.includes('tags'))
  t.true(unknownListAttributeError.message.indexOf('unkn0wn') > -1)
  // t.truthy(unknownListAttributeError.data.location) // custom error without location yet

  const { body: invalidListMatchValueError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'make[Toyota, BMW] === 1' }) // should use '=' or '=='
    .expect(400)

  t.true(invalidListMatchValueError.message.indexOf('"==="') > -1)
  t.regex(invalidListMatchValueError.message, /operator/i)

  const { body: invalidListMatchOperatorError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'make[Toyota, BMW] == xyz' })
    .expect(400)

  t.regex(invalidListMatchOperatorError.message, /number/i)
  t.regex(invalidListMatchOperatorError.message, /xyz/)

  const { body: invalidNumberAttrError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'make >= 12' })
    .expect(400)

  t.true(invalidNumberAttrError.message.indexOf('">="') > -1)
  t.true(invalidNumberAttrError.message.indexOf('make') > -1)
  t.regex(invalidNumberAttrError.message, /number/i)

  const { body: invalidNumberValueError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'seatingCapacity < wwf' })
    .expect(400)

  t.true(invalidNumberValueError.message.indexOf('"<"') > -1)
  t.true(invalidNumberValueError.message.indexOf('wwf') > -1)
  t.regex(invalidNumberValueError.message, /number/i)

  const { body: invalidTermError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'unkn0wnAgain = 12' })
    .expect(400)

  t.regex(invalidTermError.message, /number/i)
  t.regex(invalidTermError.message, /text/i)
  t.regex(invalidTermError.message, /select/i)
  t.regex(invalidTermError.message, /boolean/i)
  t.true(invalidTermError.message.indexOf('unkn0wnAgain') > -1)
})

test('[DSL-only] throws validation error when filter query is too long', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: nastyFilter } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: ` ${'price = 10000 && '.repeat(40)} price > 0` })
    .expect(400)

  t.true(nastyFilter.message.includes('length'))
})

test('[DSL-only] returns helpful suggestion when using built-in without leading underscore', async (t) => {
  const authorizationHeaders = await getAccessTokenHeaders({ t, permissions: ['search:list:all'] })

  const { body: missingUnderscoreError } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'assetTypeId[typ_MnkfQps1I3a1gJYz2I3a]' })
    .expect(400)

  t.regex(missingUnderscoreError.message, /[^_]assetTypeId/i)
  t.regex(missingUnderscoreError.message, /did you mean [^_]*_assetTypeId/i) // extends default error message

  const { body: missingUnderscoreError2 } = await request(t.context.serverUrl)
    .post('/search')
    .set(authorizationHeaders)
    .send({ filter: 'price = 10' })
    .expect(400)

  t.regex(missingUnderscoreError2.message, /[^_]price/)
  t.regex(missingUnderscoreError2.message, /did you mean [^_]*_price/i)
})
