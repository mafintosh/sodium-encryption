# sodium-encryption

[Sodium encryption](https://github.com/paixaop/node-sodium) that works in node and in the browser

```
npm install sodium-encryption
```

[![build status](http://img.shields.io/travis/mafintosh/sodium-encryption.svg?style=flat)](http://travis-ci.org/mafintosh/sodium-encryption)

## Usage

``` js
var encryption = require('sodium-encryption')

var key = encryption.key()
var nonce = encryption.nonce()
var message = Buffer('a message')

var box = encryption.encrypt(message, nonce, key)

console.log('encrypted message is:', box)
console.log('decrypted message is:', encryption.decrypt(box, nonce, key))
```

## API

#### `key = encryption.key()`

Generate a secret key. Returns a 32 byte buffer.

#### `nonce = encryption.nonce()`

Generate a nonce. Returns a 24 byte buffer.
A nonce can be public and you should use a new one everytime you use a key.

#### `box = encryption.encrypt(message, nonce, key)`

Encrypts a message.

#### `message = encryption.decrypt(box, nonce, key)`

Decrypt a message. Returns `null` is the message cannot be decrypted.

#### `keys = encryption.scalarMultiplicationKeyPair([secretKey])`

Generate a key pair to be used for scalar multiplication. If you don't pass in a secret key, one will be generated for you.
Returns a key pair consisting of a secret key and a public key.

``` js
{
  secretKey: <Buffer>,
  publicKey: <Buffer>
}
```

#### `sharedKey = encryption.scalarMultiplication(secretKey, otherPublicKey)`

Generate a shared key based on a remote public scalar multiplication key and your own secret key.
Returns the same shared key if called with corresponding secret and public key

``` js
var keys = encryption.scalarMultiplicationKeyPair()
var otherKeys = encryption.scalarMultiplicationKeyPair()

console.log('shared key', encryption.scalarMultiplication(keys.secretKey, otherKeys.publicKey))
console.log('shared key', encryption.scalarMultiplication(otherKeys.secretKey, keys.publicKey))
```

## License

MIT
