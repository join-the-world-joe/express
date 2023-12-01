var config = require('../../config/config')
import WxmpRsa from 'wxmp-rsa'

class RSA {
  constructor() {
    this._publicKey = config.GetInstance().GetRSAPublicKey()
    this._privateKey = config.GetInstance().GetRSAPrivateKey()
  }
  encrypt(plainText) {
    var _crypto = new WxmpRsa()
    _crypto.setPublicKey(this._publicKey)
    return _crypto.encryptLong(plainText)
  }
  decrypt(cipherText) {
    var _crypto = new WxmpRsa()
    _crypto.setPrivateKey(this._privateKey)
    return _crypto.decryptLong(cipherText)
  }
}

var _instance = new RSA()
function GetInstance() {
  return _instance
}

module.exports = {
  GetInstance,
}