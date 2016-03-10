var tweetnacl = require('tweetnacl')

exports.KEY_LENGTH = 32
exports.NONCE_LENGTH = 32

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

var key = exports.key()
var n = exports.nonce()

var box = exports.encrypt(Buffer('hi'), n, key)
var b = require('./sodium').encrypt(Buffer('hi'), n, key)
console.log(box, b)

console.log(exports.decrypt(box, n, key))
console.log(require('./sodium').decrypt(box, n, key))
