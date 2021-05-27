/* Stelace Search Filter DSL parser

Powerful filter expressions for complex yet flexible and dynamic search.
Can be combined with fuzzy text queries and availability depending on asset type and transaction process.
Please refer to search service.

This parser turns

`options['tinted-glass', gps, AC, 'ignored AND OR keywords'] > 1 AND (make == 'ford' OR NOT (_price >= 23))`

into actionnable ElasticSearch query object

{
  "bool": {
    "must": [
      {
        "bool": {
          "should": [
            {
              "term": {
                "customAttributes.options": "tinted-glass"
              }
            },
            {
              "term": {
                "customAttributes.options": "gps"
              }
            },
            {
              "term": {
                "customAttributes.options": "AC"
              }
            },
            {
              "term": {
                "customAttributes.options": "ignored AND OR keywords"
              }
            }
          ],
          "minimum_should_match": 2
        }
      },
      {
        "bool": {
          "should": [
            {
              "term": {
                "customAttributes.make.keyword": "ford"
              }
            },
            {
              "range": {
                "price": {
                  "lt": "23"
                }
              }
            }
          ]
        }
      }
    ]
  }
}


You can play with this here: https://pegjs.org/online
Copy paste code, uncomment options object below and try with example filter query.

The returned object may put some flattening to use if DSL string chains several AND or several ORs together, as they get splitted into several binary bools.
This bool query must be wrapped in filter context to leverage caching and avoid useless scoring:

"filter": [
  {
    "bool": {
      "must": [{…},{…}],
      "must_not": {…}
    }
  },
  {…},
  …
]

cf. https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html

*/

{
  /*  // Example of options object injected dynamically by search service before each parsing
  options = {
    booleanAttributes: ['validated', 'active', 'lodged'],
    textListAttributes: ['options'],
    shortTextAttributes: ['make'], // 'short': we can’t match above ignore_above chars, set in elasticsearch.js
    numberAttributes: ['_price'],
    builtIns: ['_price', '_categoryId', '_assetType']
  }
  */

  const numberOperators = {
    '<': 'lt',
    '<=': 'lte',
    '>=': 'gte',
    '>': 'gt'
  }
  const numberOperatorsInverted = {
    'lt': 'gte',
    'lte': 'gt',
    'gte': 'lt',
    'gt': 'lte'
  }

  const negate = function (object) {
    if (object !== Object(object)) throw new Error('Only parsed sentences can be negated.')

    const bool = object.bool || {}
    let newBool = {}

    if (Number.isFinite(bool.minimum_should_match)) { // negating whole listSentence
      return { bool: { must_not: object } }
    }

    if (Object.keys(bool).length > 1) throw new Error('Boolean objects must have a unique key.')

    // We should have only one of these
    if (bool.should) {
      newBool.must = bool.should.map(item => negate(item))
    } else if (Array.isArray(bool.must)) {
      newBool.should = bool.must.map(item => negate(item))
    } else if (bool.must) {
      newBool.must_not = bool.must
    } else if (Array.isArray(bool.must_not)) {
      newBool.should = bool.must_not
    } else if (bool.must_not) {
      newBool.must = bool.must_not
    } else if (object.range) {
      const property = Object.keys(object.range)[0]
      const newRange = {}
      newRange[property] = {}

      const oldPropertyRange = object.range[property]
      const operatorToInvert = Object.keys(oldPropertyRange)[0]

      newRange[property][numberOperatorsInverted[operatorToInvert]] = object.range[property][operatorToInvert]

      return { range: newRange }
    } else { // term(s)
      newBool = { must_not: object }
    }

    return { bool: newBool }
  }

  const didYouMeanBuiltIn = function (name) {
    return options.builtIns.includes(`_${name}`) ? `Did you mean Stelace built-in "_${name}"?` : ''
  }

  const removeBuiltInEscape = function (name) {
    if (name.charAt(0) === '_' && !options.keepBuiltInEscapeFor.includes(name)) {
      return name.slice(1) // charAt faster than RegExp
    }
    return name
  }
}

start
  = sentence

sentence
  = orSentence

// Let’s imagine A OR B AND C, with A B and C being rangeSentence, listSentence or termSentence
orSentence
  // No quote since variables can’t have special chars
  = !quote lhs:andSentence __ OR __ rhs:orSentence { return { bool: { should: [lhs, rhs] } } }
  / andSentence

// AND operator has higher precedence than OR
// So B AND C is considered first by orSentence above, (B AND C) being rhs:orSentence
// On second pass, B is then lhs:andSentence and C rhs:orSentence

andSentence
  // No quote since variables can’t have special chars
  = !quote lhs:primarySentence __ AND __ rhs:andSentence { return { bool: { must: [lhs, rhs] } } }
  / primarySentence

// NOT (or !) operator must apply to expression in parentheses like !(expr && expr2) to avoid ambiguity
// and has higher precedence than OR & AND

