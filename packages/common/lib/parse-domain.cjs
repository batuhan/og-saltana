import { parseDomain, fromUrl } from 'parse-domain'

const { subDomains, domain, topLevelDomains } = parseDomain(
  fromUrl('https://www.münchen.de?query')
)

console.log(subDomains) // ["www"]
console.log(domain) // "xn--mnchen-3ya"
console.log(topLevelDomains) // ["de"]

// You can use the 'punycode' NPM package to decode the domain again
import { toUnicode } from 'punycode'

console.log(toUnicode(domain)) // "münchen"

export async function parseMainHost(url) {}
