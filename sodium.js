var sodium = require('sodium-prebuilt').api
var crypto = require('crypto')

exports.key = function () {
  return crypto.randomBytes(32)
}

exports.nonce = function () {
  return crypto.randomBytes(24)
}

exports.encrypt = function (msg, nonce, key) {
  return sodium.crypto_secretbox_easy(msg, nonce, key)
}

exports.decrypt = function (msg, nonce, key) {
  return sodium.crypto_secretbox_open_easy(msg, nonce, key) || null
}

exports.scalarMultiplication = function (secretKey, otherPublicKey) {
  return sodium.crypto_scalarmult(secretKey, otherPublicKey)
}

exports.scalarMultiplicationKeyPair = function (secretKey) {
  if (!secretKey) secretKey = crypto.randomBytes(32)
  return {
    secretKey: secretKey,
    publicKey: sodium.crypto_scalarmult_base(secretKey)
  }
}
