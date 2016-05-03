var tape = require('tape')
var encryption = require('./')

tape('generates keys and nonce', function (t) {
  t.same(encryption.key().length, 32, '32 byte keys')
  t.same(encryption.nonce().length, 24, '24 byte nonces')
  t.end()
})

tape('encrypts and decrypts', function (t) {
  var key = encryption.key()
  var nonce = encryption.nonce()

  var box = encryption.encrypt(Buffer('hi'), nonce, key)

  t.notSame(box, Buffer('hi'), 'message was encrypted')
  t.same(encryption.decrypt(box, nonce, key), Buffer('hi'), 'same message out')
  t.end()
})

tape('scalar multiplication', function (t) {
  var keys = encryption.scalarMultiplicationKeyPair()
  var otherKeys = encryption.scalarMultiplicationKeyPair()
  var sharedKey = encryption.scalarMultiplication(keys.secretKey, otherKeys.publicKey)
  var otherSharedKey = encryption.scalarMultiplication(otherKeys.secretKey, keys.publicKey)

  t.same(sharedKey, otherSharedKey, 'shared key should be the same')
  t.end()
})
