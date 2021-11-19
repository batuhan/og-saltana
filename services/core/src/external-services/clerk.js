const pkg = require('@clerk/clerk-sdk-node')
const JwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

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

function verifyToken(token) {
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

function getUser(userId) {
  return clerk.users.getUser(userId)
}

const fieldMap = {
  // clerkField: internalUserField
  username: 'username',
  primaryEmailAddress: 'email',
  firstName: 'firstname',
  lastName: 'lastname',
  birthday: 'metadata._private.birthday',
  gender: 'metadata._private.gender',
  profileImageUrl: 'instant.avatarUrl',
  id: 'metadata._private.clerk.userId',
  passwordEnabled: 'metadata._private.clerk.passwordEnabled',
  twoFactorEnabled: 'metadata._private.clerk.twoFactorEnabled',
  publicMetadata: 'metadata._private.clerk.publicMetadata',
  privateMetadata: 'platformData._private.clerk.privateMetadata',
}

// Diffs Clerk user and internal user, clerk data always wins
// returns an internal user object with changed values
function diffClerkUserAndInternalUser(clerkUser, internalUser = {}) {
  const updatesToInternalUser = {}

  Object.keys(fieldMap).forEach((clerkFieldName) => {
    const internalUserFieldName = fieldMap[clerkFieldName]

    if (
      _.isEqual(
        _.get(clerkUser, clerkFieldName),
        _.get(internalUser, internalUserFieldName),
      ) == false
    ) {
      _.set(
        updatesToInternalUser,
        internalUserFieldName,
        _.get(clerkUser, clerkFieldName),
      )
    }
  })

  return internalUserData
}

module.exports = {
  verifyToken,
  getUser,
  diffClerkUserAndInternalUser,
}