primarySentence 'NOT operator, parentheses or any relational expression using <, <=, ==, >=, >, != and [] valid operators'
  = NOT _'(' _ sentence:sentence _ ')' { return negate(sentence) }
  / '(' _ sentence:sentence _ ')' { return sentence }
  / rangeSentence

// Number operators have higher precedence than OR, AND & NOT
rangeSentence 'Number relational expression using <, <= , >= or >'
  = attr:operand _ op:(lowerOrGreater) _ value:operand {
    // Could use numberOperand rather than operand but we couldn’t throw precise errors, as below
    const rangeObject = {}
    const isBuiltIn = options.builtIns.includes(attr)
    const field = isBuiltIn ? removeBuiltInEscape(attr) : `customAttributes.${attr}`
    const numberOperand = parseFloat(value)

    if (!options.numberAttributes.includes(attr)) {
      throw new SyntaxError(`Number attribute expected when using "${op}": ${attr} is not a number. ${
        didYouMeanBuiltIn(attr)
      }`)
    }

    if (!Number.isFinite(numberOperand)) {
      throw new SyntaxError(`Number value expected when using "${op}": ${value} is not a number.`)
    }

    rangeObject[field] = {}
    rangeObject[field][numberOperators[op]] = value

    return { range: rangeObject }
  }
  / listSentence

listSentence 'List of attribute[text, values]'
  = attr:operand terms:('[' _ operand _ (',' _ operand)* _ ']' ) matches:(_ (catchAllRelationalOperators) _ operand)? {
    // Could use numberOperand rather than operand above but we would fail catching errors when
    // string or identifier was given instead of number, after valid operator

    // Same for (EQUAL / lowerOrGreater) replaced by catchAllRelationalOperators
    // to return helpful error message

    const validTextListAttribute = options.textListAttributes.includes(attr) ||
      options.selectAttributes.includes(attr)

    if (!validTextListAttribute) {
      throw new SyntaxError(`Text list can only be used with select and tags custom attribute types but found '${
        attr
      }'. ${
        didYouMeanBuiltIn(attr)
      }`)
    }

    // const termsSetObject = {}
    const termsObject = {}
    const allowedOperators = ['!=', '<', '<=', '=', '==', '>=', '>']
    const op = matches && matches[1] || ''
    const isBuiltIn = options.builtIns.includes(attr)
    const rawValue = matches && matches[3]
    const value = parseFloat(rawValue)
    let matchAtLeast = 1

    if (op) {
      if (!allowedOperators.includes(op)) {
        throw new SyntaxError(`Invalid operator "${op}" in text list "${
          attr
        }[…, …] ${op} ${rawValue}" match statement. Operator is expected to be one of the following: ${
          allowedOperators.join(', ')
        }`)
      }
      if (!Number.isFinite(value) || value < 0) {
        throw new SyntaxError(`A positive number is expected after "${
            attr
          }[…, …] ${op}" match statement, found ${rawValue}`
        )
      }

      // value must be 1 at least to make sense if op is '>=', 0 if using '>'
      matchAtLeast = value + (op === '>')
      // And minimum_should_match (integer) >= 1 if using >(=): it’s what ElasticSearch does anyway
      matchAtLeast = op.startsWith('>') ? Math.max(matchAtLeast, 1) : matchAtLeast

      matchAtLeast = Math.floor(matchAtLeast)

      // Four equivalent booleans: (select[a,b,c] <= 0) <=> …
      // (select[a,b,c] < 1) <=> NOT (select[a,b,c] > 0) <=> NOT (select[a,b,c] >= 1)
    }

    const termField = isBuiltIn ? removeBuiltInEscape(attr) : `customAttributes.${attr}`

    const termObjectsArray = [{
        term: { [termField]: terms[2] }
      }]
      .concat(terms[4].map(function(commaOperand) {
        const operand = commaOperand[2]
        if (typeof operand === 'string') return { term: { [termField]: operand } }
        else throw new SyntaxError('Text values are expected as [list, elements].')
      }, []))

    const listBool = (matches) => ({
      bool: {
        should: termObjectsArray,
        minimum_should_match: matches
      }
    })

    const listBoolExact = (matches) => ({
      bool: {
        // ElasticSearch excludes results without match even when minimum_should_match == 0
        // so we don’t need two booleans in this case, but just !(matches>=1)
        must: matches === 0 ? negate(listBool(1)) : [
          listBool(matches),
          negate(listBool(matches + 1))
        ]
      }
    })

    if (['!=', '=', '=='].includes(op)) {
      return op.startsWith('!') ? negate(listBoolExact(matchAtLeast)) : listBoolExact(matchAtLeast)
    }

    return op.startsWith('<') ? negate(listBool(matchAtLeast)) : listBool(matchAtLeast)

    /*
    const termsArray = [terms[2]].concat(terms[4].reduce(function(result, element) {
      const operand = element[2]
      if (typeof operand === 'string' && /[[]\s]/.test(operand)) {
        return result // Can’t remember for sure why I used this rule, commit it just in case :)
        // Was probably for nested arrays we should not need.
      } else if (typeof operand === 'string') {
        return result.concat([operand])
      } else {
        throw new SyntaxError('Text values are expected as [list, elements].')
      }
    }, []))

    // ES terms_set is nice but we have to use either a fixed doc value or a script
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-set-query.html
    // Script can have an impact on perf so we use a plain bool.should

    termsSetObject[`customAttributes.${attr}`] = {
      terms: termsArray,
      minimum_should_match_script: {
          source: `${matchAtLeast}`
      }
    }
    return { terms_set: termsSetObject }
    */
  }
  / termSentence


