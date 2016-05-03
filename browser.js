var tweetnacl = require('tweetnacl')

exports.key = function () {
  return Buffer(tweetnacl.randomBytes(tweetnacl.lowlevel.crypto_secretbox_KEYBYTES))
}

exports.nonce = function () {
  return Buffer(tweetnacl.randomBytes(tweetnacl.lowlevel.crypto_box_NONCEBYTES))
}

exports.encrypt = function (msg, nonce, key) {
  return Buffer(tweetnacl.secretbox(msg, nonce, key))
}

exports.decrypt = function (msg, nonce, key) {
  var val = tweetnacl.secretbox.open(msg, nonce, key)
  return val ? Buffer(val) : null
}

exports.scalarMultiplication = function (secretKey, otherPublicKey) {
  return Buffer(tweetnacl.scalarMult(secretKey, otherPublicKey))
}

exports.scalarMultiplicationKeyPair = function (secretKey) {
  if (!secretKey) secretKey = Buffer(tweetnacl.randomBytes(tweetnacl.lowlevel.crypto_scalarmult_SCALARBYTES))
  return {
    secretKey: secretKey,
    publicKey: Buffer(tweetnacl.scalarMult.base(secretKey))
  }
}
