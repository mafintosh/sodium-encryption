var sodium = require('sodium-prebuilt').api
var crypto = require('crypto')

exports.KEY_LENGTH = 32
exports.NONCE_LENGTH = 32

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
