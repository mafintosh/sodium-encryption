var sodium = require('sodium-native')

exports.key = function () {
  return randomBytes(sodium.crypto_secretbox_KEYBYTES)
}

exports.nonce = function () {
  return randomBytes(sodium.crypto_secretbox_NONCEBYTES)
}

exports.encrypt = function (msg, nonce, key) {
  var cipher = new Buffer(msg.length + sodium.crypto_secretbox_MACBYTES)
  sodium.crypto_secretbox_easy(cipher, msg, nonce, key)
  return cipher
}

exports.decrypt = function (cipher, nonce, key) {
  if (cipher.length < sodium.crypto_secretbox_MACBYTES) return null
  var msg = new Buffer(cipher.length - sodium.crypto_secretbox_MACBYTES)
  if (!sodium.crypto_secretbox_open_easy(msg, cipher, nonce, key)) return null
  return msg
}

exports.scalarMultiplication = function (secretKey, otherPublicKey) {
  var sharedSecret = new Buffer(sodium.crypto_scalarmult_BYTES)
  sodium.crypto_scalarmult(sharedSecret, secretKey, otherPublicKey)
  return sharedSecret
}

exports.scalarMultiplicationKeyPair = function (secretKey) {
  if (!secretKey) secretKey = randomBytes(sodium.crypto_scalarmult_SCALARBYTES)
  var publicKey = new Buffer(sodium.crypto_scalarmult_BYTES)
  sodium.crypto_scalarmult_base(publicKey, secretKey)
  return {
    secretKey: secretKey,
    publicKey: publicKey
  }
}

function randomBytes (n) {
  var buf = new Buffer(n)
  sodium.randombytes_buf(buf)
  return buf
}
