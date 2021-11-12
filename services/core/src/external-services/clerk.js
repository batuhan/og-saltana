const pkg = require('@clerk/clerk-sdk-node')
const JwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')

const clerk = pkg.default

const jwksClient = JwksClient({
  jwksUri: process.env.CLERK_JWKS_LINK,
})

function getKey(header, callback) {
  jwksClient.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(err, signingKey)
  })
}

module.exports.verifyTokenSync = function (token, cb) {
  return jwt.verify(token, getKey, cb)
}

module.exports.verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, function (err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports.getUser = (userId) => clerk.users.getUser(userId)

module.exports.clerk = clerk