termSentence 'Equality or inequality expression using != or =='
  = attr:operand _ op:(EQUAL / NOT_EQUAL) _ rhs:operand {
  const termObject = {}

  const isBuiltIn = options.builtIns.includes(attr)
  let name = isBuiltIn ? removeBuiltInEscape(attr) : attr
  const addElasticSearchKeyword = options.shortTextAttributes.includes(attr)
  const termField = `${
    isBuiltIn ? '' : 'customAttributes.'
  }${name}${
    addElasticSearchKeyword ? '.keyword' : ''
  }`

  if ( // builtIns have trailing _ in these arrays so use raw attr
    !options.shortTextAttributes.includes(attr) &&
    !options.numberAttributes.includes(attr) &&
    !options.booleanAttributes.includes(attr) &&
    !options.selectAttributes.includes(attr)
  ) {
    throw new SyntaxError(
      `Text, select, boolean or number custom attribute expected when using equality operator but found '${
        attr
      }'. ${
        didYouMeanBuiltIn(attr)
      }`)
  }

  // Note that ElasticSearch casts this string to appropriate number type if needed,
  // so we don’t need to check if lhs is a number custom attribute name
  // All the better since we don’t know if it’s a float or an integer right here
  if (options.booleanAttributes.includes(attr)) {
    if (!['true', 'false'].includes(rhs)) throw new SyntaxError(`${attr} boolean can only be true or false.`)
    termObject[termField] = rhs === 'true'
  } else {
    termObject[termField] = rhs
  }
  return op[0] === '!' ? negate({ term: termObject }) : { term: termObject }
  }
  / booleanShorthand
  / operand // unreachable: SyntaxError thrown in booleanShorthand

booleanShorthand
  = _ negation:NOT? _ attr:operand { // only situation allowing missing parentheses after NOT operator
    const errMsg = `${attr} is not a boolean. Please use an operator instead of shorthand expression.`
    const isBuiltIn = options.builtIns.includes(attr)
    const name = isBuiltIn ? removeBuiltInEscape(attr) : attr

    if (options.booleanAttributes.includes(attr)) return { term: { [name]: !negation } }
    else throw new SyntaxError(errMsg)
  }

operand 'operand using only [a-z0-9_-.] chars if not delimited by quotes'
  = quote operand:(quotedAttributeChar+) quote { return operand.join('') }
  / operand:([a-z0-9_\.-]i+) { return operand.join('') }
  // allowing dot for floats, but should be forbidden in custom attributes names by dedicated service

numberOperand 'number'
  = operand:([0-9]+[\.]?[0-9]*) { // allow float
      // operand is like [ [ '3', '1' ], null, [] ] to turn into 31
      return parseFloat(operand.reduce((flat, el) => flat.concat(el)).join(''))
    }
  // can’t use * for first digits as it is greedy and would skip dot. Anyway parseFloat('1.') === 1

_ 'optional white space'
  = whiteSpace *

__ 'mandatory white space'
  = whiteSpace +

whiteSpace 'white space'
  = [ \t\n\r]+

quote 'quote'
  = [\"\'] // escaping for syntax highlighting

quotedAttributeChar 'quoted string value'
  = [^\"\']i

lowerOrGreater 'relational operator <, <= , >=, >'
  = operator:([><]'='?) { return operator.join('') }

greaterOrEqual 'Equality or greater than operator ==, >=, >'
  = operator:([>=]'='?) { return operator.join('')}

catchAllRelationalOperators 'any relational operator'
  = operator:([><=!]+) { return operator.join('') }

// Relax JavaScript syntax here and allow '='
EQUAL 'equality operator =='
  = ('==' / '=')

NOT_EQUAL 'inequality operator !='
  = ('!=')

OR 'OR operator'
  = ('OR'/'||')

AND 'AND operator'
  = ('AND'/'&&')

// NOT/! operator must apply to expression in parentheses like !(expr && expr2) to avoid ambiguity

NOT 'NOT operator'
 = ('NOT'/'!')
